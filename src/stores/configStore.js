import {ReduceStore} from "flux/utils";
import Immutable     from "immutable";

import dispatcher from "../dispatcher/dispatcher.js";

/**
 * Stores the state of various options.
 */
class ConfigStore extends ReduceStore {

    /**
     * @param {Dispatcher} dispatcher
     * The dispatcher of this app.
     */
    constructor(dispatcher) {
        super(dispatcher);
    }

    /**
     * Creates the initial state of the store.
     *
     * @return {Object}
     * The initial state of the store.
     */
    getInitialState() {
        return this.openConfig({
            cartesianFisheyeCenterHeight: 0.499,
            leftSidebarActiveTab:         "literals",
            leftSidebarTabs:              ["literals"],
            leftSidebarWidth:             2,
            polarFisheyeCenterHeight:     0.499,
            polarFisheyeRadius:           1,
            rightSidebarActiveTab:        "literals",
            rightSidebarTabs:             ["literals", "earlData", "rdfData"],
            rightSidebarWidth:            3,
            sizeScalingMidpoint:          0.5,
            sizeScalingSteepness:         0,
            showLeftSidebar:              false,
            showRightSidebar:             true,
            shrinkNodeValues:             true,
            tableRowsPerPage:             20,
            tableSorting:                 {column: "subject", order: "asc"},
            viewport:                     "graphical",
        });
    }

    /**
     * Returns an object with the dialog state.
     *
     * @return {Object}
     * The state of the dialogs.
     */
    getState() {
        return super.getState().toObject();
    }

    /**
     * Closes the tab in the left sidebar.
     *
     * @param {Object} state
     * The current state.
     *
     * @param {string} tab
     * The tab to close.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    closeLeftSidebarTab(state, tab) {
        const currentTabs = state.get("leftSidebarTabs");
        const newTabs     = currentTabs.delete(tab);
        return state.set("leftSidebarTabs", newTabs);
    }

    /**
     * Closes the tab in the right sidebar.
     *
     * @param {Object} state
     * The current state.
     *
     * @param {string} tab
     * The tab to close.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    closeRightSidebarTab(state, tab) {
        const currentTabs = state.get("rightSidebarTabs");
        const newTabs     = currentTabs.delete(tab);
        return state.set("rightSidebarTabs", newTabs);
    }

    /**
     * Opens the tab in the left sidebar.
     *
     * @param {Object} state
     * The current state.
     *
     * @param {string} tab
     * The tab to open.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    openLeftSidebarTab(state, tab) {
        const currentTabs = state.get("leftSidebarTabs");
        const newTabs     = currentTabs.add(tab);
        return state.set("leftSidebarTabs", newTabs);
    }

    /**
     * Opens the tab in the right sidebar.
     *
     * @param {Object} state
     * The current state.
     *
     * @param {string} tab
     * The tab to open.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    openRightSidebarTab(state, tab) {
        const currentTabs = state.get("rightSidebarTabs");
        const newTabs     = currentTabs.add(tab);
        return state.set("rightSidebarTabs", newTabs);
    }

    /**
     * Toggles the tab in the left sidebar.
     *
     * @param {Object} state
     * The current state.
     *
     * @param {string} tab
     * The tab to toggle.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    toggleLeftSidebarTab(state, tab) {
        const currentTabs = state.get("leftSidebarTabs");
        if (currentTabs.has(tab)) {
            return this.closeLeftSidebarTab(state, tab);
        } else {
            return this.openLeftSidebarTab(state, tab);
        }
    }

    /**
     * Toggles the tab in the right sidebar.
     *
     * @param {Object} state
     * The current state.
     *
     * @param {string} tab
     * The tab to toggle.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    toggleRightSidebarTab(state, tab) {
        const currentTabs = state.get("rightSidebarTabs");
        if (currentTabs.has(tab)) {
            return this.closeRightSidebarTab(state, tab);
        } else {
            return this.openRightSidebarTab(state, tab);
        }
    }

    /**
     * Opens the given config.
     *
     * @param {Object} config
     * The config to open.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    openConfig(config) {
        return Immutable.Map(config)
            .set("leftSidebarTabs",  Immutable.Set(config.leftSidebarTabs))
            .set("rightSidebarTabs", Immutable.Set(config.rightSidebarTabs));
    }

    /**
     * Transforms the state given an action.
     *
     * @param {Object} state
     * The current state.
     *
     * @param {Object} action
     * The action to handle.
     *
     * @return {Object}
     * The new state.
     */
    reduce(state, action) {
        switch (action.type) {
        case "CLOSE_LEFT_SIDEBAR_TAB":
            return this.closeLeftSidebarTab(state, action.tab);
        case "CLOSE_RIGHT_SIDEBAR_TAB":
            return this.closeRightSidebarTab(state, action.tab);
        case "OPEN_CONFIG":
            return this.openConfig(action.config);
        case "OPEN_LEFT_SIDEBAR_TAB":
            return this.openLeftSidebarTab(state, action.tab);
        case "OPEN_RIGHT_SIDEBAR_TAB":
            return this.openRightSidebarTab(state, action.tab);
        case "SET_CARTESIAN_FISHEYE_CENTER_HEIGHT":
            return state.set("cartesianFisheyeCenterHeight", action.centerHeight);
        case "SET_FISHEYE_STEEPNESS":
            return state.set("fisheyeSteepness", action.steepness);
        case "SET_LEFT_SIDEBAR_ACTIVE_TAB":
            return state.set("leftSidebarActiveTab", action.activeTab);
        case "SET_LEFT_SIDEBAR_TABS":
            return state.set("leftSidebarTabs", Immutable.Set(action.tabs));
        case "SET_LEFT_SIDEBAR_VISIBILITY":
            return state.set("showLeftSidebar", action.show);
        case "SET_LEFT_SIDEBAR_WIDTH":
            return state.set("leftSidebarWidth", action.width);
        case "SET_POLAR_FISHEYE_CENTER_HEIGHT":
            return state.set("polarFisheyeCenterHeight", action.centerHeight);
        case "SET_POLAR_FISHEYE_RADIUS":
            return state.set("polarFisheyeRadius", action.radius);
        case "SET_RIGHT_SIDEBAR_ACTIVE_TAB":
            return state.set("rightSidebarActiveTab", action.activeTab);
        case "SET_RIGHT_SIDEBAR_VISIBILITY":
            return state.set("showRightSidebar", action.show);
        case "SET_RIGHT_SIDEBAR_TABS":
            return state.set("rightSidebarTabs", Immutable.Set(action.tabs));
        case "SET_RIGHT_SIDEBAR_WIDTH":
            return state.set("rightSidebarWidth", action.width);
        case "SET_SIZE_SCALING_MIDPOINT":
            return state.set("sizeScalingMidpoint", action.midpoint);
        case "SET_SIZE_SCALING_STEEPNESS":
            return state.set("sizeScalingSteepness", action.steepness);
        case "SET_SHRINK_NODE_VALUES":
            return state.set("shrinkNodeValues", action.enabled);
        case "SET_TABLE_ROWS_PER_PAGE":
            return state.set("tableRowsPerPage", action.rowsPerPage);
        case "SET_TABLE_SORTING":
            return state.set("tableSorting", action.sorting);
        case "SET_VIEWPORT":
            return state.set("viewport", action.viewport);
        case "TOGGLE_LEFT_SIDEBAR_TAB":
            return this.toggleLeftSidebarTab(state, action.tab);
        case "TOGGLE_RIGHT_SIDEBAR_TAB":
            return this.toggleRightSidebarTab(state, action.tab);
        default:
            return state;
        }
    }
}

/**
 * The sole instance of the config store.
 *
 * @type {ConfigStore}
 */
export default new ConfigStore(dispatcher);
