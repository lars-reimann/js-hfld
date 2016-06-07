import React from "react";

function shrink(props, node) {
    return props.rdf.nodeToString(
        node,
        props.shrinkNodeValue
    );
}

export default function (props) {
    let entries = [...props.rdf.getGraph().literals(props.subject, props.predicate)]
        .map(literal => <li key={literal.id}>
            {shrink(props, literal)}
        </li>);

    return (
        <div>
            <h4>{shrink(props, props.predicate)}</h4>
            <ul>
                {entries}
            </ul>
        </div>
    );
}