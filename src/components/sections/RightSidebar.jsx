import React from "react";
import {Tabs, Tab} from "react-bootstrap";

import {setInformationPanel}                        from "../../actions/actions.js";
import {EarlDataPanel, LiteralsPanel, RDFDataPanel} from "./panels/panels.js";

export default function (props) {
    return (
        <Tabs defaultActiveKey={props.config.informationPanel} onSelect={setInformationPanel} id="type">
            <Tab eventKey="literals" title="Literals">
                <LiteralsPanel
                    shrinkNodeValues={props.config.shrinkNodeValues}
                    rdf={props.rdf}
                    selection={props.selection}
                />
            </Tab>
            <Tab eventKey="earlData" title="Earl Data">
                <EarlDataPanel
                    shrinkNodeValues={props.config.shrinkNodeValues}
                    rdf={props.rdf}
                    graph={props.graph}
                    selection={props.selection}
                />
            </Tab>
        </Tabs>
    );
}