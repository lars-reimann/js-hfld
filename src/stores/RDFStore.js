import {Store} from "flux/utils";

import * as rdf from "@ignavia/rdf";

import dispatcher from "../dispatcher/dispatcher.js";

class RDFStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);

        this.parser = new rdf.TurtleReader();

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
        case "PARSE_TURTLE":
            this.state = action.result;
            this.__emitChange();
            break;
        }
    }
}

export default new RDFStore(dispatcher);