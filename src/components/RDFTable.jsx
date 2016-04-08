import _       from "lodash/fp";
import React   from "react";
import {Table} from "react-bootstrap";

import RDFTableRow from "./RDFTableRow.jsx";

// TODO sort order can be changed (subject, predicate, object, asc, desc)

export default function ({rdf: {graph, profile}}) {
    const rows = [...graph].map(({id, ...rest}) => <RDFTableRow key={id} {...rest} />);

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