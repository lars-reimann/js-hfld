import {Store} from "flux/utils";

import * as earl                        from "@ignavia/earl";
import {Tolkien1To1Map, Tolkien1ToNMap} from "@ignavia/util";
import * as rdf                         from "@ignavia/rdf";
import {Vec2}                           from "@ignavia/ella";
import {Vec2Builder} from "@ignavia/ella"; // TODO: remove
import {GraphView} from "@ignavia/draph";

import {Stylesheet} from "../utils/stylesheet/index.js";

import dispatcher from "../dispatcher/dispatcher.js";

import configStore    from "./configStore.js";
import rdfStore       from "./rdfStore.js";
import selectionStore from "./selectionStore.js";

const configToken    = configStore.getDispatchToken();
const rdfToken       = rdfStore.getDispatchToken();
const selectionToken = selectionStore.getDispatchToken();

class GraphStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.initialLayouter = new earl.RandomLayouter({
            width:  screen.width,
            height: screen.height
        });
        this.initState();
    }

    initState() {
        const graph      = new earl.Graph();
        const stylesheet = new Stylesheet();
        const layout     = this.initialLayouter.layout(graph);
        const conf       = stylesheet.computeAllStyles(
            rdfStore.getGraph(),
            rdfStore.getProfile()
        );
        conf.layout = layout;
        const draph = new GraphView(graph, conf);
        draph.configureFilters(configStore.getState());
        this.state = {
            graph,
            draph,
            layout,
            stylesheet
        };
    }

    getGraph() {
        return this.state.graph;
    }

    getDraph() {
        return this.state.draph;
    }

    getLayout() {
        return this.state.layout;
    }

    convertEarlNodeToRDFNode(earlNode) {
        return rdf.RDFNode.fromNT(earlNode.id);
    }

    convertRDFNodeToEarlNode(rdfNode) {
        return this.state.graph.getNodeById(rdfNode.toNT());
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

    importRDFGraph() {
        this.initState();

        for (let triple of rdfStore.state.graph) {
            this.addTriple(triple);
        }

        this.state.layout = this.initialLayouter.layout(this.state.graph);
        const conf = this.state.stylesheet.computeAllStyles(
            rdfStore.getGraph(),
            rdfStore.getProfile()
        );
        conf.layout = this.state.layout;
        this.state.draph = new GraphView(this.state.graph, conf);
        this.state.draph.configureFilters(configStore.getState());
    }

    addNode(id, addToDraph = false) {
        if (!this.state.graph.getNodeById(id)) {
            const node = new earl.Node(id);
            this.state.graph.addNodes(node);
            if (addToDraph) {
                this.addNodeToDraph(node);
            }
        }
    }

    addNodeToDraph(nodeObj) {
        const conf = this.state.stylesheet.computeNodeStyle(
            rdfStore.getGraph(),
            rdfStore.getProfile(),
            nodeObj.id
        );
        this.state.draph.addNode(nodeObj, conf);
        const nodeG = this.state.draph.getNodeDisplayObjectById(nodeObj.id);
        this.state.layout.moveNodeTo(nodeObj, new Vec2(nodeG.x, nodeG.y));
    }

    addTriple({subject, object, id}, addToDraph = false) {
        const subjectHash = subject.toNT();
        this.addNode(subjectHash, addToDraph);

        if (!object.isLiteral()) {
            const objectHash = object.toNT();
            this.addNode(objectHash, addToDraph);

            const edge = new earl.Edge(subjectHash, objectHash, id);
            this.state.graph.addEdges(edge);
            if (addToDraph) {
                this.addEdgeToDraph(edge);
            }
        }
    }

    addEdgeToDraph(edgeObj) {
        const conf = this.state.stylesheet.computeEdgeStyle(
            rdfStore.getGraph(),
            rdfStore.getProfile(),
            edgeObj.id
        );
        this.state.draph.addEdge(edgeObj, conf);
    }

    removeNode(rdfNode) {
        const node = this.convertRDFNodeToEarlNode(rdfNode);
        if (node && node.getNumberOfIncidentEdges() === 0) {
            this.state.graph.removeNodes(node);
            this.state.draph.removeNode(node.id);
        }
    }

    removeTriple(rdfTriple) {
        const edge = this.convertRDFTripleToEarlEdge(rdfTriple);
        if (edge) {
            this.state.graph.removeEdges(edge);
            this.removeNode(rdfTriple.subject);
            this.removeNode(rdfTriple.object);
            this.state.draph.removeEdge(edge.id);
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
        const conf = this.state.stylesheet.computeAllStyles(
            rdfStore.getGraph(),
            rdfStore.getProfile()
        );
        conf.layout = this.state.layout;
        this.state.draph = new GraphView(this.state.graph, conf);
        this.state.draph.configureFilters(configStore.getState());
        this.__emitChange();
    }

    selectNodes() {
        const selectedNodes = selectionStore.getSelectedNodes();
        const result = new Set();
        for (let node of selectedNodes) {
            if (node.interfaceName === "BlankNode" || node.interfaceName === "NamedNode") {
                result.add(node.toNT());
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
        console.log("before random", Vec2.counter, Vec2Builder.counter, performance.now())
        const random = new earl.RandomLayouter(conf);
        this.state.layout = random.layout(this.state.graph);
        console.log("after random", Vec2.counter, Vec2Builder.counter, performance.now())
        this.state.draph.setLayout(this.state.layout);
    }

    eadesLayout(conf) {
        console.log("before eades", Vec2.counter, Vec2Builder.counter, performance.now())
        const eades = new earl.EadesLayouter(conf);
        this.state.layout = eades.layout(this.state.graph, this.state.layout);
        console.log("after eades", Vec2.counter, Vec2Builder.counter, performance.now())
        this.state.draph.setLayout(this.state.layout);
    }

    fruchtermanLayout(conf) {
        console.log("before fruchterman", Vec2.counter, Vec2Builder.counter, performance.now())
        const fruchterman = new earl.FruchtermanLayouter(conf);
        this.state.layout = fruchterman.layout(this.state.graph, this.state.layout);
        console.log("after fruchterman", Vec2.counter, Vec2Builder.counter, performance.now())
        this.state.draph.setLayout(this.state.layout);
    }

    /**
     * Handles the SCALE action.
     *
     * @param {number} factorX
     * The scalar to multiply the x-component of the vector by.
     *
     * @param {number} factorY
     * The scalar to multiply the y-component of the vector by.
     *
     * @param {Vec2} center
     * Where to start the scaling.
     *
     * @private
     */
    scaleLayout(factorX, factorY, center) {
        this.state.layout.scaleAll(factorX, factorY, center);
        this.state.draph.setLayout(this.state.layout);
    }

    /**
     * Handles the TRANSLATE action.
     *
     * @param {Vec2} vec
     * The vector to add to the current positions.
     *
     * @private
     */
    translateLayout(vec) {
        this.state.layout.moveAllBy(vec);
        this.state.draph.setLayout(this.state.layout);
    }

    /**
     * Handles the ROTATE action.
     *
     * @param {number} angle
     * How far to rotate.
     *
     * @param {Vec2} center
     * The point to rotate around.
     *
     * @private
     */
    rotateLayout(angle, center) {
        this.state.layout.rotateAll(angle, center);
        this.state.draph.setLayout(this.state.layout);
    }

    center() {
        this.state.draph.center();
    }

    filterTriples() {
        dispatcher.waitFor([selectionToken]);
        const nodesToKeep = new Set();
        const edgesToKeep = new Set();
        for (let triple of selectionStore.getFilteredGraph()) {
            nodesToKeep.add(triple.subject.toNT());
            nodesToKeep.add(triple.object.toNT());
            edgesToKeep.add(triple.id);
        }
        this.state.draph.filterGraph(nodesToKeep, edgesToKeep);
        this.__emitChange();
    }

    openLayout(layout) {
        this.state.layout = layout;
        this.state.draph.setLayout(layout);
        this.__emitChange();
    }

    configureFilters() {
        dispatcher.waitFor([configToken]);
        this.state.draph.configureFilters(configStore.getState());
        this.__emitChange();
    }

    __onDispatch(action) {
        switch (action.type) {
            case "ADD_TRIPLE":
                dispatcher.waitFor([rdfToken]);
                this.addTriple(action.triple, true);
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
            case "FRUCHTERMAN_LAYOUT":
                return this.fruchtermanLayout(action.conf);
            case "SCALE":
                return this.scaleLayout(action.factorX, action.factorY, action.center);
            case "ROTATE":
                return this.rotateLayout(action.angle, action.center);
            case "TRANSLATE":
                return this.translateLayout(action.vec);
            case "CENTER":
                return this.center();
            case "FILTER_TRIPLES":
            case "CLEAR_TRIPLE_FILTER":
                return this.filterTriples();
            case "OPEN_LAYOUT":
                return this.openLayout(action.layout);
            case "SET_CARTESIAN_FISHEYE_CENTER_HEIGHT":
            case "SET_POLAR_FISHEYE_CENTER_HEIGHT":
            case "SET_POLAR_FISHEYE_RADIUS":
            case "SET_SIZE_SCALING_MIDPOINT":
            case "SET_SIZE_SCALING_STEEPNESS":
            case "OPEN_CONFIG":
                return this.configureFilters();
        }
    }
}

export default new GraphStore(dispatcher);