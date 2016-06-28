import dispatcher from "../dispatcher/dispatcher.js";

/**
 * Moves the node above all others.
 *
 * @param {string} nodeId
 * The ID of the node.
 */
export function moveNodeToTop(nodeId) {
    dispatcher.dispatch({ type: "MOVE_NODE_TO_TOP", nodeId });
}

/**
 * Moves the edge above all others.
 *
 * @param {string} edgeId
 * The ID of the edge.
 */
export function moveEdgeToTop(edgeId) {
    dispatcher.dispatch({ type: "MOVE_EDGE_TO_TOP", edgeId });
}

/**
 * Moves the stage so the nodes are centered.
 */
export function center() {
    dispatcher.dispatch({ type: "CENTER" });
}
