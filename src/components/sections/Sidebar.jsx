import React from "react";
import {Tabs, Tab} from "react-bootstrap";

import * as actions                                 from "../../actions/actions.js";
import {EarlDataPanel, LiteralsPanel, RDFDataPanel} from "./panels/panels.js";

function getActiveKey(props) {
    if (props.side === "left") {
        return props.config.leftSidebarActiveTab;
    } else {
        return props.config.rightSidebarActiveTab;
    }
}

function handleTabChange(props, tab) {
    if (props.side === "left") {
        actions.setLeftSidebarActiveTab(tab);
    } else {
        actions.setRightSidebarActiveTab(tab);
    }
}

function isHiddenTab(props, tab) {
    if (props.side === "left") {
        return !props.config.leftSidebarTabs.has(tab);
    } else {
        return !props.config.rightSidebarTabs.has(tab);
    }
}

export default function render(props) {
    return (
        <Tabs activeKey={getActiveKey(props)} onSelect={tab => handleTabChange(props, tab)} id="type">
            { isHiddenTab(props, "literals") ? null :
                <Tab eventKey="literals" title="Literals">
                    <LiteralsPanel
                        shrinkNodeValues={props.config.shrinkNodeValues}
                        rdf={props.rdf}
                        selection={props.selection}
                    />
                </Tab>
            }
            { isHiddenTab(props, "earlData") ? null :
                <Tab eventKey="earlData" title="Earl Data">
                    <EarlDataPanel
                        shrinkNodeValues={props.config.shrinkNodeValues}
                        rdf={props.rdf}
                        graph={props.graph}
                        selection={props.selection}
                    />
                </Tab>
            }
            { isHiddenTab(props, "rdfData") ? null :
                <Tab eventKey="rdfData" title="RDF Data">
                    <RDFDataPanel
                        shrinkNodeValues={props.config.shrinkNodeValues}
                        rdf={props.rdf}
                        selection={props.selection}
                    />
                </Tab>
            }
        </Tabs>
    );
}