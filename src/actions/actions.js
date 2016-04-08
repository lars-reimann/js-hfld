import _ from "lodash/fp";

import {IDGenerator} from "@ignavia/util";

const alertIDGenerator = new IDGenerator("a");
class Alert {
    constructor(type, message) {
        this.type = type;

        this.message = message;

        this.id = alertIDGenerator.next();
    }
}

import dispatcher from "../dispatcher/dispatcher.js";

function simpleAction(type) {
    return () => ({ type });
}

function dialogAction(type) {
    return show => ({ type, show });
}

function submitOpenDialog(content) {
    return { type: "SUBMIT_OPEN_DIALOG", content };
}

function submitScaleDialog(factor) {
    return { type: "SUBMIT_SCALE_DIALOG", factor };
}

function submitRotateDialog(angle) {
    return { type: "SUBMIT_ROTATE_DIALOG", angle };
}

function changeViewport(viewport) {
    return { type: "CHANGE_VIEWPORT", viewport };
}

function enqueueAlert(type, message) {
    return { type: "ENQUEUE_ALERT", alert: new Alert(type, message) };
}

export default _({
    "SHOW_OPEN_DIALOG":               dialogAction("SHOW_OPEN_DIALOG"),
    "SUBMIT_OPEN_DIALOG":             submitOpenDialog,
    "SHOW_SAVE_DIALOG":               dialogAction("SHOW_SAVE_DIALOG"),
    "SHOW_CLOSE_DIALOG":              dialogAction("SHOW_CLOSE_DIALOG"),
    "SHOW_SCALE_DIALOG":              dialogAction("SHOW_SCALE_DIALOG"),
    "SUBMIT_SCALE_DIALOG":            submitScaleDialog,
    "SHOW_ROTATE_DIALOG":             dialogAction("SHOW_ROTATE_DIALOG"),
    "SUBMIT_ROTATE_DIALOG":           submitRotateDialog,
    "CHANGE_VIEWPORT":                changeViewport,
    "TOGGLE_PERMANENT_MENUBAR":       simpleAction("TOGGLE_PERMANENT_MENUBAR"),
    "TOGGLE_PERMANENT_LEFT_SIDEBAR":  simpleAction("TOGGLE_PERMANENT_LEFT_SIDEBAR"),
    "TOGGLE_PERMANENT_RIGHT_SIDEBAR": simpleAction("TOGGLE_PERMANENT_RIGHT_SIDEBAR"),
    "ENQUEUE_ALERT":                  enqueueAlert,
    "DEQUEUE_ALERT":                  simpleAction("DEQUEUE_ALERT")
}).mapValues(actionCreator => (...args) => dispatcher.dispatch(actionCreator(...args))).value();
