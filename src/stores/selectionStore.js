import {ReduceStore} from "flux/utils";
import Immutable     from "immutable";

import * as rdf from "@ignavia/rdf";

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
            nodes:     Immutable.Set(),
            triples:   Immutable.Set(),
            tablePage: 1,
            tripleFilter: {
                subject:   false,
                predicate: false,
                object:    false,
            },
        });
    }

    /**
     * Returns the triple filter.
     *
     * @return {Object}
     * The triple filter.
     */
    getTripleFilter() {
        return this.getState().get("tripleFilter");
    }

    /**
     * Computes the graph only consisting of triples matching the filter.
     *
     * @return {Graph}
     * The filtered graph.
     */
    getFilteredGraph() {
        return rdfStore.getGraph().match(this.getTripleFilter());
    }

    /**
     * Returns the selected table page.
     *
     * @return {number}
     * The selected table page.
     */
    getTablePage() {
        return this.getState().get("tablePage");
    }

    /**
     * Tests if the given node is selected.
     *
     * @param {String} id
     * The ID of the node to test.
     */
    isSelectedNode(id, selection = this.getSelection("nodes")) {
        return selection.has(id);
    }

    /**
     * Tests if the given triple is selected.
     *
     * @param {String} id
     * The ID of the triple to test.
     */
    isSelectedTriple(id, selection = this.getSelection("triples")) {
        return selection.has(id);
    }

    /**
     * Returns an array of the selected nodes.
     *
     * @return {Array<RDFNode>}
     * The selected nodes.
     */
    getSelectedNodes(selection = this.getSelection("nodes")) {
        return [...selection.values()].map(id => rdf.RDFNode.fromNT(id));
    }

    /**
     * Returns an array of the selected triples.
     *
     * @return {Array<RDFNode>}
     * The selected triples.
     */
    getSelectedTriples(selection = this.getSelection("triples")) {
        const graph = rdfStore.getGraph();
        return [...selection.values()].map(id => graph.getTripleById(id));
    }

    /**
     * Retrieves the selection from the current state.
     *
     * @param {string} field
     * Whether to get the node or triple selection.
     *
     * @return {Immutable.Set}
     * The selection.
     *
     * @private
     */
    getSelection(field) {
        return this.getState().get(field);
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
     * @param {string} field
     * Whether to change the node or triple selection.
     *
     * @return {Immutable.Map}
     * The new state.
     *
     * @private
     */
    select(state, ids, field) {
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
     * @param {Array} ids
     * The IDs to deselect.
     *
     * @param {string} field
     * Whether to change the node or triple selection.
     *
     * @return {Immutable.Map}
     * The new state.
     *
     * @private
     */
    deselect(state, ids, field) {
        const oldSelection = state.get(field);
        const newSelection = oldSelection.subtract(ids);
        return state.set(field, newSelection);
    }

    /**
     * Toggles the selection of the given IDs. If something is selected
     * already, it is deselected. Otherwise it is added to the selection.
     *
     * @param {Immutable.Map} state
     * The current state.
     *
     * @param {Array} ids
     * The IDs to toggle.
     *
     * @param {string} field
     * Whether to change the node or triple selection.
     *
     * @return {Immutable.Map}
     * The new state.
     *
     * @private
     */
    toggleSelection(state, ids, field) {
        const oldSelection = state.get(field);
        let   newSelection = oldSelection;
        for (let id of ids) {
            if (oldSelection.has(id)) {
                newSelection = newSelection.delete(id);
            } else {
                newSelection = newSelection.add(id);
            }
        }
        return state.set(field, newSelection);
    }

    /**
     * Handles the SET_TABLE_ROWS_PER_PAGE action.
     *
     * @param {Object} state
     * The current state.
     *
     * @param {number} rowsPerPage
     * The new of table rows per page.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    setTableRowsPerPage(state, rowsPerPage) {
        const tablePage = Math.min(
            state.get("tablePage"),
            Math.ceil(
                rdfStore.getGraph().length  /
                rowsPerPage
            )
        );
        return state.set("tablePage", tablePage);
    }

    /**
     * Handles the REMOVE_TRIPLES action. All removed triples get deselected.
     *
     * @param {Object} state
     * The current state.
     *
     * @param {number} triple
     * The triples to remove.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    removeTriples(state, triples) {
        const ids = triples.map(triple => triple.id);
        return this.deselectTriples(state, ids)
            .set("nodes", Immutable.Set());
    }

    /**
     * Handles the SELECT_ALL_MATCHING_TRIPLES action. It selects all triples
     * that pass the filter.
     *
     * @param {Object} state
     * The current state.
     *
     * @return {Object}
     * The new state.
     *
     * @private
     */
    selectAllMatchingTriples(state) {
        const triples = [...this.getFilteredGraph()].map(triple => triple.id);
        return this.select(state, triples, "triples");
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
        case "REMOVE_TRIPLES":
            return this.removeTriples(state, action.triples);
        case "CLEAR_SELECTION":
        case "CLOSE":
        case "OPEN_TURTLE":
            return this.getInitialState();
        case "CLEAR_NODE_SELECTION":
            return state.set("nodes", Immutable.Set());
        case "CLEAR_TRIPLE_SELECTION":
            return state.set("triples", Immutable.Set());
        case "SELECT_ALL_MATCHING_TRIPLES":
            return this.selectAllMatchingTriples(state);
        case "SELECT_NODES":
            return this.select(state, action.ids, "nodes");
        case "SELECT_TRIPLES":
            return this.select(state, action.ids, "triples");
        case "DESELECT_NODES":
            return this.deselect(state, action.ids, "nodes");
        case "DESELECT_TRIPLES":
            return this.deselect(state, action.ids, "triples");
        case "TOGGLE_NODE_SELECTION":
            return this.toggleSelection(state, action.ids, "nodes");
        case "TOGGLE_TRIPLE_SELECTION":
            return this.toggleSelection(state, action.ids, "triples");
        case "SELECT_TABLE_PAGE":
            return state.set("tablePage", action.tablePage);
        case "SET_TABLE_ROWS_PER_PAGE":
            return this.setTableRowsPerPage(state, action.rowsPerPage);
        case "FILTER_TRIPLES":
            return state.set("tripleFilter", action.filter);
        case "CLEAR_TRIPLE_FILTER":
            return state.set("tripleFilter", {
                subject:   false,
                predicate: false,
                object:    false,
            });
        default:
            return state;
        }
    }
}

/**
 * The sole instance of the selection store.
 *
 * @type {SelectionStore}
 */
export default new SelectionStore(dispatcher);
