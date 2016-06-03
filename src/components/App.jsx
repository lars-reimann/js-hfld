import React            from "react";
import {Grid, Row, Col} from "react-bootstrap";

import {OpenDialog, TranslateDialog, ScaleDialog, RotateDialog} from "./dialogs/dialogs.js";

import AlertQueueWrapper from "../alertSystem/containers/AlertQueueWrapper.jsx";

import {Menubar, LeftSidebar, Viewport, RightSidebar} from "./sections/sections.js";


export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    leftSidebarIsHidden() {
        return !this.props.app.get("permanentLeftSidebar");
    }

    rightSidebarIsHidden() {
        return !this.props.app.get("permanentRightSidebar") &&
                this.props.app.get("viewport") !== "graphical";
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
                <OpenDialog      app={this.props.app} />
                <TranslateDialog app={this.props.app} />
                <ScaleDialog     app={this.props.app} />
                <RotateDialog    app={this.props.app} />
                <AlertQueueWrapper />
            </div>
        );
    }
}
