import {Store} from "flux/utils";

import * as earl        from "@ignavia/earl";
import {Tolkien1To1Map} from "@ignavia/util";

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
            earl:      new earl.Graph(),
            earlToRDF: {
                nodes: new Tolkien1To1Map(),
                edges: new Tolkien1To1Map()
            }
        };
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
                this.state.earl.addNodes(node);
                this.state.earlToRDF.nodes.add(node.id, rdfNode.id);
                imported.set(hash, node.id);
            }
        }
    }

    importTriple(imported, {subject, predicate, object}) {
        const subjectHash = this.hashRDFNode(subject);
        const objectHash  = this.hashRDFNode(object);
        const sourceId    = imported.get(subjectHash);
        const targetId    = imported.get(objectHash);
        if (sourceId && targetId) {
            const edge        = new earl.Edge(sourceId, targetId);
            this.state.earl.addEdges(edge);
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
            case "PARSE_TURTLE":
                dispatcher.waitFor([rdfToken]);
                this.importRDFGraph();
                console.log(this.state);
                break;
        }
    }
}

export default new GraphStore(dispatcher);