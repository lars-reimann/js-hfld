import React from "react";
import {Tabs, Tab} from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title="Literals">
                    Literals...
                </Tab>
                <Tab eventKey={2} title="Graph Data">
                    Graph Data...
                </Tab>
            </Tabs>
        );
    }
}