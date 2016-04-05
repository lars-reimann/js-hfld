import _ from "lodash/fp";

import dispatcher from "../dispatcher/dispatcher.js";

function simpleActionCreator(type) {
    return () => ({ type });
}

function dialogActionCreator(type) {
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

export default _({
    "SHOW_OPEN_DIALOG":               dialogActionCreator("SHOW_OPEN_DIALOG"),
    "SUBMIT_OPEN_DIALOG":             submitOpenDialog,
    "SHOW_SAVE_DIALOG":               dialogActionCreator("SHOW_SAVE_DIALOG"),
    "SHOW_CLOSE_DIALOG":              dialogActionCreator("SHOW_CLOSE_DIALOG"),
    "SHOW_SCALE_DIALOG":              dialogActionCreator("SHOW_SCALE_DIALOG"),
    "SUBMIT_SCALE_DIALOG":            submitScaleDialog,
    "SHOW_ROTATE_DIALOG":             dialogActionCreator("SHOW_ROTATE_DIALOG"),
    "SUBMIT_ROTATE_DIALOG":           submitRotateDialog,
    "CHANGE_VIEWPORT":                changeViewport,
    "TOGGLE_PERMANENT_MENUBAR":       simpleActionCreator("TOGGLE_PERMANENT_MENUBAR"),
    "TOGGLE_PERMANENT_LEFT_SIDEBAR":  simpleActionCreator("TOGGLE_PERMANENT_LEFT_SIDEBAR"),
    "TOGGLE_PERMANENT_RIGHT_SIDEBAR": simpleActionCreator("TOGGLE_PERMANENT_RIGHT_SIDEBAR")
}).mapValues(actionCreator => (...args) => dispatcher.dispatch(actionCreator(...args))).value();
