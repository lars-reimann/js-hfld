import React from "react";

import GraphData from "./GraphData.jsx";

function nodeToString(props, node) {
    return props.rdf.nodeToString(
        node,
        props.shrinkNodeValue
    );
}

export default function (props) {
    const entries = props.selection.getSelectedNodes()
        .map(node  => ({
            rdfNode: node,
            earlNode: props.graph.convertRDFNodeToEarlNode(node)
        }))
        .filter(({rdfNode, earlNode}) => rdfNode !== undefined && earlNode !== undefined)
        .map(({rdfNode, earlNode}) => <GraphData
                key={rdfNode.id}
                title={nodeToString(props, rdfNode)}
                node={earlNode}
                graph={props.graph.getGraph()}
        />);

    return (
        <div style={{overflow: "auto"}}>
            {entries}
        </div>
    );
}