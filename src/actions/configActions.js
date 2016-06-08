import dispatcher from "../dispatcher/dispatcher.js";

export function closeLeftSidebarTab(tab) {
    dispatcher.dispatch({ type: "CLOSE_LEFT_SIDEBAR_TAB", tab });
}

export function closeRightSidebarTab(tab) {
    dispatcher.dispatch({ type: "CLOSE_RIGHT_SIDEBAR_TAB", tab });
}

export function openLeftSidebarTab(tab) {
    dispatcher.dispatch({ type: "OPEN_LEFT_SIDEBAR_TAB", tab });
}

export function openRightSidebarTab(tab) {
    dispatcher.dispatch({ type: "OPEN_RIGHT_SIDEBAR_TAB", tab });
}

export function setLeftSidebarActiveTab(activeTab) {
    dispatcher.dispatch({ type: "SET_LEFT_SIDEBAR_ACTIVE_TAB", activeTab });
}

export function setLeftSidebarTabs(tabs) {
    dispatcher.dispatch({ type: "SET_LEFT_SIDEBAR_TABS", tabs });
}

export function setLeftSidebarVisibility(show) {
    dispatcher.dispatch({ type: "SET_LEFT_SIDEBAR_VISIBILITY", show });
}

export function setLeftSidebarWidth(width) {
    dispatcher.dispatch({ type: "SET_LEFT_SIDEBAR_WIDTH", width });
}

export function setPermanentMenubar(enabled) {
    dispatcher.dispatch({ type: "SET_PERMANENT_MENUBAR", enabled });
}

export function setRightSidebarActiveTab(activeTab) {
    dispatcher.dispatch({ type: "SET_RIGHT_SIDEBAR_ACTIVE_TAB", activeTab });
}

export function setRightSidebar(tabs) {
    dispatcher.dispatch({ type: "SET_RIGHT_SIDEBAR_TABS", tabs });
}

export function setRightSidebarVisibility(show) {
    dispatcher.dispatch({ type: "SET_RIGHT_SIDEBAR_VISIBILITY", show });
}

export function setRightSidebarWidth(width) {
    dispatcher.dispatch({ type: "SET_RIGHT_SIDEBAR_WIDTH", width });
}

export function setShrinkNodeValues(enabled) {
    dispatcher.dispatch({ type: "SET_SHRINK_NODE_VALUES", enabled });
}

export function setTableSorting(sorting) {
    dispatcher.dispatch({ type: "SET_TABLE_SORTING", sorting });
}

export function setViewport(viewport) {
    dispatcher.dispatch({ type: "SET_VIEWPORT", viewport });
}

export function toggleLeftSidebarTab(tab) {
    dispatcher.dispatch({ type: "TOGGLE_LEFT_SIDEBAR_TAB", tab });
}

export function toggleRightSidebarTab(tab) {
    dispatcher.dispatch({ type: "TOGGLE_RIGHT_SIDEBAR_TAB", tab });
}
