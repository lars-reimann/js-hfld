import _                   from "lodash/fp";
import React               from "react";
import {Table, Pagination} from "react-bootstrap";

import * as actions from "../../../actions/actions.js";

import ToggleGlyphicon  from "../../glyphicons/ToggleGlyphicon.jsx";
import SortingGlyphicon from "../../glyphicons/SortingGlyphicon.jsx";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    shrink(node) {
        return this.props.rdf.nodeToString(
            node,
            this.props.config.shrinkNodeValues
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

    handleNodeClick(e) {
        actions.toggleNodeSelection([e.target.getAttribute("data-hash")]);
    }

    handleTripleClick(id) {
        actions.toggleTripleSelection([id]);
    }

    tripleSelectionStyle(tripleId) {
        if (this.props.selection.isSelectedTriple(tripleId)) {
            return {
                backgroundColor: "lightYellow",
            };
        } else {
            return {};
        }
    }

    nodeSelectionStyle(nodeId) {
        if (this.props.selection.isSelectedNode(nodeId)) {
            return {
                color: "maroon",
                fontWeight: "bold",
            };
        } else {
            return {};
        }
    }

    handleTablePageSelection(tablePageString) {
        const tablePage = Number(tablePageString);
        actions.selectTablePage(tablePage);
    }

    numberOfPages() {
        return Math.ceil(
            this.props.selection.getFilteredGraph().length /
            this.props.config.tableRowsPerPage
        );
    }

    render() {
        const {column, order}  = this.props.config.tableSorting;
        const tablePage        = this.props.selection.getTablePage();
        const tableRowsPerPage = this.props.config.tableRowsPerPage;

        const rows = _([...this.props.selection.getFilteredGraph()])
            .orderBy([triple => this.shrink(triple[column]).toLowerCase()], [order])
            .slice((tablePage - 1) * tableRowsPerPage, tablePage * tableRowsPerPage)
            .map(triple => (
                <tr key={triple.id} style={this.tripleSelectionStyle(triple.id)}>
                    <td onClick={e => this.handleNodeClick(e)} data-hash={triple.subject.toNT()} id={triple.subject.id} style={this.nodeSelectionStyle(triple.subject.toNT())}>{this.shrink(triple.subject)}</td>
                    <td onClick={e => this.handleNodeClick(e)} data-hash={triple.predicate.toNT()} id={triple.predicate.id} style={this.nodeSelectionStyle(triple.predicate.toNT())}>{this.shrink(triple.predicate)}</td>
                    <td onClick={e => this.handleNodeClick(e)} data-hash={triple.object.toNT()} id={triple.object.id} style={this.nodeSelectionStyle(triple.object.toNT())}>{this.shrink(triple.object)}</td>
                    <td onClick={() => this.handleTripleClick(triple.id)} style={{width: "10px"}}>
                        <ToggleGlyphicon enabled={this.props.selection.isSelectedTriple(triple.id)} />
                    </td>
                </tr>))
            .value();

        return (
            <div>
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
                <Pagination
                    first prev next last
                    activePage={this.props.selection.getTablePage()}
                    items={this.numberOfPages()}
                    maxButtons={10}
                    onSelect={this.handleTablePageSelection}
                />
            </div>
        );
    }
}