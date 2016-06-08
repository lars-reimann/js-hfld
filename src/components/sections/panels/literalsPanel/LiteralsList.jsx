import React from "react";

function nodeToString(props, node) {
    return props.rdf.nodeToString(
        node,
        props.shrinkNodeValues
    );
}

export default function (props) {
    let entries = [...props.rdf.getGraph().literals(props.subject, props.predicate)]
        .map(literal => <li key={literal.id}>
            {nodeToString(props, literal)}
        </li>);

    return (
        <div>
            <h4>{nodeToString(props, props.predicate)}</h4>
            <ul>
                {entries}
            </ul>
        </div>
    );
}