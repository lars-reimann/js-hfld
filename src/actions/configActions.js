import dispatcher from "../dispatcher/dispatcher.js";

// Graphical View -------------------------------------------------------------

/**
 * Sets the strength of the cartesian fisheye distortion in the x-direction.
 *
 * @param {number} strength
 * The strength of the distortion.
 */
export function setCartesianFisheyeStrengthX(strength) {
    dispatcher.dispatch({ type: "SET_CARTESIAN_FISHEYE_STRENGTH_X", strength });
}

/**
 * Sets the strength of the cartesian fisheye distortion in the y-direction.
 *
 * @param {number} strength
 * The strength of the distortion.
 */
export function setCartesianFisheyeStrengthY(strength) {
    dispatcher.dispatch({ type: "SET_CARTESIAN_FISHEYE_STRENGTH_Y", strength });
}

/**
 * Sets the strength of the polar fisheye distortion.
 *
 * @param {number} strength
 * The strength of the distortion.
 */
export function setPolarFisheyeStrength(strength) {
    dispatcher.dispatch({ type: "SET_POLAR_FISHEYE_STRENGTH", strength });
}

/**
 * Sets whether the scaling of edge arrows is enabled.
 *
 * @param {boolean} enabled
 * If this feature is active.
 */
export function setScaleEdgeArrows(enabled) {
    dispatcher.dispatch({ type: "SET_SCALE_EDGE_ARROWS", enabled });
}

/**
 * Sets whether the scaling of edge decals is enabled.
 *
 * @param {boolean} enabled
 * If this feature is active.
 */
export function setScaleEdgeDecals(enabled) {
    dispatcher.dispatch({ type: "SET_SCALE_EDGE_DECALS", enabled });
}

/**
 * Sets whether the scaling of nodes is enabled.
 *
 * @param {boolean} enabled
 * If this feature is active.
 */
export function setScaleNodes(enabled) {
    dispatcher.dispatch({ type: "SET_SCALE_NODES", enabled });
}

// Sidebars -------------------------------------------------------------------

/**
 * Removes the given tab from the left sidebar.
 *
 * @param {string} tab
 * The tab to close.
 */
export function closeLeftSidebarTab(tab) {
    dispatcher.dispatch({ type: "CLOSE_LEFT_SIDEBAR_TAB", tab });
}

/**
 * Removes the given tab from the right sidebar.
 *
 * @param {string} tab
 * The tab to close.
 */
export function closeRightSidebarTab(tab) {
    dispatcher.dispatch({ type: "CLOSE_RIGHT_SIDEBAR_TAB", tab });
}

/**
 * Adds the given tab to the left sidebar.
 *
 * @param {string} tab
 * The tab to open.
 */
export function openLeftSidebarTab(tab) {
    dispatcher.dispatch({ type: "OPEN_LEFT_SIDEBAR_TAB", tab });
}

/**
 * Adds the given tab to the right sidebar.
 *
 * @param {string} tab
 * The tab to open.
 */
export function openRightSidebarTab(tab) {
    dispatcher.dispatch({ type: "OPEN_RIGHT_SIDEBAR_TAB", tab });
}

/**
 * Sets the tab that is currently displayed in the left sidebar.
 *
 * @param {string} activeTab
 * The tab to display.
 */
export function setLeftSidebarActiveTab(activeTab) {
    dispatcher.dispatch({ type: "SET_LEFT_SIDEBAR_ACTIVE_TAB", activeTab });
}

/**
 * Sets the tab that is currently displayed in the right sidebar.
 *
 * @param {string} activeTab
 * The tab to display.
 */
export function setRightSidebarActiveTab(activeTab) {
    dispatcher.dispatch({ type: "SET_RIGHT_SIDEBAR_ACTIVE_TAB", activeTab });
}

/**
 * Sets the available tabs in the left sidebar.
 *
 * @param {Array<string>} tabs
 * The available tabs.
 */
export function setLeftSidebarTabs(tabs) {
    dispatcher.dispatch({ type: "SET_LEFT_SIDEBAR_TABS", tabs });
}

/**
 * Sets the available tabs in the right sidebar.
 *
 * @param {Array<string>} tabs
 * The available tabs.
 */
export function setRightSidebarTabs(tabs) {
    dispatcher.dispatch({ type: "SET_RIGHT_SIDEBAR_TABS", tabs });
}

/**
 * Sets whether the left sidebar is visible.
 *
 * @param {boolean} show
 * Whether to show a sidebar on the left side of the screen.
 */
export function setLeftSidebarVisibility(show) {
    dispatcher.dispatch({ type: "SET_LEFT_SIDEBAR_VISIBILITY", show });
}

/**
 * Sets whether the right sidebar is visible.
 *
 * @param {boolean} show
 * Whether to show a sidebar on the right side of the screen.
 */
export function setRightSidebarVisibility(show) {
    dispatcher.dispatch({ type: "SET_RIGHT_SIDEBAR_VISIBILITY", show });
}

/**
 * Sets how many columns the left sidebar should span. This should be an
 * integer between 1 and 4.
 *
 * @param {number} width
 * The width of the left sidebar.
 */
export function setLeftSidebarWidth(width) {
    dispatcher.dispatch({ type: "SET_LEFT_SIDEBAR_WIDTH", width });
}

/**
 * Sets how many columns the right sidebar should span. This should be an
 * integer between 1 and 4.
 *
 * @param {number} width
 * The width of the right sidebar.
 */
export function setRightSidebarWidth(width) {
    dispatcher.dispatch({ type: "SET_RIGHT_SIDEBAR_WIDTH", width });
}

/**
 * Toggles whether the left sidebar has the given tab.
 *
 * @param {string} tab
 * The tab to toggle.
 */
export function toggleLeftSidebarTab(tab) {
    dispatcher.dispatch({ type: "TOGGLE_LEFT_SIDEBAR_TAB", tab });
}

/**
 * Toggles whether the right sidebar has the given tab.
 *
 * @param {string} tab
 * The tab to toggle.
 */
export function toggleRightSidebarTab(tab) {
    dispatcher.dispatch({ type: "TOGGLE_RIGHT_SIDEBAR_TAB", tab });
}

// Table View -----------------------------------------------------------------

/**
 * Sets how many rows each page of the table should contain.
 *
 * @param {number} rowsPerPage
 * The number of rows per page of the table.
 */
export function setTableRowsPerPage(rowsPerPage) {
    dispatcher.dispatch({ type: "SET_TABLE_ROWS_PER_PAGE", rowsPerPage });
}

/**
 * Sets how the table is sorted.
 *
 * @param {Object} sorting
 * How to sort the table.
 *
 * @param {string} sorting.column
 * The column to use for sorting. This is one of "subject", "predicate" or
 * "object".
 *
 * @param {string} sorting.order
 * The order in which to sort the rows. This is either ascending ("asc") or
 * descending ("desc").
 */
export function setTableSorting(sorting) {
    dispatcher.dispatch({ type: "SET_TABLE_SORTING", sorting });
}

// Other ----------------------------------------------------------------------

/**
 * Sets whether to use the profile to turn IRIs into CURIEs.
 *
 * @param {boolean} enable.
 * If this feature is active.
 */
export function setShrinkNodeValues(enabled) {
    dispatcher.dispatch({ type: "SET_SHRINK_NODE_VALUES", enabled });
}

/**
 * Sets what is displayed in the viewport.
 *
 * @param {string} viewport
 * What should be displayed in the viewport.
 */
export function setViewport(viewport) {
    dispatcher.dispatch({ type: "SET_VIEWPORT", viewport });
}