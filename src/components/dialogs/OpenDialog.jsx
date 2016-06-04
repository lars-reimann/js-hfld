import React from "react";
import {Modal, Tabs, Tab, FormGroup, FormControl, Button} from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "direct",
            direct:    "",
            url:       ""
        };
    }

    handleTabChange(selectedTab) {
        this.setState({
            activeTab: selectedTab
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    ok() {
        switch (this.state.activeTab) {
        case "direct":
            actions.openDirect(this.state.direct); break;
        case "file":
        case "url":
            actions.openURL(this.state.url); break;
        }
        actions.setDialogVisibility("open", false);
    }

    cancel() {
        actions.setDialogVisibility("open", false);
    }

    render() {
        const style = {
            marginTop: 20
        };

        return (
            <Modal show={this.props.visible} onHide={() => this.cancel()}>
            <Modal.Header closeButton>
                <Modal.Title>Open Dialog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs activeKey={this.state.activeTab} onSelect={key => this.handleTabChange(key)} id="method">
                    <Tab eventKey="direct" title="Direct Input" style={style}>
                         <FormGroup controlId="direct">
                            <FormControl
                                componentClass="textarea"
                                value={this.state.direct}
                                placeholder="Enter turtle data..."
                                onChange={e => this.handleChange(e)}
                                style={{resize: "vertical"}}
                            />
                        </FormGroup>
                    </Tab>
                    <Tab eventKey="file" title="File Upload" style={style}>
                         <FormGroup controlId="file">
                            <FormControl
                                type="file"
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Tab>
                    <Tab eventKey="url" title="URL" style={style}>
                         <FormGroup controlId="url">
                            <FormControl
                                type="url"
                                value={this.state.url}
                                placeholder="Enter a URL..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.ok()}>OK</Button>
                <Button onClick={() => this.cancel()}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}