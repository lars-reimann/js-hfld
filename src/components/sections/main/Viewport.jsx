import React from "react";

import GraphicalView from "./GraphicalView.jsx";
import SourceView    from "./SourceView.jsx";
import TableView     from "./TableView.jsx";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch(this.props.config.viewport) {
        case "source":
            return <SourceView rdf={this.props.rdf} />;
        case "table":
            return <TableView app={this.props.config} rdf={this.props.rdf} />;
        case "graphical":
            return <GraphicalView />;
        default:
            return <p>No type selected.</p>;
        }
    }
}