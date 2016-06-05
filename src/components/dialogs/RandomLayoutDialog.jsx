import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants to randomly position the nodes.
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

        /**
         * The initial state.
         *
         * @type {Object}
         */
        this.state = {
            minX: "0",
            minY: "0",
            maxX: "1",
            maxY: "1",
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
     * Checks if the entered minimum x-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the minimum x-coordinate is valid.
     */
    minXIsValid() {
        return validators.isNumber(this.state.minX);
    }

    /**
     * Checks if the entered minimum y-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the minimum y-coordinate is valid.
     */
    minYIsValid() {
        return validators.isNumber(this.state.minY);
    }

    /**
     * Checks if the entered maximum x-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the maximum x-coordinate is valid.
     */
    maxXIsValid() {
        return validators.isNumber(this.state.maxX);
    }

    /**
     * Checks if the entered maximum y-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the maximum y-coordinate is valid.
     */
    maxYIsValid() {
        return validators.isNumber(this.state.maxY);
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    isValid() {
        return this.minXIsValid() &&
               this.minYIsValid() &&
               this.maxXIsValid() &&
               this.maxYIsValid();
    }

    /**
     * Submits the dialog.
     */
    ok() {
        const minX = Number(this.state.minX);
        const minY = Number(this.state.minY);
        const maxX = Number(this.state.maxX);
        const maxY = Number(this.state.maxY);
        actions.randomLayout({ minX, minY, maxX, maxY });
        actions.setDialogVisibility("randomLayout", false);
    }

    /**
     * Closes the dialog.
     */
    cancel() {
        actions.setDialogVisibility("randomLayout", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.cancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>Random Layout</Modal.Title>
                    <p>The top-left corner of the screen is (0, 0) and the bottom-right corner is (1, 1).</p>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="minX" validationState={getValidationStyle(this.minXIsValid())}>
                            <ControlLabel>Minimum x-coordinate:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.minX}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="minY" validationState={getValidationStyle(this.minYIsValid())}>
                            <ControlLabel>Minimum y-coordinate:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.minY}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="maxX" validationState={getValidationStyle(this.maxXIsValid())}>
                            <ControlLabel>Maximum x-coordinate:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.maxX}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="maxY" validationState={getValidationStyle(this.maxYIsValid())}>
                            <ControlLabel>Maximum y-coordinate:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.maxY}
                                placeholder="Enter a number..."
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