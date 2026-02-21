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
      <div className="h-screen flex items-center justify-center text-xl font-medium">
        Loading Fleet...
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Fleet Vehicles
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + New Vehicle
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Kpi title="Available" value={available} />
        <Kpi title="On Trip" value={activeFleet} />
        <Kpi title="In Shop" value={maintenance} />
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by plate, model or vehicle number..."
          className="p-3 border rounded w-full focus:outline-none focus:ring-1 focus:ring-black"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="p-3 border rounded focus:outline-none focus:ring-1 focus:ring-black"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="On Trip">On Trip</option>
          <option value="In Shop">In Shop</option>
          <option value="Retired">Retired</option>
        </select>

        <button
          onClick={fetchVehicles}
          className="border px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Refresh
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Plate</th>
              <th className="p-4 text-left">Model</th>
              <th className="p-4 text-left">Capacity</th>
              <th className="p-4 text-left">Odometer</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-8 text-gray-400">
                  No vehicles found.
                </td>
              </tr>
            ) : (
              filtered.map(vehicle => (
                <tr
                  key={vehicle._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">
                    {vehicle.plateNumber}
                  </td>
                  <td className="p-4">{vehicle.vehicleModel}</td>
                  <td className="p-4">
                    {vehicle.capacity} {vehicle.capacityUnit}
                  </td>
                  <td className="p-4">{vehicle.odometer} km</td>
                  <td className="p-4">
                    <StatusBadge status={vehicle.status} />
                  </td>
                  <td className="p-4">
                    {vehicle.status !== "Retired" && (
                      <button
                        onClick={() => retireVehicle(vehicle._id)}
                        className="text-black hover:underline"
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Add New Vehicle</h2>

            <div className="grid gap-4">
              <input
                placeholder="Vehicle Number"
                className="p-3 border rounded"
                value={newVehicle.vehicleNumber}
                onChange={e =>
                  setNewVehicle({ ...newVehicle, vehicleNumber: e.target.value })
                }
              />

              <input
                placeholder="Plate Number"
                className="p-3 border rounded"
                value={newVehicle.plateNumber}
                onChange={e =>
                  setNewVehicle({ ...newVehicle, plateNumber: e.target.value })
                }
              />

              <input
                placeholder="Model"
                className="p-3 border rounded"
                value={newVehicle.vehicleModel}
                onChange={e =>
                  setNewVehicle({ ...newVehicle, vehicleModel: e.target.value })
                }
              />

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Capacity"
                  className="p-3 border rounded w-full"
                  value={newVehicle.capacity}
                  onChange={e =>
                    setNewVehicle({ ...newVehicle, capacity: e.target.value })
                  }
                />
                <select
                  className="p-3 border rounded"
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
                className="p-3 border rounded"
                value={newVehicle.odometer}
                onChange={e =>
                  setNewVehicle({ ...newVehicle, odometer: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={addVehicle}
                className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
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

/* KPI */
function Kpi({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }: { status: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
      {status}
    </span>
  );
}