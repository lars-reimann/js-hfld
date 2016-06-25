export Stylesheet      from "./stylesheet/index.js";
export * as validators from "./validators.js";

export function getValidationStyle(valid) {
    return getValidationState(valid);
}

export function getValidationState(valid) {
    return valid ? "success" : "error";
}
