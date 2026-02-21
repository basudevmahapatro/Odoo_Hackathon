import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "~/server/mongodb/client";

export async function GET() {
  try {
    const db = await getDb();

    // Run all queries in parallel for speed
    const [vehicles, tripsDocs, maintenanceDocs] = await Promise.all([
      db.collection("vehicles").find({}).toArray(),
      db
        .collection("trips")
        .find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray(),
      db
        .collection("services")
        .find({ status: { $in: ["scheduled", "in_progress"] } })
        .toArray(),
    ]);

    // KPI calculations
    const activeFleet = vehicles.filter(
      (v) => v.status === "on_trip" || v.status === "On Trip",
    ).length;

    const maintenanceAlerts =
      vehicles.filter((v) => v.status === "in_shop" || v.status === "In Shop")
        .length + maintenanceDocs.length;

    const totalVehicles = vehicles.filter(
      (v) => v.status !== "out_of_service",
    ).length;

    const utilizationRate =
      totalVehicles > 0 ? Math.round((activeFleet / totalVehicles) * 100) : 0;

    // Count all non-completed, non-cancelled trips as pending
    const allTrips = await db.collection("trips").countDocuments({
      status: {
        $in: ["draft", "Draft", "Dispatched", "dispatched"],
      },
    });
    const pendingCargo = allTrips;

    // Enrich recent trips with vehicle and driver names
    const vehicleIds = [
      ...new Set(
        tripsDocs
          .map((t) => String(t.vehicleId ?? ""))
          .filter((id) => id.length > 0),
      ),
    ];
    const driverIds = [
      ...new Set(
        tripsDocs
          .map((t) => String(t.driverId ?? ""))
          .filter((id) => id.length > 0),
      ),
    ];

    const [vehicleDocs, driverDocs] = await Promise.all([
      vehicleIds.length > 0
        ? db
            .collection("vehicles")
            .find({ _id: { $in: vehicleIds.map((id) => new ObjectId(id)) } })
            .toArray()
        : Promise.resolve([]),
      driverIds.length > 0
        ? db
            .collection("drivers")
            .find({ _id: { $in: driverIds.map((id) => new ObjectId(id)) } })
            .toArray()
        : Promise.resolve([]),
    ]);

    const vehicleMap = new Map(
      vehicleDocs.map((v) => [
        v._id.toString(),
        (v.name as string) ?? (v.licensePlate as string) ?? "Unknown",
      ]),
    );
    const driverMap = new Map(
      driverDocs.map((d) => [
        d._id.toString(),
        (d.name as string) ?? "Unknown",
      ]),
    );

    const recentTrips = tripsDocs.map((t) => ({
      _id: t._id.toString(),
      trip: `TR-${t._id.toString().slice(-4).toUpperCase()}`,
      vehicle: vehicleMap.get(String(t.vehicleId ?? "")) ?? "Unknown",
      driver: driverMap.get(String(t.driverId ?? "")) ?? "Unknown",
      origin: (t.origin as string) ?? "",
      destination: (t.destination as string) ?? "",
      status: (t.status as string) ?? "Draft",
      cargoWeight: (t.cargoWeight as number) ?? 0,
      createdAt: t.createdAt as Date,
    }));

    return NextResponse.json({
      success: true,
      data: {
        kpis: {
          activeFleet,
          maintenanceAlerts,
          utilizationRate,
          pendingCargo,
          totalVehicles,
        },
        recentTrips,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
