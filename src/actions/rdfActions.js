import dispatcher from "../dispatcher/dispatcher.js";

import {selectTriples} from "./selectionActions.js";

/**
 * Adds a new namespace to the profile.
 *
 * @param {string} prefix
 * The prefix to use.
 *
 * @param {string} iri
 * The IRI to use.
 */
export function addNamespace(prefix, iri) {
    dispatcher.dispatch({ type: "ADD_NAMESPACE", prefix, iri });
}

/**
 * Removes the old association between prefix and IRI and adds a new one.
 *
 * @param {string} oldPrefix
 * The old prefix of the namespace.
 *
 * @param {string} newPrefix
 * The new prefix to use.
 *
 * @param {string} newIRI
 * The new IRI to use.
 */
export function updateNamespace(oldPrefix, newPrefix, newIRI) {
    removeNamespace(oldPrefix);
    addNamespace(newPrefix, newIRI);
}

/**
 * Removes the namespace associated with the given prefix.
 *
 * @param {string} prefix
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
 * @param {Triple|string} oldTriple
 * The triple to remove. Providing its ID is enough.
 *
 * @param {Triple} newTriple
 * The triple to add instead.
 *
 * @param {boolean} [selectNewTriple=false]
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
 * @param {Array<Triple|string>} triples
 * The triples to remove. Their IDs are enough.
 */
export function removeTriples(triples) {
    dispatcher.dispatch({ type: "REMOVE_TRIPLES", triples });
}
