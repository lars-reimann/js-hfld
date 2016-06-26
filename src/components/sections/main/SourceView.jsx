import React from "react";

/**
 * Renders the component.
 *
 * @param {Object} props
 * The props of the component.
 *
 * @param {Store} props.rdf
 * The RDF store.
 */
export default function render (props) {
    return (
        <pre>
            <code>{props.rdf.toString()}</code>
        </pre>
    );
}
