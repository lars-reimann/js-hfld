import {Store} from "flux/utils";

import * as earl                        from "@ignavia/earl";
import {Tolkien1To1Map, Tolkien1ToNMap} from "@ignavia/util";

import dispatcher from "../dispatcher/dispatcher.js";

import rdfStore from "./rdfStore.js";

const rdfToken = rdfStore.getDispatchToken();

class GraphStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.initState();
    }

    initState() {
        this.state = {
            graph:     new earl.Graph(),
            earlToRDF: {
                nodes: new Tolkien1ToNMap(),
                edges: new Tolkien1To1Map()
            },
            layout:    new Map()
        };
    }

    getGraph() {
        return this.state.graph;
    }

    getLayout() {
        return this.state.layout;
    }

    convertEarlNodeToRDFNode(earlNode) {
        const rdfNodeId = this.state.earlToRDF.nodes.convertXToY(earlNode.id)[0];
        return rdfStore.getGraph().getNodeById(rdfNodeId);
    }

    convertRDFNodeToEarlNode(rdfNode) {
        const earlNodeId = this.state.earlToRDF.nodes.convertYToX(rdfNode.id)[0];
        return this.state.graph.getNodeById(earlNodeId);
    }

    convertEarlEdgeToRDFTriple(earlEdge) {
        const rdfTripleId = this.state.earlToRDF.triples.convertXToY(earlEdge.id)[0];
        return rdfStore.getGraph().getTripleById(rdfTripleId);
    }

    convertRDFTripleToEarlEdge(rdfTriple) {
        const earlEdgeId = this.state.earlToRDF.triples.convertYToX(rdfTriple.id)[0];
        return this.state.graph.getEdgeById(earlEdgeId);
    }

    getState() {
        return this.state;
    }

    hashRDFNode(rdfNode) {
        return `${rdfNode.interfaceName}#${rdfNode.nominalValue}`;
    }

    importRDFNode(imported, rdfNode) {
        if (rdfNode.interfaceName !== "Literal") {
            const hash = this.hashRDFNode(rdfNode);
            if (!imported.has(hash)) {
                const node = new earl.Node();
                this.state.graph.addNodes(node);
                this.state.earlToRDF.nodes.add(node.id, rdfNode.id);
                imported.set(hash, node.id);
            } else {
                const nodeId = imported.get(hash);
                this.state.earlToRDF.nodes.add(nodeId, rdfNode.id);
            }
        }
    }

    importTriple(imported, {subject, predicate, object}) {
        const subjectHash = this.hashRDFNode(subject);
        const objectHash  = this.hashRDFNode(object);
        const sourceId    = imported.get(subjectHash);
        const targetId    = imported.get(objectHash);
        if (sourceId && targetId) {
            const edge = new earl.Edge(sourceId, targetId);
            this.state.graph.addEdges(edge);
            this.state.earlToRDF.edges.add(edge.id, predicate.id);
        }
    }

    importRDFGraph() {
        this.initState();

        const imported = new Map();
        for (let triple of rdfStore.state.graph) {
            this.importRDFNode(imported, triple.subject);
            this.importRDFNode(imported, triple.object);
            this.importTriple(imported, triple);
        }
    }

    __onDispatch(action) {
        switch (action.type) {
            case "CLOSE":
                this.initState();
                break;
            case "OPEN_TURTLE":
                dispatcher.waitFor([rdfToken]);
                this.importRDFGraph();
                break;
        }
    }
}

export default new GraphStore(dispatcher);