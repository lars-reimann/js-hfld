import dispatcher from "../dispatcher/dispatcher.js";

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