import React from "react";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from "react-bootstrap";

import BlankGlyphicon from "./BlankGlyphicon.jsx";

import actionTypes   from "../actions/types.js";
import actionCreator from "../actions/creator.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSelect(event, eventKey) {
        console.log(actionCreator[eventKey]());
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
                            <MenuItem eventKey={actionTypes.OPEN_FILE}>
                                Open File...
                            </MenuItem>
                            <MenuItem eventKey={actionTypes.SAVE}>
                                Save
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={actionTypes.CLOSE}>
                                Close
                            </MenuItem>
                        </NavDropdown>
                        <NavDropdown title="View" id="menubar-view">
                            <MenuItem eventKey={actionTypes.SOURCE_VIEW}>
                                <Glyphicon glyph="ok" /> Source
                            </MenuItem>
                            <MenuItem eventKey={actionTypes.TABLE_VIEW}>
                                <BlankGlyphicon /> Table
                            </MenuItem>
                            <MenuItem eventKey={actionTypes.GRAPHICAL_VIEW}>
                                <BlankGlyphicon /> Graphical
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={actionTypes.TOGGLE_PERMANENT_MENUBAR}>
                                <Glyphicon glyph="ok" /> Permanent menubar
                            </MenuItem>
                            <MenuItem eventKey={actionTypes.TOGGLE_PERMANENT_LEFT_SIDEBAR}>
                                <BlankGlyphicon /> Permanent left sidebar
                            </MenuItem>
                            <MenuItem eventKey={actionTypes.TOGGLE_PERMANENT_RIGHT_SIDEBAR}>
                                <Glyphicon glyph="ok" /> Permanent right sidebar
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
