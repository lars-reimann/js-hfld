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
