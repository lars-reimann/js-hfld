import React from "react";

import PredicateList from "./PredicateList.jsx";

export default function (props) {
    const entries = props.selection.getSelectedNodes()
        .filter(subject => props.rdf.getGraph().subjectHasLiterals(subject))
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