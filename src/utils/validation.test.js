import { describe, it, expect } from "vitest";
import { isValidStatus } from "./validation";

describe("isValidStatus", () => {

    it("accepts all four valid statuses", () => {
        expect(isValidStatus("Not Started")).toBe(true);
        expect(isValidStatus("In Progress")).toBe(true);
        expect(isValidStatus("Implemented")).toBe(true);
        expect(isValidStatus("Not Applicable")).toBe(true);
    });

    it("rejects a random string", () => {
        expect(isValidStatus("Done")).toBe(false);
    });

    it("rejects an empty string", () => {
        expect(isValidStatus("")).toBe(false);
    });

    it("rejects lowercase version of a valid status", () => {
        // Case sensitivity matters because "implemented" is not "Implemented"
        expect(isValidStatus("implemented")).toBe(false);
    });

});