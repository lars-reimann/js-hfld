import React from "react";

import LiteralsList from "./LiteralsList.jsx";

function shrink(props) {
    return props.rdf.nodeToString(
        props.subject,
        props.shrinkNodeValues
    );
}

export default function (props) {
    const graph = props.rdf.getGraph();
    let entries = [...graph.predicates(props.subject)]
        .filter(predicate => graph.predicateHasLiterals(props.subject, predicate))
        .map(predicate => <LiteralsList
            key={predicate.id}
            subject={props.subject}
            predicate={predicate}
            rdf={props.rdf}
            shrinkNodeValues={props.shrinkNodeValues}
        />);

    return (
        <div>
            <h2>{shrink(props)}</h2>
            {entries}
        </div>
    );
}