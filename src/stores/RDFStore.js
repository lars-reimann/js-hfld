import {Store} from "flux/utils";

import * as rdf from "@ignavia/rdf";

import actions    from "../actions/actions.js";
import dispatcher from "../dispatcher/dispatcher.js";

class RDFStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);

        this.parser = new rdf.TurtleReader();
    }

    getState() {
        return {
            graph:   new rdf.Graph(),
            profile: new rdf.Profile()
        }
    }

    async parse(s) {
        try {
            this.setState(await this.parser.parse(s));
        } catch (err) {
            actions.ENQUEUE_ALERT("danger", err.message);
        }
    }

    __onDispatch(action) {
        switch (action.type) {
        case "SUBMIT_OPEN_DIALOG":
            this.parse(action.content);
        }
    }
}

export default new RDFStore(dispatcher);