import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import {Vec2} from "@ignavia/ella";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

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
    }

    /**
     * Initializes the state.
     */
    getInitialState() {
        return {
            angle:  "1",
            centerX: "0",
            centerY: "0"
        };
    }

    /**
     * Handles user input.
     *
     * @param {String} field
     * The field that was changed.
     *
     * @param {Event} e
     * The fired event.
     */
    handleChange(field, e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    /**
     * Checks if the entered angle is valid.
     *
     * @return {Boolean}
     * Whether the angle is valid.
     */
    angleIsValid() {
        return validators.isNumber(this.state.angle);
    }

    /**
     * Checks if the entered x-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the x-coordinate is valid.
     */
    centerXIsValid() {
        return validators.isNumber(this.state.centerX);
    }

    /**
     * Checks if the entered y-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the y-coordinate is valid.
     */
    centerYIsValid() {
        return validators.isNumber(this.state.centerY);
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    isValid() {
        return this.angleIsValid() && this.centerXIsValid() && this.centerYIsValid();
    }

    /**
     * Submits the dialog.
     */
    ok() {
        const angle   = Number(this.state.angle) / 180 * Math.PI;
        const centerX = Number(this.state.centerX);
        const centerY = Number(this.state.centerY);
        actions.rotateLayout(angle, new Vec2(centerX, centerY));
        actions.setDialogVisibility("scale", false);
    }

    /**
     * Closes the dialog.
     */
    cancel() {
        actions.setDialogVisibility("scale", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.cancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>Scale Dialog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="angle" validationState={getValidationStyle(this.angleIsValid())}>
                            <ControlLabel>Angle:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.angle}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="centerX" validationState={getValidationStyle(this.centerXIsValid())}>
                            <ControlLabel>x-coordinate:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.centerX}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="centerY" validationState={getValidationStyle(this.centerYIsValid())}>
                            <ControlLabel>y-coordinate:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.centerY}
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