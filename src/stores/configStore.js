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
            informationPanel:        "literals",
            permanentLeftSidebar:    false,
            permanentMenubar:        true,
            permanentRightSidebar:   true,
            shrinkNodeValues:        true,
            tableSorting:            {column: "subject", order: "asc"},
            viewport:                "graphical",
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
        case "OPEN_CONFIG":
            return Immutable.Map(action.config);
        case "SET_INFORMATION_PANEL":
            return state.set("informationPanel", action.informationPanel);
        case "SET_PERMANENT_LEFT_SIDEBAR":
            return state.set("permanentLeftSidebar", action.enabled);
        case "SET_PERMANENT_MENUBAR":
            return state.set("permanentMenubar", action.enabled);
        case "SET_PERMANENT_RIGHT_SIDEBAR":
            return state.set("permanentRightSidebar", action.enabled);
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
