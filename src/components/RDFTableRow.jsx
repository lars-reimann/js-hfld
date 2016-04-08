import React from "react";

export default function ({subject, predicate, object}) {
    return (
        <tr>
            <td>{subject.toString()}</td>
            <td>{predicate.toString()}</td>
            <td>{object.toString()}</td>
        </tr>
    );
}