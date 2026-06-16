import { useState, useEffect } from "react";
import { INITIAL_CONTROLS, STATUSES } from "../data/controls";
import { computeMetrics } from "../utils/metrics";
import { isValidStatus } from "../utils/validation";

// Key used to store data in localStorage
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

    // Save changes automatically
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(controls));
        } catch (error) {
            console.error("Could not save controls.", error);
        }
    }, [controls]);

    function updateStatus(controlId, newStatus) {
        if (!isValidStatus(newStatus)) return;
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
        return computeMetrics(controls);
    }

    return {
        controls,
        updateStatus,
        updateEvidence,
        getMetrics,
    };
}