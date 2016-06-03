import * as rdf from "@ignavia/rdf";

import dispatcher from "../dispatcher/dispatcher.js";

const parser = new rdf.TurtleReader();
export async function parseTurtle(s) {
    try {
        dispatcher.dispatch({ type: "PARSE_TURTLE", result: await parser.parse(s) });
    } catch (err) {
        enqueueAlert("danger", err.message);
    }
}