import React    from "react";
import * as rbs from "react-bootstrap";

import * as actions from "../../actions/actions.js";

/**
 * Toggles the visibility of the left sidebar.
 *
 * @param {Object} props
 * The current props of this element.
 *
 * @ignore
 */
function toggleLeftSidebar(props) {
    actions.setLeftSidebarVisibility(!props.config.showLeftSidebar);
}

/**
 * Toggles the visibility of the right sidebar.
 *
 * @param {Object} props
 * The current props of this element.
 *
 * @ignore
 */
function toggleRightSidebar(props) {
    actions.setRightSidebarVisibility(!props.config.showRightSidebar);
}

/**
 * Sets the width of the left sidebar.
 *
 * @param {Event} e
 * The change event.
 *
 * @ignore
 */
function setLeftSidebarWidth(e) {
    const width = Number(e.target.value);
    actions.setLeftSidebarWidth(width);
}

/**
 * Sets the width of the right sidebar.
 *
 * @param {Event} e
 * The change event.
 *
 * @ignore
 */
function setRightSidebarWidth(e) {
    const width = Number(e.target.value);
    actions.setRightSidebarWidth(width);
}

/**
 * Tests whether the given tab is currently displayed in the left sidebar.
 *
 * @param {Object} props
 * The received props.
 *
 * @param {string} tab
 * The tab to test.
 *
 * @return {boolean}
 * Whether the tab is visible.
 */
function showTabInLeftSidebar(props, tab) {
    return props.config.leftSidebarTabs.has(tab);
}

/**
 * Tests whether the given tab is currently displayed in the right sidebar.
 *
 * @param {Object} props
 * The received props.
 *
 * @param {string} tab
 * The tab to test.
 *
 * @return {boolean}
 * Whether the tab is visible.
 */
function showTabInRightSidebar(props, tab) {
    return props.config.rightSidebarTabs.has(tab);
}

/**
 * Closes the dialog.
 *
 * @ignore
 */
function close() {
    actions.setDialogVisibility("sidebar", false);
}

/**
 * Renders this component.
 */
export default function (props) {
    return (
        <rbs.Modal show={props.visible} onHide={close}>
            <rbs.Modal.Header closeButton>
                <rbs.Modal.Title>Configure Sidebars</rbs.Modal.Title>
            </rbs.Modal.Header>
            <rbs.Modal.Body>
                <form>
                    <fieldset>
                        <legend>Left Sidebar</legend>
                        <rbs.FormGroup controlId="left-sidebar-visibility">
                            <rbs.ControlLabel>Visibility:</rbs.ControlLabel>
                            <rbs.Checkbox
                                checked={props.config.showLeftSidebar}
                                onChange={() => toggleLeftSidebar(props)}>
                                Show Sidebar
                            </rbs.Checkbox>
                            <rbs.Checkbox
                                checked={showTabInLeftSidebar(props, "literals")}
                                onChange={() => actions.toggleLeftSidebarTab("literals")}>
                                Show Literals Tab
                            </rbs.Checkbox>
                            <rbs.Checkbox
                                checked={showTabInLeftSidebar(props, "earlData")}
                                onChange={() => actions.toggleLeftSidebarTab("earlData")}>
                                Show Earl Data Tab
                            </rbs.Checkbox>
                            <rbs.Checkbox
                                checked={showTabInLeftSidebar(props, "rdfData")}
                                onChange={() => actions.toggleLeftSidebarTab("rdfData")}>
                                Show RDF Data Tab
                            </rbs.Checkbox>
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="left-sidebar-width">
                            <rbs.ControlLabel>Width:</rbs.ControlLabel>
                            <rbs.FormControl
                                componentClass="select"
                                value={props.config.leftSidebarWidth}
                                onChange={setLeftSidebarWidth}>
                                <option value="1">1 column</option>
                                <option value="2">2 columns</option>
                                <option value="3">3 columns</option>
                                <option value="4">4 columns</option>
                            </rbs.FormControl>
                        </rbs.FormGroup>
                    </fieldset>
                    <fieldset>
                        <legend>Right Sidebar</legend>
                        <rbs.FormGroup controlId="left-sidebar-visibility">
                            <rbs.ControlLabel>Visibility:</rbs.ControlLabel>
                            <rbs.Checkbox
                                checked={props.config.showRightSidebar}
                                onChange={() => toggleRightSidebar(props)}>
                                Show Sidebar
                            </rbs.Checkbox>
                            <rbs.Checkbox
                                checked={showTabInRightSidebar(props, "literals")}
                                onChange={() => actions.toggleRightSidebarTab("literals")}>
                                Show Literals Tab
                            </rbs.Checkbox>
                            <rbs.Checkbox
                                checked={showTabInRightSidebar(props, "earlData")}
                                onChange={() => actions.toggleRightSidebarTab("earlData")}>
                                Show Earl Data Tab
                            </rbs.Checkbox>
                            <rbs.Checkbox
                                checked={showTabInRightSidebar(props, "rdfData")}
                                onChange={() => actions.toggleRightSidebarTab("rdfData")}>
                                Show RDF Data Tab
                            </rbs.Checkbox>
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="left-sidebar-width">
                            <rbs.ControlLabel>Width:</rbs.ControlLabel>
                            <rbs.FormControl
                                componentClass="select"
                                value={props.config.rightSidebarWidth}
                                onChange={setRightSidebarWidth}>
                                <option value="1">1 column</option>
                                <option value="2">2 columns</option>
                                <option value="3">3 columns</option>
                                <option value="4">4 columns</option>
                            </rbs.FormControl>
                        </rbs.FormGroup>
                    </fieldset>
                </form>
            </rbs.Modal.Body>
        </rbs.Modal>
    );
}
