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
        return !this.props.app.permanentLeftSidebar;
    }

    rightSidebarIsHidden() {
        return !this.props.app.permanentRightSidebar &&
                this.props.app.viewport !== "graphical";
    }

    render() {
        return (
            <div>
                <Menubar app={this.props.app} />
                <Grid fluid>
                    <Row>
                        { this.leftSidebarIsHidden() ? null :
                            <Col xs={1}>
                                <LeftSidebar />
                            </Col>
                        }
                        <Col xs={9 + (this.leftSidebarIsHidden() ? 1 : 0) + (this.rightSidebarIsHidden() ? 2 : 0)}>
                            <Viewport {...this.props}/>
                        </Col>
                        { this.rightSidebarIsHidden() ? null :
                            <Col xs={2}>
                                <RightSidebar />
                            </Col>
                        }
                    </Row>
                </Grid>

                <AlertQueue alertMessages={this.props.alerts} onDismiss={actions.dequeueAlert}/>

                <dialogs.CloseDialog              visible={this.props.dialogs.showCloseDialog} />
                <dialogs.EadesLayoutDialog        visible={this.props.dialogs.showEadesLayoutDialog} />
                <dialogs.FruchtermannLayoutDialog visible={this.props.dialogs.showFruchtermannLayoutDialog} />
                <dialogs.OpenDialog               visible={this.props.dialogs.showOpenDialog} />
                <dialogs.RandomLayoutDialog       visible={this.props.dialogs.showRandomLayoutDialog} />
                <dialogs.RotateDialog             visible={this.props.dialogs.showRotateDialog} />
                <dialogs.ScaleDialog              visible={this.props.dialogs.showScaleDialog} />
                <dialogs.TranslateDialog          visible={this.props.dialogs.showTranslateDialog} />
            </div>
        );
    }
}
