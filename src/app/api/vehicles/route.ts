import { NextRequest, NextResponse } from "next/server";
import Vehicle from "~/models/vehicle.model";
import { getDb } from "~/server/mongodb/client";
/**
 * GET /api/vehicles
 * Advanced Filtering + Pagination
 */
export async function GET(req: NextRequest) {
  try {
     await getDb();

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const capacityMin = searchParams.get("capacityMin");
    const capacityMax = searchParams.get("capacityMax");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: any = {};

    if (status) query.status = status;

    if (capacityMin || capacityMax) {
      query.capacity = {};
      if (capacityMin) query.capacity.$gte = Number(capacityMin);
      if (capacityMax) query.capacity.$lte = Number(capacityMax);
    }

    const skip = (page - 1) * limit;

    const vehicles = await Vehicle.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Vehicle.countDocuments(query);

    return NextResponse.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: vehicles,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/vehicles
 * Create New Vehicle with Validation
 */
export async function POST(req: NextRequest) {
  try {
    await getDb();

    const body = await req.json();

    const {
      vehicleNumber,
      plateNumber,
      vehicleModel,
      capacity,
      capacityUnit,
      odometer,
    } = body;

    // Basic Validation
    if (!vehicleNumber || !plateNumber || !vehicleModel) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (capacity <= 0) {
      return NextResponse.json(
        { success: false, message: "Capacity must be greater than 0" },
        { status: 400 }
      );
    }

    // Check duplicate plate
    const existingPlate = await Vehicle.findOne({ plateNumber });
    if (existingPlate) {
      return NextResponse.json(
        { success: false, message: "Plate number already exists" },
        { status: 409 }
      );
    }

    const vehicle = await Vehicle.create({
      vehicleNumber,
      plateNumber,
      Model: vehicleModel,
      capacity,
      capacityUnit,
      odometer,
      status: "available",
    });

    return NextResponse.json(
      { success: true, data: vehicle },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/vehicles
 * Status Update & Business Logic Enforcement
 */
export async function PATCH(req: NextRequest) {
  try {
    await getDb();

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Vehicle ID and status required" },
        { status: 400 }
      );
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found" },
        { status: 404 }
      );
    }

    /**
     * Business Rules for FleetFlow
     */

    // Cannot set Available if in Shop
    if (vehicle.status === "In Shop" && status === "On Trip") {
      return NextResponse.json(
        { success: false, message: "Vehicle in maintenance cannot go on trip" },
        { status: 400 }
      );
    }

    // Cannot activate retired vehicle
    if (vehicle.status === "Retired") {
      return NextResponse.json(
        { success: false, message: "Retired vehicle cannot be modified" },
        { status: 400 }
      );
    }

    vehicle.status = status;
    await vehicle.save();

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
      data: vehicle,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/vehicles
 * Soft Delete (Retire Vehicle)
 */
export async function DELETE(req: NextRequest) {
  try {
    await getDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Vehicle ID required" },
        { status: 400 }
      );
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found" },
        { status: 404 }
      );
    }

    // Soft delete logic
    vehicle.status = "Retired";
    vehicle.isActive = false;

    await vehicle.save();

    return NextResponse.json({
      success: true,
      message: "Vehicle retired successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}