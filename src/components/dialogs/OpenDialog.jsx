import React    from "react";
import * as rbs from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationState} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants to open something.
 */
export default class extends React.Component {

    /**
     * @param {Object} props
     * The props to use.
     *
     * @param {boolean} props.visible
     * Whether to show the dialog.
     *
     * @param {string} props.name
     * The name of the dialog.
     *
     * @param {string} props.title
     * The title to display.
     *
     * @param {Function} props.openDirect
     * The function that handles direct input.
     *
     * @param {Function} props.openFile
     * The function that handles input from files.
     *
     * @param {Function} props.openURL
     * The function that handles input from a URL.
     */
    constructor(props) {
        super(props);

        /**
         * The state of the dialog.
         *
         * @type {Object}
         * @private
         */
        this.state = {
            activeTab: "direct",
            direct:    "",
            file:      undefined,
            url:       ""
        };
    }

    /**
     * Handles tab changed.
     *
     * @param {string} selectedTab
     * The new tab.
     *
     * @private
     */
    handleTabChange(selectedTab = this.state.activeTab) {
        this.setState({
            activeTab: selectedTab
        });
    }

    /**
     * Handles changes to the direct input or URL.
     *
     * @param {Event} e
     * The change event.
     *
     * @private
     */
    handleInputChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    /**
     * Handles changes to the selected file.
     *
     * @param {Event} e
     * The change event.
     *
     * @private
     */
    handleFileChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    /**
     * Checks if a file is selected.
     *
     * @return {boolean}
     * Whether a file is selected.
     *
     * @private
     */
    fileIsValid() {
        return this.state.file !== undefined;
    }

    /**
     * Checks if the user input is valid.
     *
     * @return {boolean}
     * Whether the user input is valid.
     *
     * @private
     */
    isValid() {
        return this.state.activeTab !== "file" || this.fileIsValid();
    }

    /**
     * Submits the dialog.
     *
     * @private
     */
    ok() {
        switch (this.state.activerbs.Tab) {
        case "direct":
            this.props.openDirect(this.state.direct); break;
        case "file":
            this.props.openFile(this.state.file); break;
        case "url":
            this.props.openURL(this.state.url); break;
        }
        actions.setDialogVisibility(this.props.name, false);
    }

    /**
     * Closes the dialog.
     *
     * @private
     */
    close() {
        actions.setDialogVisibility(this.props.name, false);
    }

    /**
     * Renders this component.
     */
    render() {
        const style = {
            marginTop: 20
        };

        return (
            <rbs.Modal show={this.props.visible} onHide={() => this.close()}>
            <rbs.Modal.Header closeButton>
                <rbs.Modal.Title>{this.props.title}</rbs.Modal.Title>
            </rbs.Modal.Header>
            <rbs.Modal.Body>
                <rbs.Tabs activeKey={this.state.activeTab} onSelect={key => this.handleTabChange(key)} id="method">
                    <rbs.Tab eventKey="direct" title="Direct Input" style={style}>
                         <rbs.FormGroup controlId="direct">
                            <rbs.FormControl
                                componentClass="textarea"
                                value={this.state.direct}
                                placeholder="Enter data..."
                                onChange={e => this.handleInputChange(e)}
                                style={{resize: "vertical"}}
                            />
                        </rbs.FormGroup>
                    </rbs.Tab>
                    <rbs.Tab eventKey="file" title="File Upload" style={style} validationState={getValidationState(this.fileIsValid())}>
                         <rbs.FormGroup controlId="file">
                            <rbs.FormControl
                                type="file"
                                onChange={e => this.handleFileChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                    </rbs.Tab>
                    <rbs.Tab eventKey="url" title="URL" style={style}>
                         <rbs.FormGroup controlId="url">
                            <rbs.FormControl
                                type="url"
                                value={this.state.url}
                                placeholder="Enter a URL..."
                                onChange={e => this.handleInputChange(e)}
                            />
                        </rbs.FormGroup>
                    </rbs.Tab>
                </rbs.Tabs>
            </rbs.Modal.Body>
            <rbs.Modal.Footer>
                <rbs.Button onClick={() => this.ok()}disabled={!this.isValid()}>OK</rbs.Button>
                <rbs.Button onClick={() => this.close()}>Cancel</rbs.Button>
            </rbs.Modal.Footer>
            </rbs.Modal>
        );
    }
}