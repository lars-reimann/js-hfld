import React    from "react";
import * as rbs from "react-bootstrap";

import {Vec2} from "@ignavia/ella";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationState} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants to rotate the layout.
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

        this.state = {
            angle:   "0",
            centerX: "0",
            centerY: "0",
        };
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
        const angle  = Number(this.state.angle) / 180 * Math.PI;
        const center = new Vec2(
            Number(this.state.centerX),
            Number(this.state.centerY)
        );
        actions.rotateLayout(angle, center);
        actions.setDialogVisibility("rotate", false);
    }

    /**
     * Closes the dialog.
     *
     * @private
     */
    cancel() {
        actions.setDialogVisibility("rotate", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <rbs.Modal show={this.props.visible} onHide={() => this.cancel()}>
                <rbs.Modal.Header closeButton>
                    <rbs.Modal.Title>Rotate</rbs.Modal.Title>
                </rbs.Modal.Header>
                <rbs.Modal.Body>
                    <form>
                        <rbs.FormGroup controlId="angle" validationState={getValidationState(this.isValid("angle"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="rotate-tooltip">The angle by which to rotate.</rbs.Tooltip>}>
                                    <span>Angle:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.angle}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="centerX" validationState={getValidationState(this.isValid("centerX"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="centerX-tooltip">The x-coordinate of the point around which to rotate.</rbs.Tooltip>}>
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
                                    <rbs.Tooltip id="centerY-tooltip">The y-coordinate of the point around which to rotate.</rbs.Tooltip>}>
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
                    <rbs.Button onClick={() => this.ok()} disabled={!this.isValid()}>OK</rbs.Button>
                    <rbs.Button onClick={() => this.cancel()}>Cancel</rbs.Button>
                </rbs.Modal.Footer>
            </rbs.Modal>
        );
    }
}
