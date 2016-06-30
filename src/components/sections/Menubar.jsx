import React from "react";
import * as rbs from "react-bootstrap";

import * as actions from "../../actions/actions.js";

import {BlankGlyphicon, ToggleGlyphicon} from "../glyphicons/glyphicons.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSelect(eventKey) {
        switch (eventKey) {
        case "CENTER":
            return actions.center();
        case "CLEAR_NODE_SELECTION":
            return actions.clearNodeSelection();
        case "CLEAR_SELECTION":
            return actions.clearSelection();
        case "CLEAR_TRIPLE_FILTER":
            return actions.clearTripleFilter();
        case "CLEAR_TRIPLE_SELECTION":
            return actions.clearTripleSelection();
        case "GRAPHICAL_VIEW":
            return actions.setViewport("graphical");
        case "SELECT_ALL_MATCHING_TRIPLES":
            return actions.selectAllMatchingTriples();
        case "SHOW_CLOSE_DIALOG":
            return actions.setDialogVisibility("close", true);
        case "SHOW_DRAPH_DIALOG":
            return actions.setDialogVisibility("draph", true);
        case "SHOW_EADES_LAYOUT_DIALOG":
            return actions.setDialogVisibility("eadesLayout", true);
        case "SHOW_EDIT_NAMESPACES_DIALOG":
            return actions.setDialogVisibility("editNamespaces", true);
        case "SHOW_EDIT_TRIPLES_DIALOG":
            return actions.setDialogVisibility("editTriples", true);
        case "SHOW_FILTER_TRIPLES_DIALOG":
            return actions.setDialogVisibility("filterTriples", true);
        case "SHOW_FRUCHTERMAN_LAYOUT_DIALOG":
            return actions.setDialogVisibility("fruchtermanLayout", true);
        case "SHOW_OPEN_CONFIG_DIALOG":
            return actions.setDialogVisibility("openConfig", true);
        case "SHOW_OPEN_LAYOUT_DIALOG":
            return actions.setDialogVisibility("openLayout", true);
        case "SHOW_OPEN_STYLE_DIALOG":
            return actions.setDialogVisibility("openStyle", true);
        case "SHOW_OPEN_TURTLE_DIALOG":
            return actions.setDialogVisibility("openTurtle", true);
        case "SHOW_RANDOM_LAYOUT_DIALOG":
            return actions.setDialogVisibility("randomLayout", true);
        case "SHOW_ROTATE_DIALOG":
            return actions.setDialogVisibility("rotate", true);
        case "SHOW_SAVE_CONFIG_DIALOG":
            return actions.setDialogVisibility("saveConfig", true);
        case "SHOW_SAVE_LAYOUT_DIALOG":
            return actions.setDialogVisibility("saveLayout", true);
        case "SHOW_SAVE_TURTLE_DIALOG":
            return actions.setDialogVisibility("saveTurtle", true);
        case "SHOW_SCALE_DIALOG":
            return actions.setDialogVisibility("scale", true);
        case "SHOW_SIDEBAR_DIALOG":
            return actions.setDialogVisibility("sidebar", true);
        case "SHOW_TABLE_DIALOG":
            return actions.setDialogVisibility("table", true);
        case "SHOW_TRANSLATE_DIALOG":
            return actions.setDialogVisibility("translate", true);
        case "SOURCE_VIEW":
            return actions.setViewport("source");
        case "TABLE_VIEW":
            return actions.setViewport("table");
        case "TOGGLE_LEFT_SIDEBAR_VISIBILITY":
            return actions.setLeftSidebarVisibility(!this.props.showLeftSidebar);
        case "TOGGLE_RIGHT_SIDEBAR_VISIBILITY":
            return actions.setRightSidebarVisibility(!this.props.showRightSidebar);
        case "TOGGLE_SHRINK_NODE_VALUES":
            return actions.setShrinkNodeValues(!this.props.shrinkNodeValues);
        }
    }

    render() {
        return (
            <rbs.Navbar fluid inverse staticTop>
                <rbs.Navbar.Header>
                    <rbs.Navbar.Toggle />
                </rbs.Navbar.Header>
                <rbs.Navbar.Collapse>
                    <rbs.Nav onSelect={(key) => this.handleSelect(key)}>
                        <rbs.NavDropdown title="File" id="menubar-file">
                            <rbs.MenuItem eventKey="SHOW_OPEN_TURTLE_DIALOG">
                                Open Turtle...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_OPEN_STYLE_DIALOG">
                                Open Style...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_OPEN_LAYOUT_DIALOG">
                                Open Layout...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_OPEN_CONFIG_DIALOG">
                                Open Configuration...
                            </rbs.MenuItem>
                            <rbs.MenuItem divider />
                            <rbs.MenuItem eventKey="SHOW_SAVE_TURTLE_DIALOG">
                                Save Turtle...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_SAVE_LAYOUT_DIALOG">
                                Save Layout...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_SAVE_CONFIG_DIALOG">
                                Save Configuration...
                            </rbs.MenuItem>
                            <rbs.MenuItem divider />
                            <rbs.MenuItem eventKey="SHOW_CLOSE_DIALOG">
                                Close...
                            </rbs.MenuItem>
                        </rbs.NavDropdown>
                        <rbs.NavDropdown title="Edit" id="menubar-edit">
                            <rbs.MenuItem eventKey="SHOW_EDIT_NAMESPACES_DIALOG">
                                Edit Namespaces...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_EDIT_TRIPLES_DIALOG">
                                Edit Triples...
                            </rbs.MenuItem>
                            <rbs.MenuItem divider />
                            <rbs.MenuItem eventKey="SHOW_FILTER_TRIPLES_DIALOG">
                                Filter Triples...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="CLEAR_TRIPLE_FILTER">
                                Clear Triple Filter
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SELECT_ALL_MATCHING_TRIPLES">
                                Select All Matching Triples
                            </rbs.MenuItem>
                            <rbs.MenuItem divider />
                            <rbs.MenuItem eventKey="CLEAR_TRIPLE_SELECTION">
                                Clear Triple Selection
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="CLEAR_NODE_SELECTION">
                                Clear Node Selection
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="CLEAR_SELECTION">
                                Clear Selection
                            </rbs.MenuItem>
                        </rbs.NavDropdown>
                        <rbs.NavDropdown title="Layout" id="menubar-layout">
                            <rbs.MenuItem eventKey="SHOW_RANDOM_LAYOUT_DIALOG">
                                Random Layout...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_EADES_LAYOUT_DIALOG">
                                Eades-Layout...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_FRUCHTERMAN_LAYOUT_DIALOG">
                                Fruchterman-Layout...
                            </rbs.MenuItem>
                            <rbs.MenuItem divider />
                            <rbs.MenuItem eventKey="SHOW_TRANSLATE_DIALOG">
                                Translate...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_SCALE_DIALOG">
                                Scale...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_ROTATE_DIALOG">
                                Rotate...
                            </rbs.MenuItem>
                            <rbs.MenuItem divider />
                            <rbs.MenuItem eventKey="CENTER">
                                Center
                            </rbs.MenuItem>
                        </rbs.NavDropdown>
                        <rbs.NavDropdown title="View" id="menubar-view">
                            <rbs.MenuItem eventKey="SOURCE_VIEW">
                                <ToggleGlyphicon enabled={this.props.viewport === "source"} /> Source
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="TABLE_VIEW">
                                <ToggleGlyphicon enabled={this.props.viewport === "table"} /> Table
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="GRAPHICAL_VIEW">
                                <ToggleGlyphicon enabled={this.props.viewport === "graphical"} /> Graphical
                            </rbs.MenuItem>
                            <rbs.MenuItem divider />
                            <rbs.MenuItem eventKey="TOGGLE_LEFT_SIDEBAR_VISIBILITY">
                                <ToggleGlyphicon enabled={this.props.showLeftSidebar} /> Show Left Sidebar
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="TOGGLE_RIGHT_SIDEBAR_VISIBILITY">
                                <ToggleGlyphicon enabled={this.props.showRightSidebar} /> Show Right Sidebar
                            </rbs.MenuItem>
                            <rbs.MenuItem divider />
                            <rbs.MenuItem eventKey="SHOW_DRAPH_DIALOG">
                                <BlankGlyphicon /> Configure Graphical View...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_TABLE_DIALOG">
                                <BlankGlyphicon /> Configure Table View...
                            </rbs.MenuItem>
                            <rbs.MenuItem eventKey="SHOW_SIDEBAR_DIALOG">
                                <BlankGlyphicon /> Configure Sidebars...
                            </rbs.MenuItem>
                            <rbs.MenuItem divider />
                            <rbs.MenuItem eventKey="TOGGLE_SHRINK_NODE_VALUES">
                                <ToggleGlyphicon enabled={this.props.shrinkNodeValues} /> Shrink Node Values
                            </rbs.MenuItem>
                        </rbs.NavDropdown>
                    </rbs.Nav>
                </rbs.Navbar.Collapse>
            </rbs.Navbar>
        );
    }
}
