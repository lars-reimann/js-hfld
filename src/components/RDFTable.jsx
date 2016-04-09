import _       from "lodash/fp";
import React   from "react";
import {Table} from "react-bootstrap";

import actions from "../actions/actions.js";

import RDFTableRow from "./RDFTableRow.jsx";
import SortingGlyphicon from "./SortingGlyphicon.jsx";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    shrink(node) {
        if (this.props.app.get("shrinkNodeValuesInTable")) {
            return this.props.rdf.profile.nodeToString(node);
        }
        return node.toString();
    }

    swapOrder(order) {
        return order === "asc" ? "desc" : "asc";
    }

    handleClick(column) {
        return () => {
            const {column: curCol, order: curOrd} = this.props.app.get("tableSorting");
            if (curCol === column) {
                actions.SET_TABLE_SORTING({column, order: this.swapOrder(curOrd)});
            } else {
                actions.SET_TABLE_SORTING({column, order: "asc"});
            }
        };
    }

    render() {
        const {column, order} = this.props.app.get("tableSorting");

        const rows = _([...this.props.rdf.graph])
            .orderBy([triple => this.shrink(triple[column]).toLowerCase()], [order])
            .map(triple => <RDFTableRow key={triple.id} triple={triple} profile={this.props.rdf.profile} app={this.props.app} />)
            .value();

        const style = {
            cursor: "pointer"
        };

        return (
            <Table striped bordered responsive hover condensed>
                <thead style={style}>
                    <tr>
                        <th onClick={::this.handleClick("subject")}>
                            Subject {column === "subject" ? <SortingGlyphicon order={order} /> : null}
                        </th>
                        <th onClick={::this.handleClick("predicate")}>
                            Predicate {column === "predicate" ? <SortingGlyphicon order={order} /> : null}
                        </th>
                        <th onClick={::this.handleClick("object")}>
                            Object {column === "object" ? <SortingGlyphicon order={order} /> : null}
                        </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }
}