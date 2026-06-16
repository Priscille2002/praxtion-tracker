import React from "react";

export function Dashboard({ metrics }) {
    const {
        implemented,
        inProgress,
        notStarted,
        notApplicable,
        percentComplete,
    } = metrics;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="col-span-2 md:col-span-1 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <p className="text-xs text-gray-500 mb-1">
                    Overall Progress
                </p>

                <p className="text-3xl font-bold text-blue-600">
                    {percentComplete}%
                </p>

                {/* Width changes based on the completion percentage */}
                <div className="mt-2 h-2 bg-gray-100 rounded-full">
                    <div
                        className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                        style={{
                            width: `${percentComplete}%`,
                        }}
                    />
                </div>
            </div>

            <MetricCard
                label="Implemented"
                value={implemented}
                color="text-green-600"
            />

            <MetricCard
                label="In Progress"
                value={inProgress}
                color="text-yellow-600"
            />

            <MetricCard
                label="Not Started"
                value={notStarted}
                color="text-gray-500"
            />

            <MetricCard
                label="Not Applicable"
                value={notApplicable}
                color="text-blue-500"
            />
        </div>
    );
}

function MetricCard({ label, value, color }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">
                {label}
            </p>

            <p className={`text-3xl font-bold ${color}`}>
                {value}
            </p>
        </div>
    );
}