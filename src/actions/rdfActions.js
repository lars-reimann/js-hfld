import dispatcher from "../dispatcher/dispatcher.js";

import {selectTriples} from "./selectionActions.js";

/**
 * Adds a new namespace to the profile.
 *
 * @param {String} prefix
 * The prefix to use.
 *
 * @param {String} iri
 * The IRI to use.
 */
export function addNamespace(prefix, iri) {
    dispatcher.dispatch({ type: "ADD_NAMESPACE", prefix, iri });
}

/**
 * Removes the old association between prefix and IRI and adds a new one.
 *
 * @param {String} oldPrefix
 * The old prefix of the namespace.
 *
 * @param {String} newPrefix
 * The new prefix to use.
 *
 * @param {String} newIRI
 * The new IRI to use.
 */
export function updateNamespace(oldPrefix, newPrefix, newIRI) {
    removeNamespace(oldPrefix);
    addNamespace(newPrefix, newIRI);
}

/**
 * Removes the namespace associated with the given prefix.
 *
 * @param {String} prefix
 * The prefix of the namespace.
 */
export function removeNamespace(prefix) {
    dispatcher.dispatch({ type: "REMOVE_NAMESPACE", prefix });
}

/**
 * Adds the given triple to the graph.
 *
 * @param {Triple} triple
 * The triple to add.
 */
export function addTriple(triple) {
    dispatcher.dispatch({ type: "ADD_TRIPLE", triple });
}

/**
 * Replaces the old triple with the new one.
 *
 * @param {Triple|String} oldTriple
 * The triple to remove. Providing its ID is enough.
 *
 * @param {Triple} newTriple
 * The triple to add instead.
 *
 * @param {Boolean} [selectNewTriple=false]
 * Whether to select the new triple.
 */
export function updateTriple(oldTriple, newTriple, selectNewTriple = false) {
    removeTriples([oldTriple]);
    addTriple(newTriple);

    if (selectNewTriple) {
        selectTriples([newTriple.id]);
    }
}

/**
 * Removes the given triples.
 *
 * @param {Array<Triple|String>} triples
 * The triples to remove. Their IDs are enough.
 */
export function removeTriples(triples) {
    dispatcher.dispatch({ type: "REMOVE_TRIPLES", triples });
}
