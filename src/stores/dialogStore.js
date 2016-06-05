import {ReduceStore} from "flux/utils";
import Immutable     from "immutable";

import dispatcher from "../dispatcher/dispatcher.js";

/**
 * Stores the state of the dialogs.
 */
class DialogStore extends ReduceStore {

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
            showCloseDialog:              false,
            showEadesLayoutDialog:        false,
            showFruchtermannLayoutDialog: false,
            showOpenConfigDialog:         false,
            showOpenLayoutDialog:         false,
            showOpenStyleDialog:          false,
            showOpenTurtleDialog:         false,
            showRandomLayoutDialog:       false,
            showRotateDialog:             false,
            showSaveTurtleDialog:         false,
            showScaleDialog:              false,
            showTranslateDialog:          false,
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
     * Handles the SET_DIALOG_VISIBILITY action.
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
    setDialogVisibility(state, {dialog, show}) {
        switch (dialog) {
        case "close":
            return state.set("showCloseDialog", show);
        case "eadesLayout":
            return state.set("showEadesLayoutDialog", show);
        case "fruchtermannLayout":
            return state.set("showFruchtermannLayoutDialog", show);
        case "openConfig":
            return state.set("showOpenConfigDialog", show);
        case "openLayout":
            return state.set("showOpenLayoutDialog", show);
        case "openStyle":
            return state.set("showOpenStyleDialog", show);
        case "openTurtle":
            return state.set("showOpenTurtleDialog", show);
        case "randomLayout":
            return state.set("showRandomLayoutDialog", show);
        case "rotate":
            return state.set("showRotateDialog", show);
        case "saveTurtle":
            return state.set("showSaveTurtleDialog", show);
        case "scale":
            return state.set("showScaleDialog", show);
        case "translate":
            return state.set("showTranslateDialog", show);
        default:
            return state;
        }
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
        case "SET_DIALOG_VISIBILITY":
            return this.setDialogVisibility(state, action);
        default:
            return state;
        }
    }
}

export default new DialogStore(dispatcher);
