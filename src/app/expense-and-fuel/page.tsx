"use client";

import { useState } from "react";

interface Expense {
  id: string;
  tripId: string;
  driver: string;
  distance: number;
  fuelExpense: number;
  miscExpense: number;
  status: "Done" | "Pending";
}

export default function ExpensesAndFuelPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    tripId: "",
    driver: "",
    fuelCost: "",
    miscExpense: "",
  });

  // Mock data for expenses table
  const expenses: Expense[] = [
    {
      id: "1",
      tripId: "TR-2041",
      driver: "John Doe",
      distance: 450,
      fuelExpense: 3500,
      miscExpense: 500,
      status: "Done",
    },
    {
      id: "2",
      tripId: "TR-2040",
      driver: "Jane Smith",
      distance: 320,
      fuelExpense: 2800,
      miscExpense: 300,
      status: "Pending",
    },
    {
      id: "3",
      tripId: "TR-2039",
      driver: "Mike Johnson",
      distance: 580,
      fuelExpense: 4200,
      miscExpense: 700,
      status: "Done",
    },
    {
      id: "4",
      tripId: "TR-2038",
      driver: "Sarah Williams",
      distance: 290,
      fuelExpense: 2500,
      miscExpense: 200,
      status: "Done",
    },
    {
      id: "5",
      tripId: "TR-2037",
      driver: "Tom Brown",
      distance: 410,
      fuelExpense: 3200,
      miscExpense: 450,
      status: "Pending",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New expense:", formData);
    // TODO: Implement actual expense creation logic
    setIsModalOpen(false);
    setFormData({
      tripId: "",
      driver: "",
      fuelCost: "",
      miscExpense: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      tripId: "",
      driver: "",
      fuelCost: "",
      miscExpense: "",
    });
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium";
      case "Pending":
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium";
    }
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: Expenses Table Container */}
      <section className="bg-white border border-gray-200 rounded-xl p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Expenses</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add an Expense
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-bold">Trip ID</th>
                <th className="text-left py-2 px-3 font-bold">Driver</th>
                <th className="text-left py-2 px-3 font-bold">Distance</th>
                <th className="text-left py-2 px-3 font-bold">Fuel Expense</th>
                <th className="text-left py-2 px-3 font-bold">Misc Expense</th>
                <th className="text-left py-2 px-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-3">{expense.tripId}</td>
                  <td className="py-2 px-3">{expense.driver}</td>
                  <td className="py-2 px-3">{expense.distance} km</td>
                  <td className="py-2 px-3">₹{expense.fuelExpense.toLocaleString()}</td>
                  <td className="py-2 px-3">₹{expense.miscExpense.toLocaleString()}</td>
                  <td className="py-2 px-3">
                    <span className={getStatusBadgeClass(expense.status)}>
                      {expense.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: Add Expense Modal Dialog */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">New Expense</h2>

            <form onSubmit={handleSubmit}>
              {/* Trip ID */}
              <div className="mb-4">
                <label
                  htmlFor="tripId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Trip ID
                </label>
                <input
                  type="text"
                  id="tripId"
                  name="tripId"
                  value={formData.tripId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Enter trip ID"
                  required
                />
              </div>

              {/* Driver */}
              <div className="mb-4">
                <label
                  htmlFor="driver"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Driver
                </label>
                <input
                  type="text"
                  id="driver"
                  name="driver"
                  value={formData.driver}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Enter driver name"
                  required
                />
              </div>

              {/* Fuel Cost */}
              <div className="mb-4">
                <label
                  htmlFor="fuelCost"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Fuel Cost
                </label>
                <input
                  type="number"
                  id="fuelCost"
                  name="fuelCost"
                  value={formData.fuelCost}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Enter fuel cost"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Misc Expense */}
              <div className="mb-4">
                <label
                  htmlFor="miscExpense"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Misc Expense
                </label>
                <input
                  type="number"
                  id="miscExpense"
                  name="miscExpense"
                  value={formData.miscExpense}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Enter misc expense"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
