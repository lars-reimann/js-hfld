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
            imported:  new Map(),
            graph:     new earl.Graph(),
            earlToRDF: {
                nodes: new Tolkien1ToNMap(),
                edges: new Tolkien1To1Map(),
            },
            layout:    new Map(),
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
        const rdfTripleId = this.state.earlToRDF.edges.convertXToY(earlEdge.id)[0];
        return rdfStore.getGraph().getTripleById(rdfTripleId);
    }

    convertRDFTripleToEarlEdge(rdfTriple) {
        const earlEdgeId = this.state.earlToRDF.edges.convertYToX(rdfTriple.id)[0];
        return this.state.graph.getEdgeById(earlEdgeId);
    }

    getState() {
        return this.state;
    }

    hashRDFNode(rdfNode) {
        return `${rdfNode.interfaceName}#${rdfNode.nominalValue}`;
    }

    importRDFNode(rdfNode) {
        const imported = this.state.imported;
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

    importTriple({subject, predicate, object, id}) {
        const imported    = this.state.imported;
        const subjectHash = this.hashRDFNode(subject);
        const objectHash  = this.hashRDFNode(object);
        const sourceId    = imported.get(subjectHash);
        const targetId    = imported.get(objectHash);
        if (sourceId && targetId) {
            const edge = new earl.Edge(sourceId, targetId);
            this.state.graph.addEdges(edge);
            this.state.earlToRDF.edges.add(edge.id, id);
        }
    }

    importRDFGraph() {
        this.initState();

        for (let triple of rdfStore.state.graph) {
            this.addTriple(triple);
        }
    }

    addTriple(triple) {
        this.importRDFNode(triple.subject);
        this.importRDFNode(triple.object);
        this.importTriple(triple);
    }

    removeNode(rdfNode) {
        const node = this.convertRDFNodeToEarlNode(rdfNode);
        if (node.getNumberOfIncidentEdges() === 0) {
            this.state.graph.removeNodes(node);
            this.state.earlToRDF.nodes.deleteX(node.id);
            this.state.layout.delete(node.id);
        }
    }

    removeTriple(rdfTriple) {
        const edge = this.convertRDFTripleToEarlEdge(rdfTriple);
        console.log(edge);
        this.state.graph.removeEdges(edge);
        this.state.earlToRDF.edges.deleteX(edge.id);
        this.removeNode(rdfTriple.subject);
        this.removeNode(rdfTriple.object);
    }

    removeTriples(triples) {
        dispatcher.waitFor([rdfToken]);
        for (let triple of triples) {
            this.removeTriple(triple);
        }
        this.__emitChange();
    }

    __onDispatch(action) {
        switch (action.type) {
            case "ADD_TRIPLE":
                dispatcher.waitFor([rdfToken]);
                this.addTriple(action.triple);
                this.__emitChange();
                break;
            case "REMOVE_TRIPLES":
                return this.removeTriples(action.triples);
            case "CLOSE":
                this.initState();
                this.__emitChange();
                break;
            case "OPEN_TURTLE":
                dispatcher.waitFor([rdfToken]);
                this.importRDFGraph();
                this.__emitChange();
                break;
        }
    }
}

export default new GraphStore(dispatcher);