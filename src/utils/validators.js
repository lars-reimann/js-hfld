export function isNumber(s) {
    return !Number.isNaN(Number.parseFloat(s));
}

export function isInteger(s) {
    const n = Number.parseFloat(s);
    return !Number.isNaN(n) && Math.floor(n) === n;
}

export function isNumberInRange({min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY}) {
    return function (s) {
        const n = Number.parseFloat(s);
        return !Number.isNaN(n) && min <= n && n <= max;
    };
}

export function isBoolean(s) {
    return s === "true" || s === "false";
}

export function isNotEmpty(s) {
    return s !== "";
}

export function isDateTime(s) {
    return s !== "";
}

export function isDate(s) {
    return s !== "";
}

export function isTime(s) {
    return s !== "";
}

export function all(validators) {
    return function (s) {
        for (let validator of validators) {
            if (!validator(s)) {
                return false;
            }
        }
        return true;
    };
}

export function any(validators) {
    return function (s) {
        for (let validator of validators) {
            if (validator(s)) {
                return true;
            }
        }
        return false;
    };
}

// export function isValidState(validator, state) {
//     for (let k of Object.keys(state)) {
//         if ()
//     }
//     return true;
// }