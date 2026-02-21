"use client";

interface FinancialSummary {
  month: string;
  revenue: string;
  fuelCost: string;
  maintenance: string;
  profit: string;
}

export default function AnalyticsPage() {
  // Mock data for financial summary
  const summary: FinancialSummary[] = [
    {
      month: "Jan",
      revenue: "Rs. 17L",
      fuelCost: "Rs. 6L",
      maintenance: "Rs. 2L",
      profit: "Rs. 9L",
    },
    {
      month: "Feb",
      revenue: "Rs. 15L",
      fuelCost: "Rs. 5.5L",
      maintenance: "Rs. 1.8L",
      profit: "Rs. 7.7L",
    },
    {
      month: "Mar",
      revenue: "Rs. 18L",
      fuelCost: "Rs. 6.5L",
      maintenance: "Rs. 2.2L",
      profit: "Rs. 9.3L",
    },
    {
      month: "Apr",
      revenue: "Rs. 16L",
      fuelCost: "Rs. 5.8L",
      maintenance: "Rs. 2L",
      profit: "Rs. 8.2L",
    },
    {
      month: "May",
      revenue: "Rs. 19L",
      fuelCost: "Rs. 7L",
      maintenance: "Rs. 2.5L",
      profit: "Rs. 9.5L",
    },
  ];

  return (
    <div className="space-y-6">
      {/* SECTION 1: KPI Cards Row */}
      <div className="flex gap-6 mt-6">
        {/* Card 1: Total Fuel Cost */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 text-center">
          <p className="text-sm text-gray-500">Total Fuel Cost</p>
          <p className="text-2xl font-semibold mt-2">Rs. 2.6 L</p>
        </div>

        {/* Card 2: Fleet ROI */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 text-center">
          <p className="text-sm text-gray-500">Fleet ROI</p>
          <p className="text-2xl font-semibold mt-2">+12.5%</p>
        </div>

        {/* Card 3: Utilization Rate */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 text-center">
          <p className="text-sm text-gray-500">Utilization Rate</p>
          <p className="text-2xl font-semibold mt-2">82%</p>
        </div>
      </div>

      {/* SECTION 2: Charts Row */}
      <div className="flex gap-6 mt-6">
        {/* Chart 1: Fuel Efficiency Trend */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1 h-64">
          <h3 className="text-lg font-semibold mb-3">Fuel Efficiency Trend (km/L)</h3>
          <div className="bg-gray-100 rounded-md h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">Chart placeholder</span>
          </div>
        </div>

        {/* Chart 2: Top 5 Costliest Vehicles */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1 h-64">
          <h3 className="text-lg font-semibold mb-3">Top 5 Costliest Vehicles</h3>
          <div className="bg-gray-100 rounded-md h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">Chart placeholder</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: Financial Summary Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mt-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Financial Summary of Month
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-bold">Month</th>
                <th className="text-left py-2 px-3 font-bold">Revenue</th>
                <th className="text-left py-2 px-3 font-bold">Fuel Cost</th>
                <th className="text-left py-2 px-3 font-bold">Maintenance</th>
                <th className="text-left py-2 px-3 font-bold">Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-3">{row.month}</td>
                  <td className="py-2 px-3">{row.revenue}</td>
                  <td className="py-2 px-3">{row.fuelCost}</td>
                  <td className="py-2 px-3">{row.maintenance}</td>
                  <td className="py-2 px-3">{row.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
