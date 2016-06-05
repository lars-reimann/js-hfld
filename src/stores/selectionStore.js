import {ReduceStore} from "flux/utils";
import Immutable     from "immutable";

import dispatcher from "../dispatcher/dispatcher.js";

/**
 * Stores the state of the selection.
 */
class SelectionStore extends ReduceStore {

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
            nodes:   Immutable.Set(),
            triples: Immutable.Set(),
        });
    }

    /**
     * Returns an object with the dialog state.
     *
     * @return {Object}
     * The state of the dialogs.
     */
    getState() {
        const {nodes, triples} = super.getState().toObject();
        return {
            nodes:   nodes.toArray(),
            triples: triples.toArray(),
        };
    }

    /**
     * Selects the given IDs.
     *
     * @param {Immutable.Map} state
     * The current state.
     *
     * @param {String} field
     * What to select (nodes or triples).
     *
     * @param {Array} ids
     * The IDs to select.
     *
     * @return {Immutable.Map}
     * The new state.
     */
    select(state, field, ids) {
        const oldSelection = state.get(field);
        const newSelection = oldSelection.union(ids);
        return state.set(field, newSelection);
    }

    /**
     * Deselects the given IDs.
     *
     * @param {Immutable.Map} state
     * The current state.
     *
     * @param {String} field
     * What to deselect (nodes or triples).
     *
     * @param {Array} ids
     * The IDs to deselect.
     *
     * @return {Immutable.Map}
     * The new state.
     */
    deselect(state, field, ids) {
        const oldSelection = state.get(field);
        const newSelection = oldSelection.subtract(ids);
        return state.set(field, newSelection);
    }

    /**
     * Toggles the selection of the given IDs. If something is selected already,
     * it is deselected. Otherwise it is added to the selection.
     *
     * @param {Immutable.Map} state
     * The current state.
     *
     * @param {String} field
     * What to toggle (nodes or triples).
     *
     * @param {Array} ids
     * The IDs to toggle.
     *
     * @return {Immutable.Map}
     * The new state.
     */
    toggleSelection(state, field, ids) {
        const oldSelection = state.get(field);
        let   newSelection = oldSelection;
        for (let id of ids) {
            if (oldSelection.has(id)) {
                newSelection.delete(id);
            } else {
                newSelection.add(id);
            }
        }
        return state.set(field, newSelection);
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
        case "CLEAR_SELECTION":
            return this.getInitialState();
        case "CLEAR_NODE_SELECTION":
            return state.set("nodes", Immutable.Set());
        case "CLEAR_TRIPLE_SELECTION":
            return state.set("triples", Immutable.Set());
        case "SELECT_NODES":
            return this.select(state, "nodes", action.ids);
        case "SELECT_TRIPLES":
            return this.select(state, "triples", action.ids);
        case "DESELECT_NODES":
            return this.deselect(state, "nodes", action.ids);
        case "DESELECT_TRIPLES":
            return this.deselect(state, "triples", action.ids);
        case "TOGGLE_NODE_SELECTION":
            return this.toggleSelection(state, "nodes", action.ids);
        case "TOGGLE_TRIPLE_SELECTION":
            return this.toggleSelection(state, "triples", action.ids);
        default:
            return state;
        }
    }
}

export default new SelectionStore(dispatcher);
