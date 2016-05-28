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

// Dialog ---------------------------------------------------------------------

export function submitOpenDialog(content) {
    dispatcher.dispatch({ type: "SUBMIT_OPEN_DIALOG", content });
    parseTurtle(content);
    setDialogVisibility("open", false);
}

export function submitEadesLayoutDialog(conf) {
    eadesLayout(conf);
    setDialogVisibility("eadesLayout", false);
}

export function submitFruchtermannLayoutDialog(conf) {
    fruchtermannLayout(conf);
    setDialogVisibility("fruchtermannLayout", false);
}

export function submitRandomLayoutDialog(conf) {
    randomLayout(conf);
    setDialogVisibility("randomLayout", false);
}

export function submitRotateDialog(angle) {
    rotate(angle);
    setDialogVisibility("rotate", false);
}

export function submitScaleDialog(factor) {
    scale(factor);
    setDialogVisibility("scale", false);
}

export function submitTranslateDialog(vec) {
    translate(vec);
    setDialogVisibility("translate", false);
}

// Layout ---------------------------------------------------------------------

export function eadesLayout(conf) {
    dispatcher.dispatch({ type: "EADES_LAYOUT", conf});
}

export function fruchtermannLayout(conf) {
    dispatcher.dispatch({ type: "FRUCHTERMANN_LAYOUT", conf});
}

export function randomLayout(conf) {
    dispatcher.dispatch({ type: "RANDOM_LAYOUT", conf});
}

export function rotate(angle) {
    dispatcher.dispatch({ type: "ROTATE", angle });
}

/**
 * Scales the layout from the given center by the factor.
 *
 * @param {Number} factor
 * The scalar to multiply the vector by.
 *
 * @param {Vec2} center
 * Where to start the scaling.
 */
export function scale(factor, center) {
    dispatcher.dispatch({ type: "SCALE", factor, center });
}

/**
 * Moves the layout by the given vector.
 *
 * @param {Vec2} vec
 * The vector to add to the current positions.
 */
export function translate(vec) {
    dispatcher.dispatch({ type: "TRANSLATE", vec });
}













// Make actions for rotate, scale, open_file etc, not for the dialogs

/**
 * Sets the visibility of the given dialog.
 *
 * @param {String} dialog
 * The dialog to set the visibility for.
 *
 * @param {Boolean} show
 * Whether to show the dialog.
 */
export function setDialogVisibility(dialog, show) {
    dispatcher.dispatch({
        type: "SET_DIALOG_VISIBILITY",
        dialog,
        show
    });
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



function changeViewport(viewport) {
    dispatcher.dispatch({ type: "CHANGE_VIEWPORT", viewport });
}

function enqueueAlert(type, message) {
    dispatcher.dispatch({ type: "ENQUEUE_ALERT", alert: new Alert(type, message) });
}

function setTableSorting(sorting) {
    dispatcher.dispatch({ type: "SET_TABLE_SORTING", sorting});
}



export default {
    "SHOW_OPEN_DIALOG":                   dialogAction("SHOW_OPEN_DIALOG"),
    "SUBMIT_OPEN_DIALOG":                 submitOpenDialog,
    "SHOW_SAVE_DIALOG":                   dialogAction("SHOW_SAVE_DIALOG"),
    "SHOW_CLOSE_DIALOG":                  dialogAction("SHOW_CLOSE_DIALOG"),
    "SHOW_TRANSLATE_DIALOG":              dialogAction("SHOW_TRANSLATE_DIALOG"),
    "SHOW_SCALE_DIALOG":                  dialogAction("SHOW_SCALE_DIALOG"),
    "SUBMIT_SCALE_DIALOG":                submitScaleDialog,
    "SHOW_ROTATE_DIALOG":                 dialogAction("SHOW_ROTATE_DIALOG"),
    "SUBMIT_ROTATE_DIALOG":               submitRotateDialog,
    "CHANGE_VIEWPORT":                    changeViewport,
    "TOGGLE_PERMANENT_MENUBAR":           simpleAction("TOGGLE_PERMANENT_MENUBAR"),
    "TOGGLE_PERMANENT_LEFT_SIDEBAR":      simpleAction("TOGGLE_PERMANENT_LEFT_SIDEBAR"),
    "TOGGLE_PERMANENT_RIGHT_SIDEBAR":     simpleAction("TOGGLE_PERMANENT_RIGHT_SIDEBAR"),
    "TOGGLE_SHRINK_NODE_VALUES_IN_TABLE": dialogAction("TOGGLE_SHRINK_NODE_VALUES_IN_TABLE"),
    "ENQUEUE_ALERT":                      enqueueAlert,
    "DEQUEUE_ALERT":                      simpleAction("DEQUEUE_ALERT"),
    "PARSE_TURTLE":                       parseTurtle,
    "SET_TABLE_SORTING":                  setTableSorting
};
