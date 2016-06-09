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
        case "SHOW_ADD_TRIPLES_DIALOG":
            return actions.setDialogVisibility("addTriples", true);
        case "SHOW_EDIT_TRIPLES_DIALOG":
            return actions.setDialogVisibility("editTriples", true);
        case "SHOW_FILTER_TRIPLES_DIALOG":
            return actions.setDialogVisibility("filterTriples", true);
        case "SHOW_REMOVE_TRIPLES_DIALOG":
            return actions.setDialogVisibility("removeTriples", true);
        case "CLEAR_NODE_SELECTION":
            return actions.clearNodeSelection();
        case "CLEAR_SELECTION":
            return actions.clearSelection();
        case "CLEAR_TRIPLE_SELECTION":
            return actions.clearTripleSelection();
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
        case "TOGGLE_PERMANENT_MENUBAR":
            return actions.setPermanentMenubar(!this.props.permanentMenubar);
        case "TOGGLE_LEFT_SIDEBAR_VISIBILITY":
            return actions.setLeftSidebarVisibility(!this.props.showLeftSidebar);
        case "TOGGLE_RIGHT_SIDEBAR_VISIBILITY":
            return actions.setRightSidebarVisibility(!this.props.showRightSidebar);
        case "SHOW_TABLE_DIALOG":
            return actions.setDialogVisibility("table", true);
        case "SHOW_SIDEBAR_DIALOG":
            return actions.setDialogVisibility("sidebar", true);
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
                        <NavDropdown title="Edit" id="menubar-edit">
                            <MenuItem eventKey="SHOW_ADD_TRIPLES_DIALOG">
                                Add Triples...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_EDIT_TRIPLES_DIALOG">
                                Edit Triples...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_REMOVE_TRIPLES_DIALOG">
                                Remove Triples...
                            </MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="SHOW_FILTER_TRIPLES_DIALOG">
                                Filter Triples...
                            </MenuItem>
                            <MenuItem eventKey="CLEAR_TRIPLE_FILTER" disabled>
                                Clear Triple Filter
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="SELECT_ALL_MATCHING_NODES" disabled>
                                Select All Matching Nodes
                            </MenuItem>
                            <MenuItem eventKey="CLEAR_NODE_SELECTION">
                                Clear Node Selection
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="SELECT_ALL_MATCHING_TRIPLES" disabled>
                                Select All Matching Triples
                            </MenuItem>
                            <MenuItem eventKey="CLEAR_TRIPLE_SELECTION">
                                Clear Triple Selection
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="CLEAR_SELECTION">
                                Clear Selection
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
                                <ToggleGlyphicon enabled={this.props.viewport === "source"} /> Source
                            </MenuItem>
                            <MenuItem eventKey="TABLE_VIEW">
                                <ToggleGlyphicon enabled={this.props.viewport === "table"} /> Table
                            </MenuItem>
                            <MenuItem eventKey="GRAPHICAL_VIEW">
                                <ToggleGlyphicon enabled={this.props.viewport === "graphical"} /> Graphical
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="TOGGLE_PERMANENT_MENUBAR" disabled>
                                <ToggleGlyphicon enabled={this.props.permanentMenubar} /> Permanent Menubar
                            </MenuItem>
                            <MenuItem eventKey="TOGGLE_LEFT_SIDEBAR_VISIBILITY">
                                <ToggleGlyphicon enabled={this.props.showLeftSidebar} /> Show Left Sidebar
                            </MenuItem>
                            <MenuItem eventKey="TOGGLE_RIGHT_SIDEBAR_VISIBILITY">
                                <ToggleGlyphicon enabled={this.props.showRightSidebar} /> Show Right Sidebar
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="SHOW_TABLE_DIALOG">
                                <BlankGlyphicon /> Configure Table...
                            </MenuItem>
                            <MenuItem eventKey="SHOW_SIDEBAR_DIALOG">
                                <BlankGlyphicon /> Configure Sidebars...
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="TOGGLE_SHRINK_NODE_VALUES">
                                <ToggleGlyphicon enabled={this.props.shrinkNodeValues} /> Shrink Node Values
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
