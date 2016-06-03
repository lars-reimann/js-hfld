import dispatcher   from "../dispatcher/alertDispatcher.js";
import AlertMessage from "./AlertMessage";

/**
 * Adds an entry to the alert queue.
 *
 * @param {String} type
 * The type of the alert. This is one of "info", "success", "warning" or
 * "error".
 *
 * @param {String} message
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
