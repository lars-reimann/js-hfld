import React from "react";
import {Modal, Tabs, Tab, FormGroup, FormControl, Button} from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationState} from "../../utils/utils.js";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "direct",
            direct:    "",
            file:      undefined,
            url:       ""
        };
    }

    handleTabChange(selectedTab = this.state.activeTab) {
        this.setState({
            activeTab: selectedTab
        });
    }

    handleInputChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    fileIsValid() {
        return this.state.file !== undefined;
    }

    isValid() {
        return this.state.activeTab !== "file" || this.fileIsValid();
    }

    ok() {
        switch (this.state.activeTab) {
        case "direct":
            this.props.openDirect(this.state.direct); break;
        case "file":
            this.props.openFile(this.state.file); break;
        case "url":
            this.props.openURL(this.state.url); break;
        }
        actions.setDialogVisibility(this.props.name, false);
    }

    cancel() {
        actions.setDialogVisibility(this.props.name, false);
    }

    render() {
        const style = {
            marginTop: 20
        };

        return (
            <Modal show={this.props.visible} onHide={() => this.cancel()}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs activeKey={this.state.activeTab} onSelect={key => this.handleTabChange(key)} id="method">
                    <Tab eventKey="direct" title="Direct Input" style={style}>
                         <FormGroup controlId="direct">
                            <FormControl
                                componentClass="textarea"
                                value={this.state.direct}
                                placeholder="Enter data..."
                                onChange={e => this.handleInputChange(e)}
                                style={{resize: "vertical"}}
                            />
                        </FormGroup>
                    </Tab>
                    <Tab eventKey="file" title="File Upload" style={style} validationState={getValidationState(this.fileIsValid())}>
                         <FormGroup controlId="file">
                            <FormControl
                                type="file"
                                onChange={e => this.handleFileChange(e)}
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
                                onChange={e => this.handleInputChange(e)}
                            />
                        </FormGroup>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.ok()}disabled={!this.isValid()}>OK</Button>
                <Button onClick={() => this.cancel()}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}