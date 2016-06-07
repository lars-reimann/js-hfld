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
        return super.getState().toObject();
    }

    /**
     * Tests if the given node (or an equivalent one) is selected.
     *
     * @param {String} idToCheck
     * The ID of the node to test.
     */
    isSelectedNode(idToCheck, selection = this.getState().nodes) {
        for (let id of this.iterEquivalentIds(idToCheck)) {
            if (selection.has(id)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Tests if the given triple is selected.
     *
     * @param {String} id
     * The ID of the triple to test.
     */
    isSelectedTriple(id, selection = this.getState().triples) {
        return selection.has(id);
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
     *
     * @private
     */
    selectNodes(state, ids) {
        let selection = state.get("nodes");
        for (let id of ids) {
            selection = this.selectNode(id);
        }
        return state.set("nodes", selection);
    }

    /**
     * Selects the given node.
     *
     * @param {Immutable.Set} selection
     * The currently selected nodes.
     *
     * @param {String} id
     * The ID of the node to select.
     *
     * @private
     */
    selectNode(selection, id) {
        if (this.isSelectedNode(id, selection)) {
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
     *
     * @private
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
     *
     * @private
     */
    deselectNodes(state, ids) {
        let selection = state.get("nodes");
        for (let id of ids) {
            selection = this.deselectNode(selection, id);
        }
        return state.set("nodes", selection);
    }

    /**
     * Deselects the given node.
     *
     * @param {Immutable.Set} selection
     * The currently selected nodes.
     *
     * @param {String} idToDeselect
     * The ID of the node to deselect.
     *
     * @private
     */
    deselectNode(selection, idToDeselect) {
        let result = selection;
        for (let id of this.iterEquivalentIds(idToDeselect)) {
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
     *
     * @private
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
     *
     * @private
     */
    toggleNodeSelection(state, ids) {
        const oldSelection = state.get("nodes");
        let   newSelection = oldSelection;
        for (let id of ids) {
            if (this.isSelectedNode(id, oldSelection)) {
                newSelection = this.deselectNode(newSelection, id);
            } else {
                newSelection = this.selectNode(newSelection, id);
            }
        }
        return state.set("nodes", newSelection);
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
     *
     * @private
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

    /**
     * Yields the IDs of equivalent nodes.
     *
     * @param {String} id
     * The ID of the node to match.
     *
     * @private
     */
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
