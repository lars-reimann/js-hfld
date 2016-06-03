import {MapStore} from "flux/utils";
import {List}     from "immutable";

import dispatcher from "../dispatcher/dispatcher.js";

class AppStore extends MapStore {
    constructor(dispatcher) {
        super(dispatcher);

        this._state = this._state
            .set("viewport", "graphical")
            .set("permanentMenubar", true)
            .set("permanentLeftSidebar", false)
            .set("permanentRightSidebar", false)
            .set("shrinkNodeValuesInTable", true)
            .set("tableSorting", {column: "subject", order: "asc"})
    }

    toggle(state, key) {
        return state.set(key, !this.get(key));
    }

    reduce(state, action) {
        switch (action.type) {
        case "CHANGE_VIEWPORT":
            return state.set("viewport", action.viewport);
        case "TOGGLE_PERMANENT_MENUBAR":
            return this.toggle(state, "permanentMenubar");
        case "TOGGLE_PERMANENT_LEFT_SIDEBAR":
            return this.toggle(state, "permanentLeftSidebar");
        case "TOGGLE_PERMANENT_RIGHT_SIDEBAR":
            return this.toggle(state, "permanentRightSidebar");
        case "TOGGLE_SHRINK_NODE_VALUES_IN_TABLE":
            return this.toggle(state, "shrinkNodeValuesInTable");
        case "SET_TABLE_SORTING":
            return state.set("tableSorting", action.sorting);
        default:
            return state;
        }
    }
}

export default new AppStore(dispatcher);
