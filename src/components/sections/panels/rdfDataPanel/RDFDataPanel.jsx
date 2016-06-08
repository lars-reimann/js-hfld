import React from "react";

function graphData(props) {
    return (
        <div>
            <h2>Graph Data</h2>
            <span>Number of triples: {props.rdf.getGraph().length}</span>
        </div>
    );
}

export default function (props) {
    return (
        <div style={{overflow: "auto"}}>
            {graphData(props)}
        </div>
    );
}
