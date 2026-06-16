import { STATUSES } from "../data/controls";

// Returns true only if the status is one of the four allowed values
export function isValidStatus(status) {
    return STATUSES.includes(status);
}