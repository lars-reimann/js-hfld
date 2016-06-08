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
        return Immutable.Map({
            leftSidebarActiveTab:  "literals",
            leftSidebarTabs:       Immutable.Set(["earlData", "rdfData"]),
            leftSidebarWidth:      2,
            permanentMenubar:      true,
            rightSidebarActiveTab: "literals",
            rightSidebarTabs:      Immutable.Set(["literals"]),
            rightSidebarWidth:     2,
            showLeftSidebar:       false,
            showRightSidebar:      true,
            shrinkNodeValues:      true,
            tableSorting:          {column: "subject", order: "asc"},
            viewport:              "graphical",
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

    closeLeftSidebarTab(state, tab) {
        const currentTabs = state.get("leftSidebarTabs");
        const newTabs     = currentTabs.delete(tab);
        return state.set("leftSidebarTabs", newTabs);
    }

    closeRightSidebarTab(state, tab) {
        const currentTabs = state.get("rightSidebarTabs");
        const newTabs     = currentTabs.delete(tab);
        return state.set("rightSidebarTabs", newTabs);
    }

    openLeftSidebarTab(state, tab) {
        const currentTabs = state.get("leftSidebarTabs");
        const newTabs     = currentTabs.add(tab);
        return state.set("leftSidebarTabs", newTabs);
    }

    openRightSidebarTab(state, tab) {
        const currentTabs = state.get("rightSidebarTabs");
        const newTabs     = currentTabs.add(tab);
        return state.set("rightSidebarTabs", newTabs);
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
            return Immutable.Map(action.config);
        case "OPEN_LEFT_SIDEBAR_TAB":
            return this.openLeftSidebarTab(state, action.tab);
        case "OPEN_RIGHT_SIDEBAR_TAB":
            return this.openRightSidebarTab(state, action.tab);
        case "SET_LEFT_SIDEBAR_ACTIVE_TAB":
            return state.set("leftSidebarActiveTab", action.activeTab);
        case "SET_LEFT_SIDEBAR_TABS":
            return state.set("leftSidebarTabs", Immutable.Set(action.tabs));
        case "SET_LEFT_SIDEBAR_VISIBILITY":
            return state.set("showLeftSidebar", action.show);
        case "SET_LEFT_SIDEBAR_WIDTH":
            return state.set("leftSidebarWidth", action.width);
        case "SET_RIGHT_SIDEBAR_ACTIVE_TAB":
            return state.set("rightSidebarActiveTab", action.activeTab);
        case "SET_PERMANENT_MENUBAR":
            return state.set("permanentMenubar", action.enabled);
        case "SET_RIGHT_SIDEBAR_VISIBILITY":
            return state.set("showRightSidebar", action.show);
        case "SET_RIGHT_SIDEBAR_TABS":
            return state.set("rightSidebarTabs", Immutable.Set(action.tabs));
        case "SET_RIGHT_SIDEBAR_WIDTH":
            return state.set("rightSidebarWidth", action.width);
        case "SET_SHRINK_NODE_VALUES":
            return state.set("shrinkNodeValues", action.enabled);
        case "SET_TABLE_SORTING":
            return state.set("tableSorting", action.sorting);
        case "SET_VIEWPORT":
            return state.set("viewport", action.viewport);
        default:
            return state;
        }
    }
}

export default new ConfigStore(dispatcher);
