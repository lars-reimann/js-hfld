import React                                                 from "react";
import {Modal, Checkbox, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import * as actions from "../../actions/actions.js";

/**
 * Closes the dialog.
 */
function hide() {
    actions.setDialogVisibility("sidebar", false);
}

function showTabInLeftSidebar(props, tab) {
    return props.config.leftSidebarTabs.has(tab);
}

function showTabInRightSidebar(props, tab) {
    return props.config.rightSidebarTabs.has(tab);
}

function toggleLeftSidebar(props) {
    actions.setLeftSidebarVisibility(!props.config.showLeftSidebar);
}

function toggleRightSidebar(props) {
    actions.setRightSidebarVisibility(!props.config.showRightSidebar);
}

function setLeftSidebarWidth(e) {
    const width = Number(e.target.value);
    actions.setLeftSidebarWidth(width);
}

function setRightSidebarWidth(e) {
    const width = Number(e.target.value);
    actions.setRightSidebarWidth(width);
}

/**
 * Renders this component.
 */
export default function (props) {
    return (
        <Modal show={props.visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Sidebar Dialog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <fieldset>
                        <legend>Left Sidebar</legend>
                        <FormGroup controlId="left-sidebar-visibility">
                            <ControlLabel>Visibility</ControlLabel>
                            <Checkbox
                                checked={props.config.showLeftSidebar}
                                onChange={() => toggleLeftSidebar(props)}>
                                Show Sidebar
                            </Checkbox>
                            <Checkbox
                                checked={showTabInLeftSidebar(props, "literals")}
                                onChange={() => actions.toggleLeftSidebarTab("literals")}>
                                Show Literals Tab
                            </Checkbox>
                            <Checkbox
                                checked={showTabInLeftSidebar(props, "earlData")}
                                onChange={() => actions.toggleLeftSidebarTab("earlData")}>
                                Show Earl Data Tab
                            </Checkbox>
                            <Checkbox
                                checked={showTabInLeftSidebar(props, "rdfData")}
                                onChange={() => actions.toggleLeftSidebarTab("rdfData")}>
                                Show RDF Data Tab
                            </Checkbox>
                        </FormGroup>
                        <FormGroup controlId="left-sidebar-width">
                            <ControlLabel>Width</ControlLabel>
                            <FormControl
                                componentClass="select"
                                value={props.config.leftSidebarWidth}
                                onChange={e => setLeftSidebarWidth(e)}>
                                <option value="1">1 column</option>
                                <option value="2">2 columns</option>
                                <option value="3">3 columns</option>
                                <option value="4">4 columns</option>
                            </FormControl>
                        </FormGroup>
                    </fieldset>
                    <fieldset>
                        <legend>Right Sidebar</legend>
                        <FormGroup controlId="left-sidebar-visibility">
                            <ControlLabel>Visibility</ControlLabel>
                            <Checkbox
                                checked={props.config.showRightSidebar}
                                onChange={() => toggleRightSidebar(props)}>
                                Show Sidebar
                            </Checkbox>
                            <Checkbox
                                checked={showTabInRightSidebar(props, "literals")}
                                onChange={() => actions.toggleRightSidebarTab("literals")}>
                                Show Literals Tab
                            </Checkbox>
                            <Checkbox
                                checked={showTabInRightSidebar(props, "earlData")}
                                onChange={() => actions.toggleRightSidebarTab("earlData")}>
                                Show Earl Data Tab
                            </Checkbox>
                            <Checkbox
                                checked={showTabInRightSidebar(props, "rdfData")}
                                onChange={() => actions.toggleRightSidebarTab("rdfData")}>
                                Show RDF Data Tab
                            </Checkbox>
                        </FormGroup>
                        <FormGroup controlId="left-sidebar-width">
                            <ControlLabel>Width</ControlLabel>
                            <FormControl
                                componentClass="select"
                                value={props.config.rightSidebarWidth}
                                onChange={e => setRightSidebarWidth(e)}>
                                <option value="1">1 column</option>
                                <option value="2">2 columns</option>
                                <option value="3">3 columns</option>
                                <option value="4">4 columns</option>
                            </FormControl>
                        </FormGroup>
                    </fieldset>
                </form>
            </Modal.Body>
        </Modal>
    );
}
