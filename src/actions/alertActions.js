import {IDGenerator} from "@ignavia/util";

import dispatcher from "../dispatcher/dispatcher.js";

/**
 * An alert message to display.
 */
class AlertMessage {

    /**
     * @param {string} type
     * The type of the alert. This is one of "info", "success", "warning" or
     * "danger".
     *
     * @param {string} message
     * The message to display.
     */
    constructor(type, message) {

        /**
         * The type of the alert.
         *
         * @type {string}
         */
        this.type = type;

        /**
         * The message to display.
         *
         * @type {string}
         */
        this.message = message;

        /**
         * The ID of the alert.
         *
         * @type {string}
         */
        this.id = AlertMessage.idGenerator.next();
    }
}
AlertMessage.idGenerator = new IDGenerator("a");

/**
 * Adds an entry to the alert queue.
 *
 * @param {string} type
 * The type of the alert. This is one of "info", "success", "warning" or
 * "error".
 *
 * @param {string} message
 * The message to display.
 */
export function enqueueAlert(type, message) {
    dispatcher.dispatch({
        type: "ENQUEUE_ALERT",
        alertMessage: new AlertMessage(type, message),
    });
}

/**
 * Removes the oldest entry in the alert queue.
 */
export function dequeueAlert() {
    dispatcher.dispatch({
        type: "DEQUEUE_ALERT"
    });
}
