import React    from "react";
import * as rbs from "react-bootstrap";

import {Vec2} from "@ignavia/ella";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationState} from "../../utils/utils.js";

/**
 * The initial state of the dialog.
 *
 * @type {Object}
 * @ignore
 */
const initialState = {
    factorX: "1",
    factorY: "1",
    centerX: "0",
    centerY: "0",
};

/**
 * The dialog shown to the user when he wants to scale the layout.
 */
export default class extends React.Component {

    /**
     * @param {Object} props
     * The props to use.
     *
     * @param {boolean} props.visible
     * Whether to show the dialog.
     */
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    /**
     * Handles user input.
     *
     * @param {Event} e
     * The fired event.
     *
     * @private
     */
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    /**
     * Validated the input. If a key is given, only this input is checked,
     * otherwise the complete input is tested.
     *
     * @param {string} [key]
     * The part of the input to test.
     *
     * @return {boolean}
     * Whether the input is valid.
     *
     * @private
     */
    isValid(key) {
        if (key) {
            return validators.isNumber(this.state[key]);
        } else {
            return validators.isValidState(k => this.isValid(k), this.state);
        }
    }

    /**
     * Submits the dialog.
     *
     * @private
     */
    ok() {
        const factorX = Number(this.state.factorX);
        const factorY = Number(this.state.factorY);
        const center  = new Vec2(
            Number(this.state.centerX),
            Number(this.state.centerY)
        );
        actions.scaleLayout(factorX, factorY, center);
        actions.setDialogVisibility("scale", false);
    }

    /**
     * Closes the dialog.
     *
     * @private
     */
    cancel() {
        actions.setDialogVisibility("scale", false);
    }

    /**
     * Resets the dialog.
     *
     * @private
     */
    reset() {
        this.setState(initialState);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <rbs.Modal show={this.props.visible} onHide={() => this.cancel()}>
                <rbs.Modal.Header closeButton>
                    <rbs.Modal.Title>Scale</rbs.Modal.Title>
                </rbs.Modal.Header>
                <rbs.Modal.Body>
                    <form>
                        <rbs.FormGroup controlId="factorX" validationState={getValidationState(this.isValid("factorX"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="factorX-tooltip">The factor by which to stretch the layout in the x-direction.</rbs.Tooltip>}>
                                    <span>Factor in x-Direction:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.factorX}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="factorY" validationState={getValidationState(this.isValid("factorY"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="factorY-tooltip">The factor by which to stretch the layout in the y-direction.</rbs.Tooltip>}>
                                    <span>Factor in y-Direction:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.factorY}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="centerX" validationState={getValidationState(this.isValid("centerX"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="centerX-tooltip">The x-coordinate of the point from which to scale.</rbs.Tooltip>}>
                                    <span>x-Coordinate:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.centerX}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="centerY" validationState={getValidationState(this.isValid("centerY"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="centerY-tooltip">The y-coordinate of the point from which to scale.</rbs.Tooltip>}>
                                    <span>y-Coordinate:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.centerY}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                    </form>
                </rbs.Modal.Body>
                <rbs.Modal.Footer>
                    <rbs.Button onClick={() => this.ok()} disabled={!this.isValid()} bsStyle="primary">OK</rbs.Button>
                    <rbs.Button onClick={() => this.cancel()}>Cancel</rbs.Button>
                    <rbs.Button onClick={() => this.reset()} bsStyle="warning">Reset Form</rbs.Button>
                </rbs.Modal.Footer>
            </rbs.Modal>
        );
    }
}
