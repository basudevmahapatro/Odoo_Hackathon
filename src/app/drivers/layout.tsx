"use client";

import { useState } from "react";
import {
	BarChart,
	Fuel,
	LayoutDashboard,
	PieChart,
	Route,
	Truck,
	Wrench,
} from "lucide-react";
import SearchFilters from "../dashboard/_components/SearchFilters";

type DriversLayoutProps = {
	children: React.ReactNode;
};

const navItems = [
	{ label: "Dashboard", icon: LayoutDashboard },
	{ label: "Vehicle Registry", icon: Truck },
	{ label: "Trip Dispatcher", icon: Route },
	{ label: "Maintenance Logs", icon: Wrench },
	{ label: "Trip Expenses & Fuel", icon: Fuel },
	{ label: "Driver Performance", icon: BarChart },
	{ label: "Analytics & Reports", icon: PieChart },
];

export default function DriversLayout({ children }: DriversLayoutProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="min-h-screen bg-white text-black">
			{/* Fixed Header */}
			<header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
				<div className="flex items-center gap-3">
					<button
						type="button"
						aria-label="Toggle sidebar"
						className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-50"
						onClick={() => setIsOpen((prev) => !prev)}
					>
						<span className="flex flex-col gap-1">
							<span className="h-0.5 w-5 bg-black" />
							<span className="h-0.5 w-5 bg-black" />
							<span className="h-0.5 w-5 bg-black" />
						</span>
					</button>
					<h1 className="text-lg font-semibold">Fleet Flow</h1>
				</div>
				<div className="flex items-center">
					<button
						type="button"
						className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
						aria-label="Profile"
					>
						<span className="text-sm font-semibold text-gray-700">U</span>
					</button>
				</div>
			</header>

			{/* Sidebar */}
			<aside
				className={
					"fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-visible bg-white transition-[width] duration-300 ease-in-out border-r border-gray-200 " +
					(isOpen ? "w-60" : "w-16")
				}
			>
				<nav className="space-y-1 px-2 py-6">
					{navItems.map((item) => {
						const isActive = item.label === "Driver Performance";
						const Icon = item.icon;
						return (
							<button
								key={item.label}
								type="button"
								className={
									"group relative flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition " +
									(isActive
										? "bg-black text-white"
										: "text-black hover:bg-gray-100")
								}
							>
								<Icon className="h-5 w-5 flex-shrink-0" />
								{isOpen && <span className="whitespace-nowrap">{item.label}</span>}
								{!isOpen && (
									<span className="pointer-events-none absolute left-full top-1/2 z-50 ml-6 -translate-y-1/2 scale-0 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-sm text-white shadow-lg transition-all duration-150 group-hover:scale-100">
										{item.label}
									</span>
								)}
							</button>
						);
					})}
				</nav>
			</aside>

			{/* Main Content */}
			<main
				className={
					"min-h-screen pt-16 px-6 py-6 transition-[margin-left] duration-300 ease-in-out md:px-10 " +
					(isOpen ? "ml-60" : "ml-16")
				}
			>
				{/* Search and Filters - Consistent across all pages */}
				<SearchFilters placeholder="Search drivers" />

				{/* Page-specific content */}
				{children}
			</main>
		</div>
	);
}
