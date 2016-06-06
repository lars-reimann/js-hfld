import React from "react";

import {shrinkNodeValue} from "../../../utils/utils.js";

function shrink(props, node) { // TODO rename to nodeToString or something
    return shrinkNodeValue(
        props.rdf.profile,
        props.shrinkNodeValues,
        node
    );
}

export default function (props) {
    let entries = [...props.rdf.graph.literals(props.subject, props.predicate)]
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