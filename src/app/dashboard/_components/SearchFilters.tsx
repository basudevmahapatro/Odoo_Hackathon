type SearchFiltersProps = {
	placeholder?: string;
};

export default function SearchFilters({
	placeholder = "Search...",
}: SearchFiltersProps) {
	return (
		<div className="mb-6 mt-6 w-full rounded-xl border border-gray-200 bg-white p-4">
			<div className="flex items-center justify-between gap-4">
				<input
					type="search"
					placeholder={placeholder}
					className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
				/>
				<div className="flex gap-3">
					<button
						type="button"
						className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-black transition hover:bg-gray-100"
					>
						Group by
					</button>
					<button
						type="button"
						className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-black transition hover:bg-gray-100"
					>
						Filter
					</button>
					<button
						type="button"
						className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-black transition hover:bg-gray-100"
					>
						Sort by
					</button>
				</div>
			</div>
		</div>
	);
}
