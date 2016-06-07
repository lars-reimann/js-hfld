import _       from "lodash/fp";
import React   from "react";
import {Table} from "react-bootstrap";

import * as actions from "../../../actions/actions.js";
import {shrinkNodeValue} from "../../../utils/utils.js";

import SortingGlyphicon from "../../glyphicons/SortingGlyphicon.jsx";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    shrink(node) {
        return shrinkNodeValue(
            this.props.rdf.profile,
            this.props.config.shrinkNodeValues,
            node
        );
    }

    swapOrder(order) {
        return order === "asc" ? "desc" : "asc";
    }

    handleHeaderClick(column) {
        const {column: curCol, order: curOrd} = this.props.config.tableSorting;
        if (curCol === column) {
            actions.setTableSorting({column, order: this.swapOrder(curOrd)});
        } else {
            actions.setTableSorting({column, order: "asc"});
        }
    }

    handleDataClick(e) {
        actions.toggleNodeSelection([e.target.id]);
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

    nodeSelectionStyle(nodeId) {
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

        // TODO: pagination
        const rows = _([...this.props.rdf.graph])
            .orderBy([triple => this.shrink(triple[column]).toLowerCase()], [order])
            .map(triple => (
                <tr key={triple.id} style={this.tripleSelectionStyle(triple.id)}>
                    <td onClick={e => this.handleDataClick(e)} id={triple.subject.id} style={this.nodeSelectionStyle(triple.subject.id)}>{this.shrink(triple.subject)}</td>
                    <td onClick={e => this.handleDataClick(e)} id={triple.predicate.id} style={this.nodeSelectionStyle(triple.predicate.id)}>{this.shrink(triple.predicate)}</td>
                    <td onClick={e => this.handleDataClick(e)} id={triple.object.id} style={this.nodeSelectionStyle(triple.object.id)}>{this.shrink(triple.object)}</td>
                </tr>))
            .value();

        return (
            <Table striped bordered responsive hover condensed style={{cursor: "pointer"}}>
                <thead>
                    <tr>
                        <th onClick={() => this.handleHeaderClick("subject")}>
                            Subject {column === "subject" ? <SortingGlyphicon order={order} /> : null}
                        </th>
                        <th onClick={() => this.handleHeaderClick("predicate")}>
                            Predicate {column === "predicate" ? <SortingGlyphicon order={order} /> : null}
                        </th>
                        <th onClick={() => this.handleHeaderClick("object")}>
                            Object {column === "object" ? <SortingGlyphicon order={order} /> : null}
                        </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }
}