import dispatcher from "../dispatcher/dispatcher.js";

import * as rdf      from "@ignavia/rdf";
import {IDGenerator} from "@ignavia/util";



// App ------------------------------------------------------------------------

export function changeViewport(viewport) {
    dispatcher.dispatch({ type: "CHANGE_VIEWPORT", viewport });
}

export function permanentMenubar(enabled) {
    dispatcher.dispatch({ type: "PERMANENT_MENUBAR", enabled });
}

export function permanentLeftSidebar(enabled) {
    dispatcher.dispatch({ type: "PERMANENT_LEFT_SIDEBAR", enabled });
}

export function permanentRightSidebar(enabled) {
    dispatcher.dispatch({ type: "PERMANENT_RIGHT_SIDEBAR", enabled });
}

export function shrinkNodeValuesInTable(enabled) {
    dispatcher.dispatch({ type: "SHRINK_NODE_VALUES_IN_TABLE", enabled });
}

export function setTableSorting(sorting) {
    dispatcher.dispatch({ type: "SET_TABLE_SORTING", sorting});
}

// Dialog ---------------------------------------------------------------------

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

/**
 * Rotates the layout aorund the given point by the angle.
 *
 * @param {Number} angle
 * How far to rotate.
 *
 * @param {Vec2} center
 * The point to rotate around.
 */
export function rotate(angle, center) {
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

// RDF ------------------------------------------------------------------------

const parser = new rdf.TurtleReader();
export async function parseTurtle(s) {
    try {
        dispatcher.dispatch({ type: "PARSE_TURTLE", result: await parser.parse(s) });
    } catch (err) {
        enqueueAlert("danger", err.message);
    }
}