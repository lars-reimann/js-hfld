import _       from "lodash/fp";
import React   from "react";
import {Table} from "react-bootstrap";

import RDFTableRow from "./RDFTableRow.jsx";

// TODO sort order can be changed (subject, predicate, object, asc, desc)
let id = 0;
export default function ({rdf: {graph, profile}, app}) {
    const rows = [...graph].map(triple => <RDFTableRow key={id++} triple={triple} profile={profile} app={app} />);

    return (
        <Table striped bordered responsive hover condensed>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Predicate</th>
                    <th>Object</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}