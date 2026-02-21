import { NextRequest, NextResponse } from "next/server";
import { getDb } from "~/server/mongodb/client";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await getDb();

    const drivers = await db
      .collection("drivers")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: drivers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const body = await req.json();

    const { name, phone, licenseNumber, licenseExpiry } = body;

    if (!name || !phone || !licenseNumber || !licenseExpiry) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    const existing = await db
      .collection("drivers")
      .findOne({ licenseNumber });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "License already exists" },
        { status: 409 }
      );
    }

    const newDriver = {
      name,
      phone,
      licenseNumber,
      licenseExpiry: new Date(licenseExpiry),
      safetyScore: 100,
      status: "On Duty",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("drivers").insertOne(newDriver);

    return NextResponse.json(
      {
        success: true,
        message: "Driver created successfully",
        data: { _id: result.insertedId, ...newDriver },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db = await getDb();
    const body = await req.json();

    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID and status required" },
        { status: 400 }
      );
    }

    await db.collection("drivers").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Driver updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Driver ID required" },
        { status: 400 }
      );
    }

    await db.collection("drivers").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isActive: false,
          status: "Suspended",
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Driver removed",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}