import React from "react";

function shrink(app, profile, node) {
    if (app.get("shrinkNodeValuesInTable")) {
        return profile.nodeToString(node);
    }
    return node.toString();
}

export default function ({triple: {subject, predicate, object}, profile, app}) {
    return (
        <tr>
            <td>{shrink(app, profile, subject)}</td>
            <td>{shrink(app, profile, predicate)}</td>
            <td>{shrink(app, profile, object)}</td>
        </tr>
    );
}