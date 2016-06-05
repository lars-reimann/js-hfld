import dispatcher from "../dispatcher/dispatcher.js";

export function clearSelection() {
    return dispatcher.dispatch({ type: "CLEAR_SELECTION" });
}

export function clearNodeSelection() {
    return dispatcher.dispatch({ type: "CLEAR_NODE_SELECTION" });
}

export function clearTripleSelection() {
    return dispatcher.dispatch({ type: "CLEAR_TRIPLE_SELECTION" });
}

export function selectNodes(ids) {
    return dispatcher.dispatch({ type: "SELECT_NODES", ids });
}

export function selectTriples(ids) {
     return dispatcher.dispatch({ type: "SELECT_TRIPLES", ids });
}

export function deselectNodes(ids) {
    return dispatcher.dispatch({ type: "DESELECT_NODES", ids });
}

export function deselectTriples(ids) {
     return dispatcher.dispatch({ type: "DESELECT_TRIPLES", ids });
}

export function toggleNodeSelection(ids) {
    return dispatcher.dispatch({ type: "TOGGLE_NODE_SELECTION", ids });
}

export function toggleTripleSelection(ids) {
     return dispatcher.dispatch({ type: "TOGGLE_TRIPLE_SELECTION", ids });
}