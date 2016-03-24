import React            from "react";
import {Grid, Row, Col} from "react-bootstrap";

import Menubar      from "./Menubar.jsx";
import LeftSidebar  from "./LeftSidebar.jsx";
import Viewport     from "./Viewport.jsx";
import RightSidebar from "./RightSidebar.jsx";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alwaysShowMenuBar: true,
            alwaysShowLeftSideBar: true,
            alwaysShowRightSidebar: true,
            menubarVisible: true, // this and the next two are probable redundant and can be computed
            leftSidebarVisible: true,
            rightSidebarVisible: true
        };
    }

    render() {
        return (
            <div>
                <Menubar />
                <Grid fluid>
                    <Row>
                        <Col xs={1}>
                            <LeftSidebar />
                        </Col>
                        <Col xs={9}>
                            <Viewport />
                        </Col>
                        <Col xs={2}>
                            <RightSidebar />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}