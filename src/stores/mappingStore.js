import {Store} from "flux/utils";

import dispatcher from "../dispatcher/dispatcher.js";

// import util/tolkien stuff
// map earl to rdf, draph to rdf, earl to draph

class MappingStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
    }

    getState() {
        console.log("getState: mapping store");
    }

    __onDispatch(action) {
        console.log("dispatch: mapping store");
    }
}

export default new MappingStore(dispatcher);