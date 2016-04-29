import {MapStore} from "flux/utils";
import {List}     from "immutable";

import dispatcher from "../dispatcher/dispatcher.js";

class AppStore extends MapStore {
    constructor(dispatcher) {
        super(dispatcher);

        this._state = this._state
            .set("showOpenDialog", false)
            .set("showTranslateDialog", false)
            .set("showScaleDialog", false)
            .set("showRotateDialog", false)
            .set("viewport", "graphical")
            .set("permanentMenubar", true)
            .set("permanentLeftSidebar", false)
            .set("permanentRightSidebar", false)
            .set("shrinkNodeValuesInTable", true)
            .set("tableSorting", {column: "subject", order: "asc"})
            .set("alerts", new List());
    }

    toggle(state, key) {
        return state.set(key, !this.get(key));
    }

    reduce(state, action) {
        switch (action.type) {
        case "SHOW_OPEN_DIALOG":
            return state.set("showOpenDialog", action.show);
        case "SUBMIT_OPEN_DIALOG":
            return state.set("showOpenDialog", false);
        case "SHOW_TRANSLATE_DIALOG":
            return state.set("showTranslateDialog", action.show);
        case "SHOW_SCALE_DIALOG":
            return state.set("showScaleDialog", action.show);
        case "SUBMIT_SCALE_DIALOG":
            return state.set("showScaleDialog", false);
        case "SHOW_ROTATE_DIALOG":
            return state.set("showRotateDialog", action.show);
        case "SUBMIT_ROTATE_DIALOG":
            return state.set("showRotateDialog", false);
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
        case "ENQUEUE_ALERT":
            return state.set("alerts", state.get("alerts").push(action.alert));
        case "DEQUEUE_ALERT":
            return state.set("alerts", state.get("alerts").shift());
        case "SET_TABLE_SORTING":
            return state.set("tableSorting", action.sorting);
        default:
            return state;
        }
    }
}

export default new AppStore(dispatcher);
