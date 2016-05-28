import {MapStore} from "flux/utils";
import Immutable  from "immutable";

import dispatcher from "../dispatcher/dispatcher.js";

/**
 * Stores the state of the dialogs.
 */
class DialogStore extends MapStore {

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
            showOpenDialog:               false,
            showEadesLayoutDialog:        false,
            showFruchtermannLayoutDialog: false,
            showRandomLayoutDialog:       false,
            showRotateDialog:             false,
            showScaleDialog:              false,
            showTranslateDialog:          false,
        });
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
        case "open":
            return state.set("showOpenDialog", show);
        case "eadesLayout":
            return state.set("showEadesLayoutDialog", show);
        case "fruchtermannLayout":
            return state.set("showFruchtermannLayoutDialog", show);
        case "randomLayout":
            return state.set("showRandomLayoutDialog", show);
        case "rotate":
            return state.set("showRotateDialog", show);
        case "scale":
            return state.set("showScaleDialog", show);
        case "translate":
            return state.set("showTranslateDialogs", show);
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
            return setDialogVisibility(state, action);
        default:
            return state;
        }
    }
}

export default new DialogStore(dispatcher);
