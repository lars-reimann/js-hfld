import dispatcher from "../dispatcher/dispatcher.js";

export function moveNodeToTop(nodeId) {
    dispatcher.dispatch({ type: "MOVE_NODE_TO_TOP", nodeId });
}

export function moveEdgeToTop(edgeId) {
    dispatcher.dispatch({ type: "MOVE_EDGE_TO_TOP", edgeId });
}
