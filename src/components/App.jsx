import React            from "react";
import {Grid, Row, Col} from "react-bootstrap";

import * as dialogs from "./dialogs/dialogs.js";

import AlertQueue from "./alerts/AlertQueue.jsx";

import {Menubar, LeftSidebar, Viewport, InformationPanel} from "./sections/sections.js";

import * as actions from "../actions/actions.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    leftSidebarIsHidden() {
        return !this.props.config.permanentLeftSidebar;
    }

    rightSidebarIsHidden() {
        return !this.props.config.permanentRightSidebar &&
                this.props.config.viewport !== "graphical";
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
                                <InformationPanel
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

                <dialogs.CloseDialog              visible={this.props.dialogs.showCloseDialog} />
                <dialogs.EadesLayoutDialog        visible={this.props.dialogs.showEadesLayoutDialog} />
                <dialogs.FruchtermannLayoutDialog visible={this.props.dialogs.showFruchtermannLayoutDialog} />
                <dialogs.OpenDialog               visible={this.props.dialogs.showOpenDialog} />
                <dialogs.RandomLayoutDialog       visible={this.props.dialogs.showRandomLayoutDialog} />
                <dialogs.RotateDialog             visible={this.props.dialogs.showRotateDialog} />
                <dialogs.SaveDialog
                    graph={this.props.rdf.graph}
                    profile={this.props.rdf.profile}
                    visible={this.props.dialogs.showSaveDialog}
                />
                <dialogs.ScaleDialog              visible={this.props.dialogs.showScaleDialog} />
                <dialogs.TranslateDialog          visible={this.props.dialogs.showTranslateDialog} />
            </div>
        );
    }
}
