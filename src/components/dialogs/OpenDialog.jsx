import React from "react";
import {Modal, Tabs, Tab, Input, Button} from "react-bootstrap";

import actions                          from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.initState();
    }

    initState() {
        this.state = {
            activeTab: "direct",
            direct: "",
            url: ""
        };
    }

    handleTabChange(selectedTab) {
        this.setState({
            activeTab: selectedTab
        });
    }

    handleDirectChange() {
        this.setState({
            direct: this.refs.direct.getValue()
        });
    }

    directIsValid() {
        return validators.nonEmpty(this.state.direct);
    }

    handleURLChange() {
        this.setState({
            url: this.refs.url.getValue()
        })
    }

    urlIsValid() {
        return validators.nonEmpty(this.state.url);
    }

    inputIsValid() {
        switch (this.state.activeTab) {
        case "direct":
            return this.directIsValid();
        case "file":
            return true;
        case "url":
            return this.urlIsValid();
        }
    }

    ok() {
        let s;
        switch (this.state.activeTab) {
        case "direct":
            s = this.state.direct; break;
        case "file":
        case "url":
            s = ""
        }
        this.initState();
        actions.SUBMIT_OPEN_DIALOG(s);
    }

    cancel() {
        this.initState();
        actions.SHOW_OPEN_DIALOG(false);
    }


    render() {
        const style = {
            marginTop: 20
        };

        return (
            <Modal show={this.props.app.get("showOpenDialog")} onHide={::this.cancel}>
            <Modal.Header closeButton>
                <Modal.Title>Open Dialog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs activeKey={this.state.activeTab} onSelect={::this.handleTabChange}>
                    <Tab eventKey="direct" title="Direct Input" style={style}>
                         <Input
                            type="textarea"
                            placeholder="Enter turtle data..."
                            ref="direct"
                            value={this.state.direct}
                            onChange={::this.handleDirectChange}
                            bsStyle={getValidationStyle(this.directIsValid())}
                            hasFeedback
                         />
                    </Tab>
                    <Tab eventKey="file" title="File Upload" style={style} disabled>
                         <Input type="file" />
                    </Tab>
                    <Tab eventKey="url" title="URL" style={style} disabled>
                         <Input
                            type="url"
                            placeholder="Enter a URL..."
                            ref="url"
                            value={this.state.url}
                            onChange={::this.handleURLChange}
                            bsStyle={getValidationStyle(this.urlIsValid())}
                            hasFeedback
                         />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={::this.ok} disabled={!this.inputIsValid()}>OK</Button>
                <Button onClick={::this.cancel}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}