"use client";

interface Driver {
  id: string;
  name: string;
  license: string;
  expiry: string;
  completionRate: number;
  safetyScore: number;
  complaints: number;
}

export default function DriversPage() {
  // Mock data for drivers
  const drivers: Driver[] = [
    {
      id: "1",
      name: "John Doe",
      license: "DL-23223",
      expiry: "22/36",
      completionRate: 92,
      safetyScore: 89,
      complaints: 4,
    },
    {
      id: "2",
      name: "Jane Smith",
      license: "DL-45678",
      expiry: "15/28",
      completionRate: 88,
      safetyScore: 95,
      complaints: 1,
    },
    {
      id: "3",
      name: "Mike Johnson",
      license: "DL-78901",
      expiry: "10/30",
      completionRate: 75,
      safetyScore: 82,
      complaints: 6,
    },
    {
      id: "4",
      name: "Sarah Williams",
      license: "DL-34567",
      expiry: "05/27",
      completionRate: 95,
      safetyScore: 97,
      complaints: 0,
    },
    {
      id: "5",
      name: "Tom Brown",
      license: "DL-89012",
      expiry: "18/29",
      completionRate: 65,
      safetyScore: 68,
      complaints: 8,
    },
    {
      id: "6",
      name: "Emily Davis",
      license: "DL-56789",
      expiry: "12/31",
      completionRate: 91,
      safetyScore: 93,
      complaints: 2,
    },
    {
      id: "7",
      name: "David Wilson",
      license: "DL-12345",
      expiry: "20/35",
      completionRate: 78,
      safetyScore: 85,
      complaints: 3,
    },
  ];

  const getCompletionRateBadge = (rate: number) => {
    if (rate >= 90) {
      return "bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium";
    } else if (rate >= 70) {
      return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium";
    } else {
      return "bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium";
    }
  };

  const getSafetyScoreBadge = (score: number) => {
    if (score >= 90) {
      return "bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium";
    } else if (score >= 70) {
      return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium";
    } else {
      return "bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium";
    }
  };

  const getComplaintsBadge = (complaints: number) => {
    if (complaints <= 2) {
      return "bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium";
    } else if (complaints <= 5) {
      return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium";
    } else {
      return "bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium";
    }
  };

  return (
    <div className="space-y-6">
      {/* Drivers Table Container */}
      <section className="bg-white border border-gray-200 rounded-xl p-4 mt-6">
        <h2 className="text-xl font-semibold mb-4">Driver Performance</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left pb-2 px-3 font-bold">Name</th>
                <th className="text-left pb-2 px-3 font-bold">License#</th>
                <th className="text-left pb-2 px-3 font-bold">Expiry</th>
                <th className="text-left pb-2 px-3 font-bold">Completion Rate</th>
                <th className="text-left pb-2 px-3 font-bold">Safety Score</th>
                <th className="text-left pb-2 px-3 font-bold">Complaints</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr
                  key={driver.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-3">{driver.name}</td>
                  <td className="py-2 px-3">{driver.license}</td>
                  <td className="py-2 px-3">{driver.expiry}</td>
                  <td className="py-2 px-3">
                    <span className={getCompletionRateBadge(driver.completionRate)}>
                      {driver.completionRate}%
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={getSafetyScoreBadge(driver.safetyScore)}>
                      {driver.safetyScore}%
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={getComplaintsBadge(driver.complaints)}>
                      {driver.complaints}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
