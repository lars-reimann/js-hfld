export Stylesheet      from "./stylesheet/index.js";
export * as validators from "./validators.js";

/**
 * Returns the string bootstrap expects to describe the validation state of an
 * input element.
 *
 * @param {boolean} valid
 * Whether the input is valid.
 *
 * @return {string}
 * The string describing the validation state.
 */
export function getValidationState(valid) {
    return valid ? "success" : "error";
}
