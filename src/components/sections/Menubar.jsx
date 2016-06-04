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
        case "SHOW_OPEN_DIALOG":
            return actions.setDialogVisibility("open", true);
        case "SHOW_SAVE_DIALOG":
            return actions.setDialogVisibility("save", true);
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
        default:
            return actions[eventKey]();
        }
    }

    render() {
        const style = {
            visibility: "hidden"
        };

        return (
            <Navbar fluid inverse staticTop>
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav onSelect={(key) => this.handleSelect(key)}>
                        <NavDropdown title="File" id="menubar-file">
                            <MenuItem eventKey="SHOW_OPEN_DIALOG">
                                Open...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_SAVE_DIALOG">
                                Save...
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
                                <ToggleGlyphicon active={this.props.app.viewport === "source"} /> Source
                            </MenuItem>
                            <MenuItem eventKey="TABLE_VIEW">
                                <ToggleGlyphicon active={this.props.app.viewport === "table"} /> Table
                            </MenuItem>
                            <MenuItem eventKey="GRAPHICAL_VIEW">
                                <ToggleGlyphicon active={this.props.app.viewport === "graphical"} /> Graphical
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="TOGGLE_PERMANENT_MENUBAR">
                                <ToggleGlyphicon active={this.props.app.permanentMenubar} /> Permanent Menubar
                            </MenuItem>
                            <MenuItem eventKey="TOGGLE_PERMANENT_LEFT_SIDEBAR">
                                <ToggleGlyphicon active={this.props.app.permanentLeftSidebar} /> Permanent Left Sidebar
                            </MenuItem>
                            <MenuItem eventKey="TOGGLE_PERMANENT_RIGHT_SIDEBAR">
                                <ToggleGlyphicon active={this.props.app.permanentRightSidebar} /> Permanent Right Sidebar
                            </MenuItem>
                            { this.props.app.viewport !== "table" ? null :
                                <MenuItem divider />
                            }
                            { this.props.app.viewport !== "table" ? null :
                                <MenuItem eventKey="TOGGLE_SHRINK_NODE_VALUES_IN_TABLE">
                                    <ToggleGlyphicon active={this.props.app.shrinkNodeValuesInTable} /> Shrink Node Values
                                </MenuItem>
                            }

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
