import {Store} from "flux/utils";

import dispatcher from "../dispatcher/dispatcher.js";

// import earl stuff

class EarlStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
    }

    getState() {
        console.log("getState: earl");
    }

    __emitChange() {

    }

    __onDispatch(payload) {
        switch (payload.actionType) {
        case "OPEN": console.log("OPEN");
        }
    }
}

export default new EarlStore(dispatcher);