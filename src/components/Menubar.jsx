import React from "react";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar fluid inverse staticTop>
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={1} title="File">
                            <MenuItem eventKey={1.1}>Open File...</MenuItem>
                            <MenuItem eventKey={1.2}>Save</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={1.3}>Close</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={2} title="View">
                            <MenuItem eventKey={2.1}>Source</MenuItem>
                            <MenuItem eventKey={2.2}>Table</MenuItem>
                            <MenuItem eventKey={2.3}>Graphical</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2.4}><Glyphicon glyph="ok" /> Always show menubar</MenuItem>
                            <MenuItem eventKey={2.5}><Glyphicon glyph="remove" /> Always show left sidebar</MenuItem>
                            <MenuItem eventKey={2.6}><Glyphicon glyph="ok" /> Always show right sidebar</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
