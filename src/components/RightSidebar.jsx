import React from "react";
import {Tabs, Tab} from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title="Literals">...</Tab>
                <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
                <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
            </Tabs>
        );
    }
}