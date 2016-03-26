import {Store} from "flux/utils";

import dispatcher from "../dispatcher/dispatcher.js";

// import rdf stuff

class RDFStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
    }

    getState() {
        console.log("getState: rdf store");
    }

    __onDispatch(action) {
        console.log("dispatch: rdf store");
    }
}

export default new RDFStore(dispatcher);