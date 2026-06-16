// Shows a colored badge for each status
// One job: take a status string, return a colored label

const STATUS_COLORS = {
    "Not Started": "bg-gray-100 text-gray-600",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Implemented": "bg-green-100 text-green-700",
    "Not Applicable": "bg-blue-100 text-blue-600",
};

export function StatusBadge({ status }) {
    const colorClass =
        STATUS_COLORS[status] || "bg-gray-100 text-gray-600";

    return (
        <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
        >
            {status}
        </span>
    );
}