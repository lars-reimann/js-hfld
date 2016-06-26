import React from "react";

import GraphicalView from "./GraphicalView.jsx";
import SourceView    from "./SourceView.jsx";
import TableView     from "./TableView.jsx";

/**
 * The main content of the page.
 */
export default class extends React.Component {

    /**
     * @param {Object} props
     * The props to use.
     *
     * @param {Store} props.rdf
     * The RDF store.
     *
     * @param {Object} props.config
     * The current configuration of the app.
     *
     * @param {Store} props.selection
     * The selection store.
     *
     * @param {Store} props.graph
     * The graph store.
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders the component.
     */
    render() {
        switch(this.props.config.viewport) {
        case "source":
            return <SourceView rdf={this.props.rdf} />;
        case "table":
            return <TableView config={this.props.config} rdf={this.props.rdf} selection={this.props.selection} />;
        case "graphical":
            return <GraphicalView graphView={this.props.graph.getDraph()} />;
        default:
            return <p>No type selected.</p>;
        }
    }
}