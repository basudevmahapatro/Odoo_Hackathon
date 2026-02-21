const kpis = [
	{ label: "Active Fleet", value: "42" },
	{ label: "Maintenance Alerts", value: "7" },
	{ label: "Pending Cargo", value: "13" },
];

const trips = [
	{ trip: "TR-2041", vehicle: "Van-05", driver: "Alex Ray", status: "On Trip" },
	{ trip: "TR-2038", vehicle: "Truck-12", driver: "Maya Lin", status: "Ready" },
	{ trip: "TR-2029", vehicle: "Bike-03", driver: "Omar Ali", status: "Ready" },
	{ trip: "TR-2016", vehicle: "Van-02", driver: "Priya Shah", status: "On Trip" },
	{ trip: "TR-2007", vehicle: "Truck-04", driver: "Lina Wu", status: "Ready" },
];

export default function DashboardPage() {
	return (
		<div>
			{/* Action Buttons */}
			<div className="mb-6 flex w-full justify-end gap-3">
				<button
					type="button"
					className="cursor-pointer rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
				>
					New Trip
				</button>
				<button
					type="button"
					className="cursor-pointer rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
				>
					New Vehicle
				</button>
			</div>

			{/* KPI Cards */}
		<section className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
			{kpis.map((kpi) => (
				<div
					key={kpi.label}
					className="rounded-xl border border-gray-200 bg-white p-8"
				>
					<div className="text-4xl font-semibold">{kpi.value}</div>
					<div className="mt-3 text-base text-gray-600">{kpi.label}</div>
				</div>
			))}
		</section>

		{/* Active Trips Table */}
		<section className="mt-6">
				<div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
					<div className="border-b border-gray-200 px-5 py-4 text-sm font-medium">
						Active Trips
					</div>
					<div className="overflow-x-auto">
						<table className="min-w-full text-left text-sm">
							<thead className="bg-white text-xs font-semibold uppercase tracking-wide text-gray-500">
								<tr>
									<th className="px-5 py-3">Trip</th>
									<th className="px-5 py-3">Vehicle</th>
									<th className="px-5 py-3">Driver</th>
									<th className="px-5 py-3">Status</th>
								</tr>
							</thead>
							<tbody>
								{trips.map((row) => {
									const isOnTrip = row.status === "On Trip";
									return (
										<tr
											key={row.trip}
											className="border-t border-gray-200 transition hover:bg-gray-50"
										>
											<td className="px-5 py-4 font-medium text-black">
												{row.trip}
											</td>
											<td className="px-5 py-4 text-gray-700">
												{row.vehicle}
											</td>
											<td className="px-5 py-4 text-gray-700">
												{row.driver}
											</td>
											<td className="px-5 py-4">
												<span
													className={
														"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
														(isOnTrip
															? "bg-black text-white"
															: "bg-gray-200 text-gray-800")
													}
												>
													{row.status}
												</span>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</div>
	);
}
