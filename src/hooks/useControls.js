import { useState, useEffect } from "react";
import { INITIAL_CONTROLS, STATUSES } from "../data/controls";

const STORAGE_KEY = "praxtion_controls";

export function useControls() {
    const [controls, setControls] = useState(() => {
        try {
            const savedControls = localStorage.getItem(STORAGE_KEY);
            if (savedControls) {
                const parsedControls = JSON.parse(savedControls);
                if (Array.isArray(parsedControls)) return parsedControls;
            }
        } catch (error) {
            console.error("Could not load saved controls.", error);
        }
        return INITIAL_CONTROLS;
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(controls));
        } catch (error) {
            console.error("Could not save controls.", error);
        }
    }, [controls]);

    function updateStatus(controlId, newStatus) {
        if (!STATUSES.includes(newStatus)) return;
        setControls((previousControls) =>
            previousControls.map((control) =>
                control.id === controlId
                    ? {
                        ...control,
                        status: newStatus,
                        lastUpdated: new Date().toISOString().split("T")[0],
                    }
                    : control
            )
        );
    }

    function updateEvidence(controlId, note, evidenceRef) {
        setControls((previousControls) =>
            previousControls.map((control) =>
                control.id === controlId
                    ? {
                        ...control,
                        note: note.trim().slice(0, 1000),
                        evidenceRef: evidenceRef.trim().slice(0, 500),
                        lastUpdated: new Date().toISOString().split("T")[0],
                    }
                    : control
            )
        );
    }

    function getMetrics() {
        const total = controls.length;
        const implemented = controls.filter((c) => c.status === "Implemented").length;
        const inProgress = controls.filter((c) => c.status === "In Progress").length;
        const notStarted = controls.filter((c) => c.status === "Not Started").length;
        const notApplicable = controls.filter((c) => c.status === "Not Applicable").length;
        const percentComplete =
            total > 0 ? Math.round((implemented / total) * 100) : 0;

        return { total, implemented, inProgress, notStarted, notApplicable, percentComplete };
    }

    return {
        controls,
        updateStatus,
        updateEvidence,
        getMetrics,
    };
}