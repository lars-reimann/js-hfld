import {IDGenerator} from "@ignavia/util";

/**
 * An alert message to display.
 */
export default class Alert {

    /**
     * @param {String} type
     * The type of the alert. This is one of "info", "success", "warning" or
     * "error".
     *
     * @param {String} message
     * The message to display.
     */
    constructor(type, message) {

        /**
         * The type of the alert.
         *
         * @type {String}
         */
        this.type = type;

        /**
         * The message to display.
         *
         * @type {String}
         */
        this.message = message;

        /**
         * The ID of the alert.
         *
         * @type {String}
         */
        this.id = Alert.idGenerator.next();
    }
}
Alert.idGenerator = new IDGenerator("a");
