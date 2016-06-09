import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants to rotate the layout.
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
            prefix: "",
            iri:    "",
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
     * Checks if the entered x-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the x-coordinate is valid.
     */
    prefixIsValid() {
        return validators.isNotEmpty(this.state.prefix);
    }

    /**
     * Checks if the entered y-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the y-coordinate is valid.
     */
    iriIsValid() {
        return validators.isNotEmpty(this.state.iri);
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    isValid() {
        return this.prefixIsValid() && this.iriIsValid();
    }

    /**
     * Submits the dialog.
     */
    save() {
        actions.enqueueAlert("success", "Added a namespace.");
        actions.addNamespace(this.state.prefix, this.state.iri);
    }

    /**
     * Closes the dialog.
     */
    close() {
        actions.setDialogVisibility("addNamespaces", false);
    }

    resetState() {
        this.setState({
            prefix: "",
            iri:    "",
        });
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.close()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Namespaces</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="prefix" validationState={getValidationStyle(this.prefixIsValid())}>
                            <ControlLabel>Prefix:</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.prefix}
                                placeholder="Enter a string..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="iri" validationState={getValidationStyle(this.iriIsValid())}>
                            <ControlLabel>IRI:</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.iri}
                                placeholder="Enter a string..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.save()} bsStyle="primary" disabled={!this.isValid()}>Save</Button>
                    <Button onClick={() => this.resetState()} bsStyle="danger">Reset Form</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}