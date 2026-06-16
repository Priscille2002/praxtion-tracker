import { STATUSES } from "../data/controls";

export function FilterBar({
    controls,
    statusFilter,
    familyFilter,
    onStatusFilter,
    onFamilyFilter,
}) {
    const families = [
        "All",
        ...new Set(
            controls.map((control) => control.family)
        ),
    ];

    const statuses = [
        "All",
        ...STATUSES,
    ];

    return (
        <div className="flex flex-wrap gap-4 mb-4 items-center">
            <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">
                    Status
                </label>

                <select
                    className="text-sm border border-gray-200 rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={statusFilter}
                    onChange={(e) =>
                        onStatusFilter(e.target.value)
                    }
                >
                    {statuses.map((status) => (
                        <option
                            key={status}
                            value={status}
                        >
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">
                    Family
                </label>

                <select
                    className="text-sm border border-gray-200 rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={familyFilter}
                    onChange={(e) =>
                        onFamilyFilter(e.target.value)
                    }
                >
                    {families.map((family) => (
                        <option
                            key={family}
                            value={family}
                        >
                            {family}
                        </option>
                    ))}
                </select>
            </div>

            {/* Only show this button if a filter is applied */}
            {(statusFilter !== "All" ||
                familyFilter !== "All") && (
                    <button
                        onClick={() => {
                            onStatusFilter("All");
                            onFamilyFilter("All");
                        }}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Clear filters
                    </button>
                )}

            {/* Display how many controls match the current filters */}
            <p className="text-sm text-gray-400 ml-auto">
                Showing {controls.length} control
                {controls.length !== 1 ? "s" : ""}
            </p>
        </div>
    );
}