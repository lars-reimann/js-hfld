import React from "react";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from "react-bootstrap";

import BlankGlyphicon  from "./BlankGlyphicon.jsx";
import ToggleGlyphicon from "./ToggleGlyphicon.jsx";

import actions from "../actions/actions.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSelect(event, eventKey) {
        switch (eventKey) {
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
                            <MenuItem eventKey={"OPEN"}>
                                Open...
                            </MenuItem>
                            <MenuItem eventKey={"SAVE"}>
                                Save
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={"CLOSE"}>
                                Close
                            </MenuItem>
                        </NavDropdown>
                        <NavDropdown title="View" id="menubar-view">
                            <MenuItem eventKey={"SOURCE_VIEW"}>
                                <ToggleGlyphicon active={this.props.app.get("viewport") === "source"} /> Source
                            </MenuItem>
                            <MenuItem eventKey={"TABLE_VIEW"}>
                                <ToggleGlyphicon active={this.props.app.get("viewport") === "table"} /> Table
                            </MenuItem>
                            <MenuItem eventKey={"GRAPHICAL_VIEW"}>
                                <ToggleGlyphicon active={this.props.app.get("viewport") === "graphical"} /> Graphical
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={"TOGGLE_PERMANENT_MENUBAR"}>
                                <ToggleGlyphicon active={this.props.app.get("permanentMenubar")} /> Permanent Menubar
                            </MenuItem>
                            <MenuItem eventKey={"TOGGLE_PERMANENT_LEFT_SIDEBAR"}>
                                <ToggleGlyphicon active={this.props.app.get("permanentLeftSidebar")} /> Permanent Left Sidebar
                            </MenuItem>
                            <MenuItem eventKey={"TOGGLE_PERMANENT_RIGHT_SIDEBAR"}>
                                <ToggleGlyphicon active={this.props.app.get("permanentRightSidebar")} /> Permanent Right Sidebar
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
