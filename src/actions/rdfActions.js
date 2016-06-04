import {TurtleReader, TurtleWriter} from "@ignavia/rdf";

import {enqueueAlert} from "./alertActions.js";
import dispatcher     from "../dispatcher/dispatcher.js";

const parser = new TurtleReader();
const writer = new TurtleWriter();

export function parseTurtle(s) {
    parser.parse(s)
        .then(result => dispatcher.dispatch({ type: "OPEN", result }))
        .catch(err   => enqueueAlert("danger", err.message));
}

export function writeTurtle(graph, profile) {
    return writer.serialize(graph, profile);
}