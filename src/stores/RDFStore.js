import {Store} from "flux/utils";

import * as rdf from "@ignavia/rdf";

import dispatcher from "../dispatcher/dispatcher.js";

const writer = new rdf.TurtleWriter();

class rdfStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.initState();
    }

    initState() {
        this.state = {
            graph:   new rdf.Graph(),
            profile: new rdf.Profile()
        };
    }

    getState() {
        return this.state;
    }

    getGraph() {
        return this.state.graph;
    }

    getProfile() {
        return this.state.profile;
    }

    toString() {
        return writer.serialize(this.state.graph, this.state.profile);
    }

    nodeToString(node, shrink = true){
        return (shrink ?
            this.state.profile.nodeToString(node) :
            node.toString()
        );
    }

    removeTriples(triples) {
        for (let triple of triples) {
            this.state.graph.remove(triple);
        }
        this.__emitChange();
    }

    __onDispatch(action) {
        switch (action.type) {
        case "ADD_TRIPLE":
            this.state.graph.add(action.triple);
            this.__emitChange();
            break;
        case "ADD_NAMESPACE":
        case "EDIT_NAMESPACE":
            this.state.profile.setPrefix(action.prefix, action.iri);
            this.__emitChange();
            break;
        case "REMOVE_NAMESPACE":console.log("remove >" + action.prefix + "<");
            this.state.profile.prefixes.remove(action.prefix);
            this.__emitChange();
            break;
        case "REMOVE_TRIPLES":
            return this.removeTriples(action.triples);
        case "CLOSE":
            this.initState();
            this.__emitChange();
            break;
        case "OPEN_TURTLE":
            this.state = action.result;
            this.__emitChange();
            break;
        }
    }
}

export default new rdfStore(dispatcher);