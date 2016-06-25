export Stylesheet      from "./stylesheet/index.js";
export * as validators from "./validators.js";

export function getValidationState(valid) {
    return valid ? "success" : "error";
}
