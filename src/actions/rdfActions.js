import dispatcher from "../dispatcher/dispatcher.js";

export function addTriple(triple) {
    dispatcher.dispatch({ type: "ADD_TRIPLE", triple });
}

export function removeTriples(triples) {
    dispatcher.dispatch({ type: "REMOVE_TRIPLES", triples });
}

export function addNamespace(prefix, iri) {
    dispatcher.dispatch({ type: "ADD_NAMESPACE", prefix, iri });
}

export function removeNamespace(prefix) {
    dispatcher.dispatch({ type: "REMOVE_NAMESPACE", prefix });
}