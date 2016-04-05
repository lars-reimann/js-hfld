export default {
    isNumber(s) {
        return !Number.isNaN(Number.parseFloat(s));
    },

    nonEmpty(s) {
        return s !== "";
    }
};