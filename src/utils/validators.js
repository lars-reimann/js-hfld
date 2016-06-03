export function isNumber(s) {
    return !Number.isNaN(Number.parseFloat(s));
}

export function nonEmpty(s) {
    return s !== "";
}