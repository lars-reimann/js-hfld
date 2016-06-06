import React from "react";

import PredicateList from "./PredicateList.jsx";

export default function (props) {
    const entries = props.selection.nodes
        .map(   id   => props.rdf.graph.getNodeById(id))
        .filter(subject => subject !== undefined)
        // .filter(subject => ) // TODO filter empty predicate lists

        // add functions subjectHasLiteral and predicateHasLiterals to RDF
        .map(   subject => <PredicateList
            key={subject.id}
            subject={subject}
            rdf={props.rdf}
            shrinkNodeValues={props.shrinkNodeValues}
        />);

    return (
        <div style={{overflow: "auto"}}>
            {entries}
        </div>
    );
}