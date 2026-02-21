"use client";

import { useEffect, useState } from "react";

interface Vehicle {
  _id: string;
  vehicleNumber: string;
  plateNumber: string;
  vehicleModel: string;
  capacity: number;
  capacityUnit: string;
  odometer: number;
  status: string;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filtered, setFiltered] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newVehicle, setNewVehicle] = useState<any>({
    vehicleNumber: "",
    plateNumber: "",
    vehicleModel: "",
    capacity: "",
    capacityUnit: "kg",
    odometer: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [statusFilter, search, vehicles]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      setVehicles(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...vehicles];

    if (statusFilter !== "All") {
      result = result.filter(v => v.status === statusFilter);
    }

    if (search) {
      result = result.filter(v =>
        v.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
        v.vehicleModel.toLowerCase().includes(search.toLowerCase()) ||
        v.vehicleNumber.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  };

  const retireVehicle = async (id: string) => {
    await fetch(`/api/vehicles?id=${id}`, { method: "DELETE" });
    fetchVehicles();
  };

  const addVehicle = async () => {
    await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVehicle),
    });

    setShowModal(false);
    setNewVehicle({
      vehicleNumber: "",
      plateNumber: "",
      vehicleModel: "",
      capacity: "",
      capacityUnit: "kg",
      odometer: "",
    });

    fetchVehicles();
  };

  const available = vehicles.filter(v => v.status === "Available").length;
  const activeFleet = vehicles.filter(v => v.status === "On Trip").length;
  const maintenance = vehicles.filter(v => v.status === "In Shop").length;

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg text-gray-500">Loading vehicles...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Action Button */}
      <div className="mb-6 flex w-full justify-end">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="cursor-pointer rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + New Vehicle
        </button>
      </div>

      {/* Vehicles Table */}
      <section>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4 text-sm font-medium">
            Fleet Vehicles
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3">No</th>
                  <th className="px-5 py-3">Plate</th>
                  <th className="px-5 py-3">Model</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Capacity</th>
                  <th className="px-5 py-3">Odometer</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-gray-400">
                      No vehicles found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((vehicle, index) => (
                    <tr
                      key={vehicle._id}
                      className="border-t border-gray-200 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-5 py-4 font-medium text-black">
                        {vehicle.plateNumber}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {vehicle.vehicleModel}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {vehicle.type || 'N/A'}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {vehicle.capacity} {vehicle.capacityUnit}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {vehicle.odometer} km
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={vehicle.status} />
                      </td>
                      <td className="px-5 py-4">
                        {vehicle.status !== "Retired" && (
                          <button
                            type="button"
                            onClick={() => retireVehicle(vehicle._id)}
                            className="cursor-pointer text-sm text-black transition hover:underline"
                          >
                            Retire
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-xl font-semibold">Add New Vehicle</h2>

            <div className="grid gap-4">
              <input
                placeholder="Vehicle Number"
                className="rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                value={newVehicle.vehicleNumber}
                onChange={e =>
                  setNewVehicle({ ...newVehicle, vehicleNumber: e.target.value })
                }
              />

              <input
                placeholder="Plate Number"
                className="rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                value={newVehicle.plateNumber}
                onChange={e =>
                  setNewVehicle({ ...newVehicle, plateNumber: e.target.value })
                }
              />

              <input
                placeholder="Model"
                className="rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                value={newVehicle.vehicleModel}
                onChange={e =>
                  setNewVehicle({ ...newVehicle, vehicleModel: e.target.value })
                }
              />

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Capacity"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  value={newVehicle.capacity}
                  onChange={e =>
                    setNewVehicle({ ...newVehicle, capacity: e.target.value })
                  }
                />
                <select
                  className="cursor-pointer rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  value={newVehicle.capacityUnit}
                  onChange={e =>
                    setNewVehicle({ ...newVehicle, capacityUnit: e.target.value })
                  }
                >
                  <option value="kg">kg</option>
                  <option value="tons">tons</option>
                </select>
              </div>

              <input
                type="number"
                placeholder="Odometer"
                className="rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                value={newVehicle.odometer}
                onChange={e =>
                  setNewVehicle({ ...newVehicle, odometer: e.target.value })
                }
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cursor-pointer rounded-md border border-gray-200 px-4 py-2 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={addVehicle}
                className="cursor-pointer rounded-md bg-black px-5 py-2 text-white transition hover:bg-gray-800"
              >
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }: { status: string }) {
  let badgeClass = "bg-gray-200 text-gray-800";
  
  if (status === "Available") {
    badgeClass = "bg-green-100 text-green-800";
  } else if (status === "On Trip") {
    badgeClass = "bg-black text-white";
  } else if (status === "In Shop") {
    badgeClass = "bg-yellow-100 text-yellow-800";
  } else if (status === "Retired") {
    badgeClass = "bg-red-100 text-red-800";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
    >
      {status}
    </span>
  );
}