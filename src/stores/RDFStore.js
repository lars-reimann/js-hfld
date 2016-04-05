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
        switch (action.type) {
        case "SUBMIT_OPEN_DIALOG":
            console.log(action.content); // TODO parse string with n3
        }
    }
}

export default new RDFStore(dispatcher);