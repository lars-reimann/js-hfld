import React from "react";

export default function (props) {
    return (
        <pre>
            <code>{props.rdf.toString()}</code>
        </pre>
    );
}
