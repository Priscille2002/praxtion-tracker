import { useState } from "react";

export function EvidenceModal({
    control,
    onSave,
    onClose,
}) {
    // Start with the existing values if the control already has some
    const [note, setNote] = useState(
        control.note || ""
    );

    const [evidenceRef, setEvidenceRef] =
        useState(
            control.evidenceRef || ""
        );

    function handleSave() {
        onSave(
            control.id,
            note,
            evidenceRef
        );

        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {control.id} — {control.title}
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                    {control.description}
                </p>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note
                </label>

                <textarea
                    className="w-full border border-gray-300 rounded p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={4}
                    maxLength={1000}
                    placeholder="Describe what has been done or observed..."
                    value={note}
                    onChange={(e) =>
                        setNote(e.target.value)
                    }
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Evidence Reference
                </label>

                <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    maxLength={500}
                    placeholder="e.g. policy-v2.pdf or a documentation URL"
                    value={evidenceRef}
                    onChange={(e) =>
                        setEvidenceRef(e.target.value)
                    }
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}