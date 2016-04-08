import dispatcher from "../dispatcher/dispatcher.js";

import * as rdf from "@ignavia/rdf";
import {IDGenerator} from "@ignavia/util";

const alertIDGenerator = new IDGenerator("a");
class Alert {
    constructor(type, message) {
        this.type = type;

        this.message = message;

        this.id = alertIDGenerator.next();
    }
}

function simpleAction(type) {
    return () => dispatcher.dispatch({ type });
}

function dialogAction(type) {
    return show => dispatcher.dispatch({ type, show });
}

const parser = new rdf.TurtleReader();
async function parseTurtle(s) {
    try {
        dispatcher.dispatch({ type: "PARSE_TURTLE", result: await parser.parse(s) });
    } catch (err) {
        enqueueAlert("danger", err.message);
    }
}

function submitOpenDialog(content) {
    dispatcher.dispatch({ type: "SUBMIT_OPEN_DIALOG", content });
    parseTurtle(content);
}

function submitScaleDialog(factor) {
    dispatcher.dispatch({ type: "SUBMIT_SCALE_DIALOG", factor });
}

function submitRotateDialog(angle) {
    dispatcher.dispatch({ type: "SUBMIT_ROTATE_DIALOG", angle });
}

function changeViewport(viewport) {
    dispatcher.dispatch({ type: "CHANGE_VIEWPORT", viewport });
}

function enqueueAlert(type, message) {
    dispatcher.dispatch({ type: "ENQUEUE_ALERT", alert: new Alert(type, message) });
}

export default {
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
    "DEQUEUE_ALERT":                  simpleAction("DEQUEUE_ALERT"),
    "PARSE_TURTLE":                   parseTurtle
};
