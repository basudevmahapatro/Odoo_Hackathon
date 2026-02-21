import { type NextRequest, NextResponse } from "next/server";

import { getDb } from "~/server/mongodb/client";
import type {
  Vehicle,
  VehicleStatus,
  CreateVehicleInput,
} from "~/types/vehicle";

const VEHICLES_COLLECTION = "vehicles";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<Vehicle>(VEHICLES_COLLECTION);

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status") as VehicleStatus | null;
    const type = searchParams.get("type") as "truck" | "van" | "bike" | null;
    const region = searchParams.get("region");
    const minCapacity = searchParams.get("minCapacity");
    const maxCapacity = searchParams.get("maxCapacity");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "10", 10);

    const query: Record<string, unknown> = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (region) query.region = region;

    if (minCapacity ?? maxCapacity) {
      query.maxCapacity = {};
      if (minCapacity)
        (query.maxCapacity as Record<string, number>).$gte =
          Number(minCapacity);
      if (maxCapacity)
        (query.maxCapacity as Record<string, number>).$lte =
          Number(maxCapacity);
    }

    const skip = (page - 1) * limit;

    const [vehicles, total] = await Promise.all([
      collection
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .toArray(),
      collection.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: vehicles,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<Vehicle>(VEHICLES_COLLECTION);

    const body = (await req.json()) as CreateVehicleInput;

    const {
      name,
      model,
      licensePlate,
      type,
      maxCapacity,
      capacityUnit,
      odometer,
      region,
    } = body;

    if (
      !name ||
      !model ||
      !licensePlate ||
      !type ||
      maxCapacity === undefined ||
      odometer === undefined ||
      !region
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (maxCapacity <= 0) {
      return NextResponse.json(
        { success: false, message: "Capacity must be greater than 0" },
        { status: 400 },
      );
    }

    const existingPlate = await collection.findOne({ licensePlate });
    if (existingPlate) {
      return NextResponse.json(
        { success: false, message: "License plate already exists" },
        { status: 409 },
      );
    }

    const now = new Date();
    const vehicle: Omit<Vehicle, "_id"> = {
      name,
      model,
      licensePlate,
      type,
      maxCapacity,
      capacityUnit: capacityUnit ?? "kg",
      odometer,
      status: "available",
      region,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(vehicle as Vehicle);

    return NextResponse.json(
      {
        success: true,
        data: { ...vehicle, _id: result.insertedId.toString() },
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<Vehicle>(VEHICLES_COLLECTION);

    const body = (await req.json()) as { id: string; status: VehicleStatus };
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Vehicle ID and status required" },
        { status: 400 },
      );
    }

    const vehicle = await collection.findOne({
      _id: id,
    } as unknown as Parameters<typeof collection.findOne>[0]);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found" },
        { status: 404 },
      );
    }

    if (vehicle.status === "in_shop" && status === "on_trip") {
      return NextResponse.json(
        { success: false, message: "Vehicle in maintenance cannot go on trip" },
        { status: 400 },
      );
    }

    if (vehicle.status === "out_of_service") {
      return NextResponse.json(
        { success: false, message: "Retired vehicle cannot be modified" },
        { status: 400 },
      );
    }

    const result = await collection.updateOne(
      { _id: id } as unknown as Parameters<typeof collection.updateOne>[0],
      { $set: { status, updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<Vehicle>(VEHICLES_COLLECTION);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Vehicle ID required" },
        { status: 400 },
      );
    }

    const result = await collection.updateOne(
      { _id: id } as unknown as Parameters<typeof collection.updateOne>[0],
      { $set: { status: "out_of_service", updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Vehicle retired successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
