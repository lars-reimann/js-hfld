import dispatcher from "../dispatcher/alertDispatcher.js";

export function enqueueAlert(type, message) {
    dispatcher.dispatch({
        type: "ENQUEUE_ALERT",
        alert: new Alert(type, message)
    });
}

export function dequeueAlert() {
    dispatcher.dispatch({
        type: "DEQUEUE_ALERT"
    });
}
