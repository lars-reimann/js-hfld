import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import {Vec2} from "@ignavia/ella";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants close the graph.
 */
export default class extends React.Component {

    /**
     * @param {Object} props
     * The props to use.
     *
     * @param {Boolean} props.visible
     * Whether to show the dialog.
     */
    constructor(props) {
        super(props);
    }

    /**
     * Submits the dialog.
     */
    ok() {
        actions.close();
        actions.setDialogVisibility("close", false);
    }

    /**
     * Closes the dialog.
     */
    cancel() {
        actions.setDialogVisibility("close", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.cancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>Close</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you really want to close this graph?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.ok()}>OK</Button>
                    <Button onClick={() => this.cancel()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
