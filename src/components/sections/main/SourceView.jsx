import React from "react";

import {TurtleWriter} from "@ignavia/rdf";

const writer = new TurtleWriter();

export default function (props) {
    return (
        <pre>
            <code>{writer.serialize(props.rdf.graph, props.rdf.profile)}</code>
        </pre>
    );
}
