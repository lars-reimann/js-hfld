import React from "react";

import {writeTurtle} from "../../../actions/actions.js";

export default function (props) {
    return (
        <pre>
            <code>{writeTurtle(props.rdf.graph, props.rdf.profile)}</code>
        </pre>
    );
}
