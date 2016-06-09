export * as validators from "./validators.js";

export function getValidationStyle(valid) {
    return valid ? "success" : "error";
} // TODO: rename to getValidationState
