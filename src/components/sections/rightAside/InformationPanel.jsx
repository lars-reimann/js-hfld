import React from "react";
import {Tabs, Tab} from "react-bootstrap";

import GraphDataPanel from "./GraphDataPanel.jsx";
import LiteralsPanel  from "./LiteralsPanel.jsx";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs defaultActiveKey={1} id="right-sidebar-info">
                <Tab eventKey={1} title="Literals">
                    <LiteralsPanel rdf={this.props.rdf} selection={this.props.selection} />
                </Tab>
                <Tab eventKey={2} title="Graph Data">
                    <GraphDataPanel />
                </Tab>
            </Tabs>
        );
    }
}

// TODO: store active tab in config store