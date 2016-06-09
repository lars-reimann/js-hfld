import dispatcher from "../dispatcher/dispatcher.js";

export function addTriple(triple) {
    dispatcher.dispatch({ type: "ADD_TRIPLE", triple });
}