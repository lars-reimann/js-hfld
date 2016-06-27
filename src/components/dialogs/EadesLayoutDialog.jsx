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
    randomX:             "0",
    randomY:             "0",
    randomWidth:         "1920",
    randomHeight:        "1080",
    springForceCoef:     "2",
    idealDistance:       "200",
    repulsiveForceCoef:  "1",
    forceToDistanceCoef: "0.1",
    nSteps:              "100",
};

/**
 * The dialog shown to the user when he wants to create an Eades-Layout.
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

        /**
         * The state of the dialog.
         *
         * @type {Object}
         * @private
         */
        this.state = initialState;
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
        const springForceCoef     = Number(this.state.springForceCoef);
        const idealDistance       = Number(this.state.idealDistance);
        const repulsiveForceCoef  = Number(this.state.repulsiveForceCoef);
        const forceToDistanceCoef = Number(this.state.forceToDistanceCoef);
        const nSteps              = Number(this.state.nSteps);
        actions.eadesLayout({
            springForceCoef,
            idealDistance,
            repulsiveForceCoef,
            forceToDistanceCoef,
            nSteps
        });
        actions.setDialogVisibility("eadesLayout", false);
    }

    /**
     * Closes the dialog.
     *
     * @private
     */
    close() {
        actions.setDialogVisibility("eadesLayout", false);
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
            <rbs.Modal show={this.props.visible} onHide={() => this.close()}>
                <rbs.Modal.Header closeButton>
                    <rbs.Modal.Title>Eades-Layout</rbs.Modal.Title>
                </rbs.Modal.Header>
                <rbs.Modal.Body>
                    <form>
                        <rbs.FormGroup controlId="springForceCoef" validationState={getValidationState(this.isValid("springForceCoef"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="springForceCoef-tooltip">The spring force between two adjacent nodes scales linearly with this parameter.</rbs.Tooltip>}>
                                    <span>Spring Force Coefficient:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.springForceCoef}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="idealDistance" validationState={getValidationState(this.isValid("idealDistance"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="idealDistance-tooltip">If the distance between two adjacent nodes equals this value, the force is 0.</rbs.Tooltip>}>
                                    <span>Ideal Distance:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.idealDistance} // TODO: make ideal distance based on screen diagonal
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="repulsiveForceCoef" validationState={getValidationState(this.isValid("repulsiveForceCoef"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="repulsiveForceCoef-tooltip">The repulsive force between two non-adjacent nodes scales linearly with this parameter.</rbs.Tooltip>}>
                                    <span>Repulsive Force Coefficient:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.repulsiveForceCoef}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="forceToDistanceCoef" validationState={getValidationState(this.isValid("forceToDistanceCoef"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="forceToDistance-tooltip">The conversion from a force to a translation scales linearly with this value.</rbs.Tooltip>}>
                                    <span>Force-to-distance Coefficient:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.forceToDistanceCoef}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="nSteps" validationState={getValidationState(this.isValid("nSteps"))}>
                            <rbs.ControlLabel>Number of Simulation Steps:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.nSteps}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                    </form>
                </rbs.Modal.Body>
                <rbs.Modal.Footer>
                    <rbs.Button onClick={() => this.ok()} disabled={!this.isValid()} bsStyle="primary">OK</rbs.Button>
                    <rbs.Button onClick={() => this.close()}>Cancel</rbs.Button>
                    <rbs.Button onClick={() => this.reset()} bsStyle="warning">Reset Form</rbs.Button>
                </rbs.Modal.Footer>
            </rbs.Modal>
        );
    }
}