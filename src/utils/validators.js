/**
 * Checks if the given string can be parsed as a number.
 *
 * @param {string} s
 * The string to test.
 *
 * @return {boolean}
 * Whether the string is valid.
 */
export function isNumber(s) {
    return !Number.isNaN(Number.parseFloat(s));
}

/**
 * Checks if the given string can be parsed as an integer.
 *
 * @param {string} s
 * The string to test.
 *
 * @return {boolean}
 * Whether the string is valid.
 */
export function isInteger(s) {
    const n = Number.parseFloat(s);
    return !Number.isNaN(n) && Math.floor(n) === n;
}

/**
 * Creates a validator that only accepts string represening numbers within the
 * given range.
 *
 * @param {Object} conf
 * The configuration of the validator.
 *
 * @param {number} conf.min
 * The lower bound of the range.
 *
 * @param {number} conf.max
 * The upper bound of the range.
 *
 * @return {Function}
 * The created validator.
 */
export function isNumberInRange({
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
} = {}) {
    return function (s) {
        const n = Number.parseFloat(s);
        return !Number.isNaN(n) && min <= n && n <= max;
    };
}

/**
 * Checks if the given string can be parsed as a boolean.
 *
 * @param {string} s
 * The string to test.
 *
 * @return {boolean}
 * Whether the string is valid.
 */
export function isBoolean(s) {
    return s === "true" || s === "false";
}

/**
 * Checks if the given string is not empty.
 *
 * @param {string} s
 * The string to test.
 *
 * @return {boolean}
 * Whether the string is valid.
 */
export function isNotEmpty(s) {
    return s !== "";
}

/**
 * Checks if the given string represents a date and time.
 *
 * @param {string} s
 * The string to test.
 *
 * @return {boolean}
 * Whether the string is valid.
 */
export function isDateTime(s) {
    return s !== "";  // TODO
}

/**
 * Checks if the given string represents a date.
 *
 * @param {string} s
 * The string to test.
 *
 * @return {boolean}
 * Whether the string is valid.
 */
export function isDate(s) {
    return s !== ""; // TODO
}

/**
 * Checks if the given string represents a time.
 *
 * @param {string} s
 * The string to test.
 *
 * @return {boolean}
 * Whether the string is valid.
 */
export function isTime(s) {
    return s !== ""; // TODO
}

/**
 * Merges the given validators to a new one. A string passed to this validator
 * is only valid if every validator accepts it.
 *
 * @param {Array<Function>} validators
 * The validators to merge.
 *
 * @return {Function}
 * The new validator.
 */
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

/**
 * Merges the given validators to a new one. A string passed to this validator
 * is only valid if at least one of the validators accepts it.
 *
 * @param {Array<Function>} validators
 * The validators to merge.
 *
 * @return {Function}
 * The new validator.
 */
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

/**
 * Checks if the given state is valid by passing every key, value pair to the
 * validator.
 *
 * @param {Function} validator
 * The validator to use.
 *
 * @param {Object} state
 * The state to validate.
 *
 * @return {boolean}
 * Whether the state is valid.
 */
export function isValidState(validator, state) {
    for (let [k, v] of Object.entries(state)) {
        if (!validator(k, v)) {
            return false;
        }
    }
    return true;
}