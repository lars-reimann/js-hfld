import dispatcher from "../dispatcher/dispatcher.js";

export function setInformationPanel(informationPanel) {
    dispatcher.dispatch({ type: "SET_INFORMATION_PANEL", informationPanel });
}

export function setPermanentLeftSidebar(enabled) {
    dispatcher.dispatch({ type: "SET_PERMANENT_LEFT_SIDEBAR", enabled });
}

export function setPermanentMenubar(enabled) {
    dispatcher.dispatch({ type: "SET_PERMANENT_MENUBAR", enabled });
}

export function setPermanentRightSidebar(enabled) {
    dispatcher.dispatch({ type: "SET_PERMANENT_RIGHT_SIDEBAR", enabled });
}

export function setShrinkNodeValuesInTable(enabled) {
    dispatcher.dispatch({ type: "SET_SHRINK_NODE_VALUES_IN_TABLE", enabled });
}

export function setTableSorting(sorting) {
    dispatcher.dispatch({ type: "SET_TABLE_SORTING", sorting });
}

export function setViewport(viewport) {
    dispatcher.dispatch({ type: "SET_VIEWPORT", viewport });
}
