import React from "react";

import {shrinkNodeValue} from "../../../utils/utils.js";
import LiteralsList      from "./LiteralsList.jsx";

function shrink(props) {
    return shrinkNodeValue(
        props.rdf.profile,
        props.shrinkNodeValues,
        props.subject
    );
}

export default function (props) {
    const graph = props.rdf.graph;
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