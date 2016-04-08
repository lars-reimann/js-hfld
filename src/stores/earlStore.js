import {Store} from "flux/utils";

import * as earl from "@ignavia/earl";

import dispatcher from "../dispatcher/dispatcher.js";

// import earl stuff

class EarlStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
    }

    getState() {
        //console.log("getState: earl");
    }

    __onDispatch(action) {
        //switch (action.actionType) {
        //case "OPEN": console.log("OPEN");
        //}
    }
}

export default new EarlStore(dispatcher);