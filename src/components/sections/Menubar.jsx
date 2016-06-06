import React from "react";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from "react-bootstrap";

import * as actions from "../../actions/actions.js";

import {BlankGlyphicon, ToggleGlyphicon} from "../glyphicons/glyphicons.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSelect(eventKey) {
        switch (eventKey) {
        case "SHOW_OPEN_CONFIG_DIALOG":
            return actions.setDialogVisibility("openConfig", true);
        case "SHOW_OPEN_LAYOUT_DIALOG":
            return actions.setDialogVisibility("openLayout", true);
        case "SHOW_OPEN_STYLE_DIALOG":
            return actions.setDialogVisibility("openStyle", true);
        case "SHOW_OPEN_TURTLE_DIALOG":
            return actions.setDialogVisibility("openTurtle", true);
        case "SHOW_SAVE_CONFIG_DIALOG":
            return actions.setDialogVisibility("saveConfig", true);
        case "SHOW_SAVE_LAYOUT_DIALOG":
            return actions.setDialogVisibility("saveLayout", true);
        case "SHOW_SAVE_TURTLE_DIALOG":
            return actions.setDialogVisibility("saveTurtle", true);
        case "SHOW_CLOSE_DIALOG":
            return actions.setDialogVisibility("close", true);
        case "SHOW_RANDOM_LAYOUT_DIALOG":
            return actions.setDialogVisibility("randomLayout", true);
        case "SHOW_EADES_LAYOUT_DIALOG":
            return actions.setDialogVisibility("eadesLayout", true);
        case "SHOW_FRUCHTERMANN_LAYOUT_DIALOG":
            return actions.setDialogVisibility("fruchtermannLayout", true);
        case "SHOW_TRANSLATE_DIALOG":
            return actions.setDialogVisibility("translate", true);
        case "SHOW_SCALE_DIALOG":
            return actions.setDialogVisibility("scale", true);
        case "SHOW_ROTATE_DIALOG":
            return actions.setDialogVisibility("rotate", true);
        case "SOURCE_VIEW":
            return actions.setViewport("source");
        case "TABLE_VIEW":
            return actions.setViewport("table");
        case "GRAPHICAL_VIEW":
            return actions.setViewport("graphical");
        case "TOGGLE_PERMANENT_LEFT_SIDEBAR":
            return actions.setPermanentLeftSidebar(!this.props.permanentLeftSidebar);
        case "TOGGLE_PERMANENT_MENUBAR":
            return actions.setPermanentMenubar(!this.props.permanentMenubar);
        case "TOGGLE_PERMANENT_RIGHT_SIDEBAR":
            return actions.setPermanentRightSidebar(!this.props.permanentRightSidebar);
        case "TOGGLE_SHRINK_NODE_VALUES":
            return actions.setShrinkNodeValues(!this.props.shrinkNodeValues);
        }
    }

    render() {
        return (
            <Navbar fluid inverse staticTop>
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav onSelect={(key) => this.handleSelect(key)}>
                        <NavDropdown title="File" id="menubar-file">
                            <MenuItem eventKey="SHOW_OPEN_TURTLE_DIALOG">
                                Open Turtle...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_OPEN_STYLE_DIALOG">
                                Open Style...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_OPEN_LAYOUT_DIALOG">
                                Open Layout...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_OPEN_CONFIG_DIALOG">
                                Open Configuration...
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="SHOW_SAVE_TURTLE_DIALOG">
                                Save Turtle...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_SAVE_LAYOUT_DIALOG">
                                Save Layout...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_SAVE_CONFIG_DIALOG">
                                Save Configuration...
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="SHOW_CLOSE_DIALOG">
                                Close...
                            </MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Layout" id="menubar-layout">
                            <MenuItem eventKey="SHOW_RANDOM_LAYOUT_DIALOG">
                                Random Layout...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_EADES_LAYOUT_DIALOG">
                                Eades Layout...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_FRUCHTERMANN_LAYOUT_DIALOG">
                                Fruchtermann Layout...
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="SHOW_TRANSLATE_DIALOG">
                                Translate...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_SCALE_DIALOG">
                                Scale...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_ROTATE_DIALOG">
                                Rotate...
                            </MenuItem>
                        </NavDropdown>
                        <NavDropdown title="View" id="menubar-view">
                            <MenuItem eventKey="SOURCE_VIEW">
                                <ToggleGlyphicon active={this.props.viewport === "source"} /> Source
                            </MenuItem>
                            <MenuItem eventKey="TABLE_VIEW">
                                <ToggleGlyphicon active={this.props.viewport === "table"} /> Table
                            </MenuItem>
                            <MenuItem eventKey="GRAPHICAL_VIEW">
                                <ToggleGlyphicon active={this.props.viewport === "graphical"} /> Graphical
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="TOGGLE_PERMANENT_MENUBAR">
                                <ToggleGlyphicon active={this.props.permanentMenubar} /> Permanent Menubar
                            </MenuItem>
                            <MenuItem eventKey="TOGGLE_PERMANENT_LEFT_SIDEBAR">
                                <ToggleGlyphicon active={this.props.permanentLeftSidebar} /> Permanent Left Sidebar
                            </MenuItem>
                            <MenuItem eventKey="TOGGLE_PERMANENT_RIGHT_SIDEBAR">
                                <ToggleGlyphicon active={this.props.permanentRightSidebar} /> Permanent Right Sidebar
                            </MenuItem>
                            <MenuItem eventKey="TOGGLE_SHRINK_NODE_VALUES">
                                <ToggleGlyphicon active={this.props.shrinkNodeValues} /> Shrink Node Values
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
