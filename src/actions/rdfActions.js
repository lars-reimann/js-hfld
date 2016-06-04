import {TurtleReader} from "@ignavia/rdf";

import {enqueueAlert} from "./alertActions.js";
import dispatcher    from "../dispatcher/dispatcher.js";

const parser = new TurtleReader();
export function parseTurtle(s) {console.log(s)
    parser.parse(s)
        .then(result => dispatcher.dispatch({ type: "OPEN", result }))
        .catch(err   => enqueueAlert("danger", err.message));
}