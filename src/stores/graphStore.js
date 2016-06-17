import {Store} from "flux/utils";

import * as earl                        from "@ignavia/earl";
import {Tolkien1To1Map, Tolkien1ToNMap} from "@ignavia/util";
import {GraphView} from "@ignavia/draph";

import dispatcher from "../dispatcher/dispatcher.js";

import rdfStore from "./rdfStore.js";

const rdfToken = rdfStore.getDispatchToken();

class GraphStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.initState();
    }

    initState() {
        const g = new earl.Graph();
const n0 = new earl.Node("n0");
const n1 = new earl.Node("n1");
const n2 = new earl.Node("n2");
g.addNodes(n0, n1, n2);

const e0 = new earl.Edge("n0", "n1");
const e1 = new earl.Edge("n1", "n2");
const e2 = new earl.Edge("n2", "n3");
const e3 = new earl.Edge("n3", "n0");
const e4 = new earl.Edge("n2", "n0");
const e5 = new earl.Edge("n3", "n1");
g.addEdges(e0, e1, e2, e3, e4, e5);
console.log(n0, n1, n2, e0, e1, e2,e3, e4,e5, new earl.Node(), new earl.Edge())
        const graph = new earl.Graph();
        this.state = {
            imported:  new Map(),
            graph:     graph,
            draph:     new GraphView(g),
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

    getDraph() {
        return this.state.draph;
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
                console.log("added node", node);
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
            console.log("added edge", edge);
        }
    }

    importRDFGraph() {
        this.initState();

        for (let triple of rdfStore.state.graph) {
            this.addTriple(triple);
        }
        console.log("graph", this.state.graph);
        this.state.draph = new GraphView(this.state.graph);
    }

    addTriple(triple) {
        this.importRDFNode(triple.subject);
        this.importRDFNode(triple.object);
        this.importTriple(triple);
    }

    removeNode(rdfNode) {
        const node = this.convertRDFNodeToEarlNode(rdfNode);
        if (node && node.getNumberOfIncidentEdges() === 0) {
            this.state.graph.removeNodes(node);
            this.state.earlToRDF.nodes.deleteX(node.id);
            this.state.layout.delete(node.id);
        }
    }

    removeTriple(rdfTriple) {
        const edge = this.convertRDFTripleToEarlEdge(rdfTriple);
        if (edge) {
            this.state.graph.removeEdges(edge);
            this.state.earlToRDF.edges.deleteX(edge.id);
            this.removeNode(rdfTriple.subject);
            this.removeNode(rdfTriple.object);
        }
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