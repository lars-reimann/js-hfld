import _       from "lodash/fp";
import React   from "react";
import {Table} from "react-bootstrap";

import * as actions from "../../../actions/actions.js";

import SortingGlyphicon from "../../glyphicons/SortingGlyphicon.jsx";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    shrink(node) {
        if (this.props.config.shrinkNodeValuesInTable) {
            return this.props.rdf.profile.nodeToString(node);
        }
        return node.toString();
    }

    swapOrder(order) {
        return order === "asc" ? "desc" : "asc";
    }

    handleClick(column) {
        const {column: curCol, order: curOrd} = this.props.config.tableSorting;
        if (curCol === column) {
            actions.setTableSorting({column, order: this.swapOrder(curOrd)});
        } else {
            actions.setTableSorting({column, order: "asc"});
        }
    }

    tripleSelectionStyle(tripleId) {
        if (this.props.selection.triples.includes(tripleId)) {
            return {
                backgroundColor: "lightYellow",
            };
        } else {
            return {};
        }
    }

    nodeSelectionStyle(nodeId) {console.log(this.props.selection.nodes, nodeId)
        if (this.props.selection.nodes.includes(nodeId)) {
            return {
                color: "maroon",
                fontWeight: "bold",
            };
        } else {
            return {};
        }
    }

    render() {
        const {column, order} = this.props.config.tableSorting;

        const rows = _([...this.props.rdf.graph])
            .orderBy([triple => this.shrink(triple[column]).toLowerCase()], [order])
            .map(triple => (
                <tr key={triple.id} style={this.tripleSelectionStyle(triple.id)}>
                    <td style={this.nodeSelectionStyle(triple.subject.id)}>{this.shrink(triple.subject)}</td>
                    <td style={this.nodeSelectionStyle(triple.predicate.id)}>{this.shrink(triple.predicate)}</td>
                    <td style={this.nodeSelectionStyle(triple.object.id)}>{this.shrink(triple.object)}</td>
                </tr>))
            .value();

        return (
            <Table striped bordered responsive hover condensed>
                <thead style={{cursor: "pointer"}}>
                    <tr>
                        <th onClick={() => this.handleClick("subject")}>
                            Subject {column === "subject" ? <SortingGlyphicon order={order} /> : null}
                        </th>
                        <th onClick={() => this.handleClick("predicate")}>
                            Predicate {column === "predicate" ? <SortingGlyphicon order={order} /> : null}
                        </th>
                        <th onClick={() => this.handleClick("object")}>
                            Object {column === "object" ? <SortingGlyphicon order={order} /> : null}
                        </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }
}