import { useState } from "react";
import { useControls } from "./hooks/useControls";
import { Dashboard } from "./components/Dashboard";
import { ControlTable } from "./components/ControlTable";
import { FilterBar } from "./components/FilterBar";
import { exportToCSV } from "./utils/exportCSV";

export default function App() {
  const {
    controls,
    updateStatus,
    updateEvidence,
    getMetrics,
  } = useControls();

  // State used by the filter dropdowns
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [familyFilter, setFamilyFilter] =
    useState("All");

  // Apply the selected filters to the list
  const visibleControls = controls
    .filter(
      (control) =>
        statusFilter === "All" ||
        control.status === statusFilter
    )
    .filter(
      (control) =>
        familyFilter === "All" ||
        control.family === familyFilter
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/*export button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Compliance Control Tracker
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              NIST SP 800-171 — Internal Assessment Tool
            </p>
          </div>

          <button
            onClick={() => exportToCSV(controls)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            Export CSV
          </button>
        </div>

        {/* Progress is calculated using all controls */}
        <Dashboard metrics={getMetrics()} />

        <FilterBar
          controls={controls}
          visibleCount={visibleControls.length}
          statusFilter={statusFilter}
          familyFilter={familyFilter}
          onStatusFilter={setStatusFilter}
          onFamilyFilter={setFamilyFilter}
        />

        <ControlTable
          controls={visibleControls}
          onStatusChange={updateStatus}
          onEvidenceSave={updateEvidence}
        />

      </div>
    </div>
  );
}