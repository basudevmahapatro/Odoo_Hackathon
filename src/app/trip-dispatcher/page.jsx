"use client";

import { useState } from "react";

export default function TripDispatcherPage() {
  const [formData, setFormData] = useState({
    vehicle: "",
    cargoWeight: "",
    driver: "",
    origin: "",
    destination: "",
    estimatedFuelCost: "",
  });

  // Mock data for the trip fleet table
  const trips = [
    {
      id: "TR-2041",
      vehicle: "Truck-A",
      driver: "John Doe",
      origin: "Warehouse A",
      destination: "Store B",
      status: "On way",
    },
    {
      id: "TR-2040",
      vehicle: "Van-B",
      driver: "Jane Smith",
      origin: "Warehouse C",
      destination: "Store D",
      status: "Pending",
    },
    {
      id: "TR-2039",
      vehicle: "Truck-C",
      driver: "Mike Johnson",
      origin: "Warehouse E",
      destination: "Store F",
      status: "Completed",
    },
    {
      id: "TR-2038",
      vehicle: "Van-D",
      driver: "Sarah Williams",
      origin: "Warehouse G",
      destination: "Store H",
      status: "On way",
    },
    {
      id: "TR-2037",
      vehicle: "Bike-E",
      driver: "Tom Brown",
      origin: "Warehouse I",
      destination: "Store J",
      status: "Pending",
    },
  ];

  // Mock data for dropdowns
  const vehicles = [
    { id: "1", name: "Truck-A" },
    { id: "2", name: "Van-B" },
    { id: "3", name: "Truck-C" },
    { id: "4", name: "Van-D" },
    { id: "5", name: "Bike-E" },
  ];

  const drivers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Mike Johnson" },
    { id: "4", name: "Sarah Williams" },
    { id: "5", name: "Tom Brown" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trip dispatched:", formData);
    // TODO: Implement actual dispatch logic
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "On way":
        return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium";
      case "Pending":
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium";
      case "Completed":
        return "bg-black text-white px-3 py-1 rounded-full text-sm font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium";
    }
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: Trip Fleet Table */}
      <section className="bg-white border border-gray-200 rounded-xl p-4 mt-6">
        <h2 className="text-xl font-semibold mb-4">Trip Fleet</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold">Trip ID</th>
                <th className="text-left py-3 px-4 font-bold">Vehicle</th>
                <th className="text-left py-3 px-4 font-bold">Driver</th>
                <th className="text-left py-3 px-4 font-bold">Origin</th>
                <th className="text-left py-3 px-4 font-bold">Destination</th>
                <th className="text-left py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr
                  key={trip.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{trip.id}</td>
                  <td className="py-3 px-4">{trip.vehicle}</td>
                  <td className="py-3 px-4">{trip.driver}</td>
                  <td className="py-3 px-4">{trip.origin}</td>
                  <td className="py-3 px-4">{trip.destination}</td>
                  <td className="py-3 px-4">
                    <span className={getStatusBadgeClass(trip.status)}>
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: New Trip Form */}
      <section className="bg-white border border-gray-200 rounded-xl p-4 mt-6">
        <h2 className="text-xl font-semibold mb-4">New Trip Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-4">
            {/* Select Vehicle */}
            <div>
              <label
                htmlFor="vehicle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Vehicle
              </label>
              <select
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              >
                <option value="">Choose a vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Cargo Weight */}
            <div>
              <label
                htmlFor="cargoWeight"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cargo Weight (Kg)
              </label>
              <input
                type="number"
                id="cargoWeight"
                name="cargoWeight"
                value={formData.cargoWeight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter weight in kg"
                required
              />
            </div>

            {/* Select Driver */}
            <div>
              <label
                htmlFor="driver"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Driver
              </label>
              <select
                id="driver"
                name="driver"
                value={formData.driver}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              >
                <option value="">Choose a driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Origin Address */}
            <div>
              <label
                htmlFor="origin"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Origin Address
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter origin address"
                required
              />
            </div>

            {/* Destination */}
            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter destination address"
                required
              />
            </div>

            {/* Estimated Fuel Cost */}
            <div>
              <label
                htmlFor="estimatedFuelCost"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Estimated Fuel Cost
              </label>
              <input
                type="number"
                id="estimatedFuelCost"
                name="estimatedFuelCost"
                value={formData.estimatedFuelCost}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter estimated fuel cost"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Confirm & Dispatch Trip
          </button>
        </form>
      </section>
    </div>
  );
}
