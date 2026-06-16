// The main table showing all controls
// Lets the user change status and manage evidence

import { useState } from "react";
import { STATUSES } from "../data/controls";
import { StatusBadge } from "./StatusBadge";
import { EvidenceModal } from "./EvidenceModal";

export function ControlTable({
    controls,
    onStatusChange,
    onEvidenceSave,
}) {
    // Keeps track of the control currently being edited
    const [selectedControl, setSelectedControl] =
        useState(null);

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm text-left">

                {/* Table header */}
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 w-20">ID</th>
                        <th className="px-4 py-3 w-36">Family</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3 w-44">Status</th>
                        <th className="px-4 py-3 w-48">Evidence</th>
                        <th className="px-4 py-3 w-28">Updated</th>
                    </tr>
                </thead>

                {/* Table body */}
                <tbody className="divide-y divide-gray-100">
                    {controls.map((control) => (
                        <tr
                            key={control.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            {/* Control ID */}
                            <td className="px-4 py-3 font-mono font-medium text-gray-700">
                                {control.id}
                            </td>

                            {/* NIST family */}
                            <td className="px-4 py-3 text-gray-500">
                                {control.family}
                            </td>

                            {/* Control title */}
                            <td className="px-4 py-3 text-gray-800">
                                {control.title}
                            </td>

                            {/* Status selector */}
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <StatusBadge status={control.status} />

                                    <select
                                        className="text-xs border border-gray-200 rounded p-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        value={control.status}
                                        onChange={(e) =>
                                            onStatusChange(
                                                control.id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        {STATUSES.map((status) => (
                                            <option
                                                key={status}
                                                value={status}
                                            >
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>

                            {/* Evidence section */}
                            <td className="px-4 py-3">
                                <button
                                    onClick={() =>
                                        setSelectedControl(control)
                                    }
                                    className="text-blue-600 hover:underline text-xs"
                                >
                                    {control.note ||
                                        control.evidenceRef
                                        ? "Edit Evidence"
                                        : "Add Evidence"}
                                </button>

                                {/* Note preview */}
                                {control.note && (
                                    <p className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                                        {control.note}
                                    </p>
                                )}

                                {/* Evidence reference */}
                                {control.evidenceRef && (
                                    <p className="text-xs mt-0.5">
                                        {control.evidenceRef.startsWith(
                                            "http"
                                        ) ? (
                                            <a
                                                href={control.evidenceRef}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline truncate block max-w-xs"
                                            >
                                                {control.evidenceRef}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 truncate block max-w-xs">
                                                {control.evidenceRef}
                                            </span>
                                        )}
                                    </p>
                                )}
                            </td>

                            {/* Last update date */}
                            <td className="px-4 py-3 text-gray-400 text-xs">
                                {control.lastUpdated || "—"}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* Display the modal only when a control is selected */}
            {selectedControl && (
                <EvidenceModal
                    control={selectedControl}
                    onSave={onEvidenceSave}
                    onClose={() =>
                        setSelectedControl(null)
                    }
                />
            )}
        </div>
    );
}