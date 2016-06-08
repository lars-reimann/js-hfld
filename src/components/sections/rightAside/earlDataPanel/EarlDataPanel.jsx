import React from "react";

import NodeData from "./NodeData.jsx";

function nodeToString(props, node) {
    return props.rdf.nodeToString(
        node,
        props.shrinkNodeValue
    );
}

function graphData(props) {
    const graph = props.graph.getGraph();
    return (
        <div>
            <h2>Graph Data</h2>
            <span>Number of nodes: {graph.getNumberOfNodes()}</span>
            <br />
            <span>Number of edges: {graph.getNumberOfEdges()}</span>
            <br />
        </div>
    );
}

function nodeData(props) {
    const selectedNodes = props.selection.getSelectedNodes();

    if (selectedNodes.length === 0) {
        return null;
    }

    const entries = selectedNodes
        .map(node  => ({
            rdfNode: node,
            earlNode: props.graph.convertRDFNodeToEarlNode(node)
        }))
        .filter(({rdfNode, earlNode}) => rdfNode !== undefined && earlNode !== undefined)
        .map(({rdfNode, earlNode}) => <NodeData
                key={rdfNode.id}
                title={nodeToString(props, rdfNode)}
                node={earlNode}
                graph={props.graph.getGraph()}
        />);

    return (
        <div>
            <h2>Node Data</h2>
            {entries}
        </div>
    );
}

export default function (props) {
    return (
        <div style={{overflow: "auto"}}>
            {graphData(props)}
            {nodeData(props)}
        </div>
    );
}