import dispatcher from "../dispatcher/dispatcher.js";

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

// TODO: remove  v---------------------------v

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