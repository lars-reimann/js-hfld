import {Store} from "flux/utils";

import * as rdf from "@ignavia/rdf";

import actions    from "../actions/actions.js";
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

    async parse(s) {
        try {
            this.state = await this.parser.parse(s);
        } catch (err) {
            actions.ENQUEUE_ALERT("danger", err.message);
        }
    }

    __onDispatch(action) {
        switch (action.type) {
        case "SUBMIT_OPEN_DIALOG":
            return this.parse(action.content).then(() => this.__emitChange());
        }
    }
}

export default new RDFStore(dispatcher);