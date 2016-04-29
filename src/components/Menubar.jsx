import React from "react";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from "react-bootstrap";

import actions from "../actions/actions.js";

import BlankGlyphicon  from "./BlankGlyphicon.jsx";
import ToggleGlyphicon from "./ToggleGlyphicon.jsx";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSelect(event, eventKey) {
        switch (eventKey) {
        case "SHOW_OPEN_DIALOG":
        case "SHOW_SAVE_DIALOG":
        case "SHOW_CLOSE_DIALOG":
        case "SHOW_TRANSLATE_DIALOG":
        case "SHOW_SCALE_DIALOG":
        case "SHOW_ROTATE_DIALOG":
            return actions[eventKey](true);
        case "SOURCE_VIEW":
            return actions.CHANGE_VIEWPORT("source");
        case "TABLE_VIEW":
            return actions.CHANGE_VIEWPORT("table");
        case "GRAPHICAL_VIEW":
            return actions.CHANGE_VIEWPORT("graphical");
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
                    <Nav onSelect={::this.handleSelect}>
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
                            <MenuItem eventKey="SHOW_RANDOM_LAYOUT">
                                Random Layout...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_EADES_LAYOUT">
                                Eades Layout...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_FRUCHTERMANN_LAYOUT">
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
                                <ToggleGlyphicon active={this.props.app.get("viewport") === "source"} /> Source
                            </MenuItem>
                            <MenuItem eventKey="TABLE_VIEW">
                                <ToggleGlyphicon active={this.props.app.get("viewport") === "table"} /> Table
                            </MenuItem>
                            <MenuItem eventKey="GRAPHICAL_VIEW">
                                <ToggleGlyphicon active={this.props.app.get("viewport") === "graphical"} /> Graphical
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="TOGGLE_PERMANENT_MENUBAR">
                                <ToggleGlyphicon active={this.props.app.get("permanentMenubar")} /> Permanent Menubar
                            </MenuItem>
                            <MenuItem eventKey="TOGGLE_PERMANENT_LEFT_SIDEBAR">
                                <ToggleGlyphicon active={this.props.app.get("permanentLeftSidebar")} /> Permanent Left Sidebar
                            </MenuItem>
                            <MenuItem eventKey="TOGGLE_PERMANENT_RIGHT_SIDEBAR">
                                <ToggleGlyphicon active={this.props.app.get("permanentRightSidebar")} /> Permanent Right Sidebar
                            </MenuItem>
                            { this.props.app.get("viewport") !== "table" ? null :
                                <MenuItem divider />
                            }
                            { this.props.app.get("viewport") !== "table" ? null :
                                <MenuItem eventKey="TOGGLE_SHRINK_NODE_VALUES_IN_TABLE">
                                    <ToggleGlyphicon active={this.props.app.get("shrinkNodeValuesInTable")} /> Shrink Node Values
                                </MenuItem>
                            }

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
