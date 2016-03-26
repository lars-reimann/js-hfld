import _ from "lodash/fp";

import dispatcher from "../dispatcher/dispatcher.js";

function changeViewport(viewport) {
    return {
        type: "CHANGE_VIEWPORT",
        viewport
    };
}

function simpleActionCreator(type) {
    return () => ({ type });
};

export default _({
    "OPEN":                           simpleActionCreator("OPEN"),
    "SAVE":                           simpleActionCreator("SAVE"),
    "CLOSE":                          simpleActionCreator("CLOSE"),
    "CHANGE_VIEWPORT":                changeViewport,
    "TOGGLE_PERMANENT_MENUBAR":       simpleActionCreator("TOGGLE_PERMANENT_MENUBAR"),
    "TOGGLE_PERMANENT_LEFT_SIDEBAR":  simpleActionCreator("TOGGLE_PERMANENT_LEFT_SIDEBAR"),
    "TOGGLE_PERMANENT_RIGHT_SIDEBAR": simpleActionCreator("TOGGLE_PERMANENT_RIGHT_SIDEBAR")
}).mapValues(actionCreator => (...args) => dispatcher.dispatch(actionCreator(...args))).value();
