import React            from "react";
import {Grid, Row, Col} from "react-bootstrap";

import * as dialogs from "./dialogs/dialogs.js";

import AlertQueue from "./alerts/AlertQueue.jsx";

import {Menubar, LeftSidebar, Viewport, RightSidebar} from "./sections/sections.js";

import * as actions from "../actions/actions.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    leftSidebarIsHidden() {
        return !this.props.config.showLeftSidebar;
    }

    rightSidebarIsHidden() {
        return !this.props.config.showRightSidebar;
    }

    render() {
        return (
            <div>
                <Menubar {...this.props.config} />
                <Grid fluid>
                    <Row>
                        { this.leftSidebarIsHidden() ? null :
                            <Col xs={1}>
                                <LeftSidebar />
                            </Col>
                        }
                        <Col xs={9 + (this.leftSidebarIsHidden() ? 1 : 0) + (this.rightSidebarIsHidden() ? 2 : 0)}>
                            <Viewport
                                config={this.props.config}
                                graph={this.props.graph}
                                rdf={this.props.rdf}
                                selection={this.props.selection}
                            />
                        </Col>
                        { this.rightSidebarIsHidden() ? null :
                            <Col xs={2}>
                                <RightSidebar
                                    config={this.props.config}
                                    graph={this.props.graph}
                                    rdf={this.props.rdf}
                                    selection={this.props.selection}
                                />
                            </Col>
                        }
                    </Row>
                </Grid>

                <AlertQueue alertMessages={this.props.alerts} />

                <dialogs.CloseDialog visible={this.props.dialogs.showCloseDialog} />
                <dialogs.EadesLayoutDialog visible={this.props.dialogs.showEadesLayoutDialog} />
                <dialogs.FruchtermannLayoutDialog visible={this.props.dialogs.showFruchtermannLayoutDialog} />
                <dialogs.OpenDialog
                    name="openConfig"
                    openDirect={actions.openConfigDirect}
                    openFile={actions.openConfigFile}
                    openURL={actions.openConfigURL}
                    title="Open Configuration"
                    visible={this.props.dialogs.showOpenConfigDialog}
                />
                <dialogs.OpenDialog
                    name="openLayout"
                    openDirect={actions.openLayoutDirect}
                    openFile={actions.openLayoutFile}
                    openURL={actions.openLayoutURL}
                    title="Open Layout"
                    visible={this.props.dialogs.showOpenLayoutDialog}
                />
                <dialogs.OpenDialog
                    name="openStyle"
                    openDirect={actions.openStyleDirect}
                    openFile={actions.openStyleFile}
                    openURL={actions.openStyleURL}
                    title="Open Style"
                    visible={this.props.dialogs.showOpenStyleDialog}
                />
                <dialogs.OpenDialog
                    name="openTurtle"
                    openDirect={actions.openTurtleDirect}
                    openFile={actions.openTurtleFile}
                    openURL={actions.openTurtleURL}
                    title="Open Turtle"
                    visible={this.props.dialogs.showOpenTurtleDialog}
                />
                <dialogs.RandomLayoutDialog visible={this.props.dialogs.showRandomLayoutDialog} />
                <dialogs.RotateDialog visible={this.props.dialogs.showRotateDialog} />
                <dialogs.SaveConfigDialog
                    config={this.props.config}
                    visible={this.props.dialogs.showSaveConfigDialog}
                />
                <dialogs.SaveTurtleDialog
                    rdf={this.props.rdf}
                    visible={this.props.dialogs.showSaveTurtleDialog}
                />
                <dialogs.ScaleDialog visible={this.props.dialogs.showScaleDialog} />
                <dialogs.TranslateDialog visible={this.props.dialogs.showTranslateDialog} />
            </div>
        );
    }
}
