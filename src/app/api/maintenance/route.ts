// src/app/api/maintenance/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "~/server/mongodb/client"; // your MongoClient helper
import { ObjectId } from "mongodb";

// ======================
// GET ALL LOGS
// ======================
export async function GET() {
  try {
    const db = await getDb();

    const logs = await db
      .collection("services")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: logs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ======================
// CREATE LOG
// ======================
export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const body = await req.json();

    const { vehicle, service, description, cost, date, status } = body;

    if (!vehicle || !service || !description || !cost || !date) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    const newLog = {
      vehicle,
      service,
      description,
      cost: Number(cost),
      date,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("services").insertOne(newLog);

    return NextResponse.json(
      {
        success: true,
        data: { ...newLog, _id: result.insertedId },
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

// ======================
// DELETE LOG
// ======================
export async function DELETE(req: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID required" },
        { status: 400 }
      );
    }

    await db.collection("services").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}