import React from "react";
import {Tabs, Tab} from "react-bootstrap";

import {setInformationPanel} from "../../../actions/actions.js";
import GraphDataPanel        from "./GraphDataPanel.jsx";
import LiteralsPanel         from "./LiteralsPanel.jsx";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTabChange(selectedTab) {
        setInformationPanel(selectedTab);
    }

    render() {
        return (
            <Tabs defaultActiveKey={this.props.config.informationPanel} onSelect={key => this.handleTabChange(key)} id="type">
                <Tab eventKey="literals" title="Literals">
                    <LiteralsPanel shrinkNodeValues={this.props.config.shrinkNodeValues} rdf={this.props.rdf} selection={this.props.selection} />
                </Tab>
                <Tab eventKey="graphData" title="Graph Data">
                    <GraphDataPanel />
                </Tab>
            </Tabs>
        );
    }
}

// TODO: store active tab in config store