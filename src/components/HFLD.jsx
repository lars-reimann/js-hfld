import React            from "react";
import {Grid, Row, Col} from "react-bootstrap";

import {OpenDialog, ScaleDialog, RotateDialog} from "./dialogs/dialogs.js";

import Menubar      from "./Menubar.jsx";
import LeftSidebar  from "./LeftSidebar.jsx";
import Viewport     from "./Viewport.jsx";
import RightSidebar from "./RightSidebar.jsx";
import AlertQueue   from "./AlertQueue.jsx";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Menubar app={this.props.app} />
                <Grid fluid>
                    <Row>
                        <Col xs={1}>
                            <LeftSidebar />
                        </Col>
                        <Col xs={9}>
                            <Viewport app={this.props.app}/>
                        </Col>
                        <Col xs={2}>
                            <RightSidebar />
                        </Col>
                    </Row>
                </Grid>
                <OpenDialog app={this.props.app} />
                <ScaleDialog app={this.props.app} />
                <RotateDialog app={this.props.app} />
                <AlertQueue app={this.props.app} />
            </div>
        );
    }
}
