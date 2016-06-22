import {Store} from "flux/utils";

import * as earl                        from "@ignavia/earl";
import {Tolkien1To1Map, Tolkien1ToNMap} from "@ignavia/util";
import * as rdf                         from "@ignavia/rdf";
import {GraphView} from "@ignavia/draph";

import {Stylesheet} from "../utils/stylesheet/index.js";

import dispatcher from "../dispatcher/dispatcher.js";

import rdfStore from "./rdfStore.js";
import selectionStore from "./selectionStore.js";

const rdfToken = rdfStore.getDispatchToken();
const selectionToken = selectionStore.getDispatchToken();

class GraphStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.initState();
    }

    initState() {
        const graph      = new earl.Graph();
        const stylesheet = new Stylesheet();
        this.state = {
            imported:   new Map(),
            graph:      graph,
            draph:      new GraphView(graph, stylesheet.computeAllStyles(
                rdfStore.getGraph(),
                rdfStore.getProfile()
            )),
            earlToRDF: {
                nodes:  new Tolkien1ToNMap(),
                edges:  new Tolkien1To1Map(),
            },
            layout:     new Map(),
            stylesheet: stylesheet,
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
        return this.unhashEarlNodeId(earlNode.id);
    }

    convertRDFNodeToEarlNode(rdfNode) {
        return this.state.graph.getNodeById(this.hashRDFNode(rdfNode));
    }

    convertEarlEdgeToRDFTriple(earlEdge) {
        return rdfStore.getGraph().getTripleById(earlEdge.id);
    }

    convertRDFTripleToEarlEdge(rdfTriple) {
        return this.state.graph.getEdgeById(rdfTriple.id);
    }

    getState() {
        return this.state;
    }

    hashRDFNode(rdfNode) {
        return `${rdfNode.interfaceName}#${rdfNode.nominalValue}`;
    }

    unhashEarlNodeId(earlNodeId) {
        const regex = /^(BlankNode|NamedNode)#(.*)$/;
        const [, interfaceName, nominalValue] = regex.exec(earlNodeId);
        switch (interfaceName) {
        case "BlankNode":
            return new rdf.BlankNode(nominalValue);
        case "NamedNode":
            return new rdf.NamedNode(nominalValue);
        default:
            throw new Error(`Could not unhash ${earlNodeId}.`);
        }
    }

    importRDFNode(rdfNode) {
        const imported = this.state.imported;
        if (rdfNode.interfaceName !== "Literal") {
            const hash = this.hashRDFNode(rdfNode);
            if (!imported.has(hash)) {
                const node = new earl.Node(hash);
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
            const edge = new earl.Edge(sourceId, targetId, id);
            this.state.graph.addEdges(edge);
            this.state.earlToRDF.edges.add(edge.id, id);
        }
    }

    importRDFGraph() {
        this.initState();

        for (let triple of rdfStore.state.graph) {
            this.addTriple(triple);
        }

        this.state.draph = new GraphView(
            this.state.graph,
            this.state.stylesheet.computeAllStyles(
                rdfStore.getGraph(),
                rdfStore.getProfile()
            )
        );
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

    openStyle(stylesheet) {
        dispatcher.waitFor([rdfToken]);
        this.state.stylesheet = stylesheet;
        this.__emitChange();
    }

    loadedStyle() {
        dispatcher.waitFor([rdfToken]);
        this.state.draph.stopRenderLoop();
        this.state.draph = new GraphView(
            this.state.graph,
            this.state.stylesheet.computeAllStyles(
                rdfStore.getGraph(),
                rdfStore.getProfile()
            )
        );
        this.__emitChange();
    }

    selectNodes() {
        const selectedNodes = selectionStore.getSelectedNodes();
        const result = new Set();
        for (let node of selectedNodes) {
            if (node.interfaceName === "BlankNode" || node.interfaceName === "NamedNode") {
                result.add(`${node.interfaceName}#${node.nominalValue}`);
            }
        }
        this.state.draph.selectNodes(result);
    }

    selectTriples() {
        const selectedTriples = selectionStore.getSelectedTriples();
        const result = new Set();
        for (let triple of selectedTriples) {
            result.add(triple.id);
        }
        this.state.draph.selectEdges(result);
    }

    randomLayout(conf) {
        this.state.layout = earl.randomLayout(this.state.graph, conf);
        this.state.draph.setLayout(this.state.layout);
    }

    eadesLayout(conf) {
        this.state.layout = earl.eadesLayout(this.state.graph, conf);
        this.state.draph.setLayout(this.state.layout);
    }

    scaleLayout(factorX, factorY, center) {
        this.state.layout.scaleAll(factorX, factorY, center);
        this.state.draph.setLayout(this.state.layout);
    }

    translateLayout(vec) {
        this.state.layout.translateAll(vec);
        this.state.draph.setLayout(this.state.layout);
    }

    rotateLayout(angle, center) {
        this.state.layout.rotateAll(angle, center);
        this.state.draph.setLayout(this.state.layout);
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
            case "OPEN_STYLE":
                return this.openStyle(action.stylesheet);
            case "LOADED_STYLE":
                return this.loadedStyle();
            case "CLEAR_SELECTION":
                dispatcher.waitFor([selectionToken]);
                this.selectNodes();
                this.selectTriples();
                this.__emitChange();
                break;
            case "CLEAR_NODE_SELECTION":
            case "SELECT_NODES":
            case "DESELECT_NODES":
            case "TOGGLE_NODE_SELECTION":
                dispatcher.waitFor([selectionToken]);
                this.selectNodes();
                this.__emitChange();
                break;
            case "CLEAR_TRIPLE_SELECTION":
            case "SELECT_ALL_MATCHING_TRIPLES":
            case "SELECT_TRIPLES":
            case "DESELECT_TRIPLES":
            case "TOGGLE_TRIPLE_SELECTION":
                dispatcher.waitFor([selectionToken]);
                this.selectTriples();
                this.__emitChange();
                break;
            case "MOVE_NODE_TO_TOP":
                return this.state.draph.moveNodeToTop(action.nodeId);
            case "MOVE_EDGE_TO_TOP":
                return this.state.draph.moveEdgeToTop(action.edgeId);
            case "RANDOM_LAYOUT":
                return this.randomLayout(action.conf);
            case "EADES_LAYOUT":
                return this.eadesLayout(action.conf);
            case "SCALE":
                return this.scaleLayout(action.factorX, action.factorY, action.center);
            case "ROTATE":
                return this.rotateLayout(action.angle, action.center);
            case "TRANSLATE":
                return this.translateLayout(action.vec);
            case "FILTER_TRIPLES":
            case "CLEAR_TRIPLE_FILTER":
        }
    }
}

export default new GraphStore(dispatcher);