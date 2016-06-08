import dispatcher from "../dispatcher/dispatcher.js";

/**
 * Deselects all nodes and triples.
 */
export function clearSelection() {
    return dispatcher.dispatch({ type: "CLEAR_SELECTION" });
}

/**
 * Deselects all nodes.
 */
export function clearNodeSelection() {
    return dispatcher.dispatch({ type: "CLEAR_NODE_SELECTION" });
}

/**
 * Deselects all triples.
 */
export function clearTripleSelection() {
    return dispatcher.dispatch({ type: "CLEAR_TRIPLE_SELECTION" });
}

/**
 * Selects the given nodes.
 *
 * @param {Array} ids
 * The nodes to select.
 */
export function selectNodes(ids) {
    return dispatcher.dispatch({ type: "SELECT_NODES", ids });
}

/**
 * Selects the given triples.
 *
 * @param {Array} ids
 * The triples to select.
 */
export function selectTriples(ids) {
     return dispatcher.dispatch({ type: "SELECT_TRIPLES", ids });
}

/**
 * Selects the given table page.
 *
 * @param {Number} tablePage
 * The table page to select.
 */
export function selectTablePage(tablePage) {
    return dispatcher.dispatch({ type: "SELECT_TABLE_PAGE", tablePage });
}

/**
 * Deselects the given nodes.
 *
 * @param {Array} ids
 * The nodes to deselect.
 */
export function deselectNodes(ids) {
    return dispatcher.dispatch({ type: "DESELECT_NODES", ids });
}

/**
 * Deselects the given triples.
 *
 * @param {Array} ids
 * The triples to deselect.
 */
export function deselectTriples(ids) {
     return dispatcher.dispatch({ type: "DESELECT_TRIPLES", ids });
}

/**
 * Toggles to selection of the given nodes.
 *
 * @param {Array} ids
 * The IDs of the affected nodes.
 */
export function toggleNodeSelection(ids) {
    return dispatcher.dispatch({ type: "TOGGLE_NODE_SELECTION", ids });
}

/**
 * Toggles to selection of the given triples.
 *
 * @param {Array} ids
 * The IDs of the affected triples.
 */
export function toggleTripleSelection(ids) {
     return dispatcher.dispatch({ type: "TOGGLE_TRIPLE_SELECTION", ids });
}
