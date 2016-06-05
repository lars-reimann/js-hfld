import {Store} from "flux/utils";

import * as rdf from "@ignavia/rdf";

import dispatcher from "../dispatcher/dispatcher.js";

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

    __onDispatch(action) {
        switch (action.type) {
        case "CLOSE":
            this.initState();
            this.__emitChange();
            break;
        case "OPEN":
            this.state = action.result;
            this.__emitChange();
            console.log([...this.state.graph])
            break;
        }
    }
}

export default new rdfStore(dispatcher);