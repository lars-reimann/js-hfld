import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import {Vec2}         from "@ignavia/ella";
import {TurtleWriter} from "@ignavia/rdf";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

const writer = new TurtleWriter();

/**
 * The dialog shown to the user when he wants to scale the layout.
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

        this.state = {
            filename: "download.ttl",
        };
    }

    /**
     * Handles user input.
     *
     * @param {Event} e
     * The fired event.
     */
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    /**
     * Checks if the entered filename is valid.
     *
     * @return {Boolean}
     * Whether the filename is valid.
     */
    filenameIsValid() {
        return this.state.filename !== "";
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    isValid() {
        return this.filenameIsValid();
    }

    /**
     * Submits the dialog.
     */
    ok() {
        actions.saveTurtle(this.props.graph, this.props.profile, this.state.filename);
        actions.setDialogVisibility("saveTurtle", false);
    }

    /**
     * Closes the dialog.
     */
    cancel() {
        actions.setDialogVisibility("saveTurtle", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.cancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>Save</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="filename" validationState={getValidationStyle(this.filenameIsValid())}>
                            <ControlLabel>Filename:</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.filename}
                                placeholder="Enter a string..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.ok()} disabled={!this.isValid()}>OK</Button>
                    <Button onClick={() => this.cancel()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}