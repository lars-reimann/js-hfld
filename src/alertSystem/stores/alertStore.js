import {ReduceStore} from "flux/utils";
import Immutable     from "immutable";

import dispatcher from "../dispatcher/alertDispatcher.js";

/**
 * Stores the state of the dialogs.
 */
class AlertStore extends ReduceStore {

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
        return Immutable.List();
    }

    /**
     * Returns an array with the alert messages.
     *
     * @return {Array}
     * The alert messages.
     */
    getState() {
        return [...super.getState()];
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
        case "ENQUEUE_ALERT":
            return state.push(action.alertMessage);
        case "DEQUEUE_ALERT":
            return state.shift();
        default:
            return state;
        }
    }
}

export default new AlertStore(dispatcher);
