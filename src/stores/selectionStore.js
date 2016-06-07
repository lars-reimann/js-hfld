import {ReduceStore} from "flux/utils";
import Immutable     from "immutable";

import dispatcher from "../dispatcher/dispatcher.js";

import rdfStore from "./rdfStore.js";

const rdfToken = rdfStore.getDispatchToken();

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
            triples: Immutable.Set(["t0"]),
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
     * @param {Array} ids
     * The IDs to select.
     *
     * @return {Immutable.Map}
     * The new state.
     */
    selectNodes(state, ids) {
        let selection = state.get("nodes");
        for (let id of ids) {
            selection = this.selectNode(id);
        }
        return state.set("nodes", selection);
    }

    selectNode(selection, id) {
        if (this.isSelectedNode(selection, id)) {
            return selection;
        }
        return selection.add(id);
    }

    /**
     * Selects the given triples.
     *
     * @param {Immutable.Map} state
     * The current state.
     *
     * @param {Array} ids
     * The IDs of the triples to select.
     *
     * @return {Immutable.Map}
     * The new state.
     */
    selectTriple(state, field, ids) {
        const oldSelection = state.get("triples");
        const newSelection = oldSelection.union(ids);
        return state.set("triples", newSelection);
    }

    /**
     * Deselects the given nodes.
     *
     * @param {Immutable.Map} state
     * The current state.
     *
     * @param {Array} ids
     * The IDs of the nodes to deselect.
     *
     * @return {Immutable.Map}
     * The new state.
     */
    deselectNodes(state, ids) {
        let selection = state.get("nodes");
        for (let id of ids) {
            selection = this.deselectNode(selection, id);
        }
        return state.set("nodes", selection);
    }

    deselectNode(selection, id) {
        let result = selection;
        for (let id of this.iterEquivalentIds(id)) {
            result = result.delete(id);
        }
        return result;
    }

    /**
     * Deselects the given triples.
     *
     * @param {Immutable.Map} state
     * The current state.
     *
     * @param {Array} ids
     * The IDs of the triples to deselect.
     *
     * @return {Immutable.Map}
     * The new state.
     */
    deselectTriples(state, ids) {
        const oldSelection = state.get("triples");
        const newSelection = oldSelection.subtract(ids);
        return state.set("triples", newSelection);
    }

    /**
     * Toggles the selection of the given nodes. If something is selected
     * already, it is deselected. Otherwise it is added to the selection.
     *
     * @param {Immutable.Map} state
     * The current state.
     *
     * @param {Array} ids
     * The IDs of the nodes to toggle.
     *
     * @return {Immutable.Map}
     * The new state.
     */
    toggleNodeSelection(state, ids) {
        const oldSelection = state.get("nodes");
        let   newSelection = oldSelection;
        for (let id of ids) {
            if (this.isSelectedNode(oldSelection, id)) {
                newSelection = this.deselectNode(newSelection, id);
            } else {
                newSelection = this.selectNode(newSelection, id);
            }
        }
        console.log([...newSelection])
        return state.set("nodes", newSelection);
    }

    isSelectedNode(selection, idToCheck) {
        for (let id of this.iterEquivalentIds(idToCheck)) {
            if (selection.has(id)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Toggles the selection of the given triples. If something is selected
     * already, it is deselected. Otherwise it is added to the selection.
     *
     * @param {Immutable.Map} state
     * The current state.
     *
     * @param {Array} ids
     * The IDs of the triples to toggle.
     *
     * @return {Immutable.Map}
     * The new state.
     */
    toggleTripleSelection(state, ids) {
        const oldSelection = state.get("triples");
        let   newSelection = oldSelection;
        for (let id of ids) {
            if (oldSelection.has(id)) {
                newSelection = newSelection.delete(id);
            } else {
                newSelection = newSelection.add(id);
            }
        }
        return state.set("triples", newSelection);
    }

    * iterEquivalentIds(id) {
        const graph       = rdfStore.getState().graph;
        const nodeToMatch = graph.getNodeById(id);
        for (let node of graph.iterEquivalentNodes(nodeToMatch)) {
            yield node.id;
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
        dispatcher.waitFor([rdfToken]);
        switch (action.type) {
        case "CLEAR_SELECTION":
            return this.getInitialState();
        case "CLEAR_NODE_SELECTION":
            return state.set("nodes", Immutable.Set());
        case "CLEAR_TRIPLE_SELECTION":
            return state.set("triples", Immutable.Set());
        case "SELECT_NODES":
            return this.selectNodes(state, action.ids);
        case "SELECT_TRIPLES":
            return this.selectTriples(state, action.ids);
        case "DESELECT_NODES":
            return this.deselectNodes(state, action.ids);
        case "DESELECT_TRIPLES":
            return this.deselectTriples(state, action.ids);
        case "TOGGLE_NODE_SELECTION":
            return this.toggleNodeSelection(state, action.ids);
        case "TOGGLE_TRIPLE_SELECTION":
            return this.toggleTripleSelection(state, action.ids);
        default:
            return state;
        }
    }
}

export default new SelectionStore(dispatcher);
