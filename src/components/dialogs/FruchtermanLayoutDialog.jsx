import React    from "react";
import * as rbs from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationState} from "../../utils/utils.js";

/**
 * The initial state of the dialog.
 *
 * @type {Object}
 * @ignore
 */
const initialState = {
    x:                      "0",
    y:                      "0",
    width:                  "1920",
    height:                 "1080",
    idealDistanceCoef:      "1",
    initialMaxDisplacement: "192",
    nSteps:                 "50",
};

/**
 * The dialog shown to the user when he wants to create a Fruchterman-Reingold-Layout.
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
        const repulsiveForceCoef  = Number(this.state.repulsiveForceCoef);
        const idealDistance       = Number(this.state.idealDistance);
        const forceToDistanceCoef = Number(this.state.forceToDistanceCoef);
        const nSteps              = Number(this.state.nSteps);
        actions.randomLayout({
            springForceCoef,
            repulsiveForceCoef,
            idealDistance,
            forceToDistanceCoef,
            nSteps
        });
        actions.setDialogVisibility("fruchtermanLayout", false);
    }

    /**
     * Closes the dialog.
     *
     * @private
     */
    close() {
        actions.setDialogVisibility("fruchtermanLayout", false);
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
                    <rbs.Modal.Title>Fruchterman-Reingold-Layout</rbs.Modal.Title>
                </rbs.Modal.Header>
                <rbs.Modal.Body>
                    <form>
                        <rbs.FormGroup controlId="x" validationState={getValidationState(this.isValid("x"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="x-tooltip">The x-coordinate of the top left corner of the bounding rectangle.</rbs.Tooltip>}>
                                    <span>x-Coordinate:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.x}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="y" validationState={getValidationState(this.isValid("y"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="y-tooltip">The y-coordinate of the top left corner of the bounding rectangle.</rbs.Tooltip>}>
                                    <span>y-Coordinate:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.y}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="width" validationState={getValidationState(this.isValid("width"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="width-tooltip">The width of the bounding rectangle.</rbs.Tooltip>}>
                                    <span>Width:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.width}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="height" validationState={getValidationState(this.isValid("height"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="height-tooltip">The height of the bounding rectangle.</rbs.Tooltip>}>
                                    <span>Height:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.height}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="idealDistanceCoef" validationState={getValidationState(this.isValid("idealDistanceCoef"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="idealDistanceCoef-tooltip">The ideal distance between nodes scales linearly with this value.</rbs.Tooltip>}>
                                    <span>Ideal Distance Coefficient:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.idealDistanceCoef}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="initialMaxDisplacement" validationState={getValidationState(this.isValid("initialMaxDisplacement"))}>
                            <rbs.ControlLabel>
                                <rbs.OverlayTrigger placement="right" overlay={
                                    <rbs.Tooltip id="initialMaxDisplacement-tooltip">The maximum distance nodes should be moved during the first simulation step. This value gets reduced during later steps.</rbs.Tooltip>}>
                                    <span>Initial Maximum Displacement:</span>
                                </rbs.OverlayTrigger>
                            </rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.initialMaxDisplacement}
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
                    <rbs.Button onClick={() => this.ok()} bsStyle="primary" disabled={!this.isValid()}>OK</rbs.Button>
                    <rbs.Button onClick={() => this.close()}>Cancel</rbs.Button>
                    <rbs.Button onClick={() => this.reset()} bsStyle="warning">Reset Form</rbs.Button>
                </rbs.Modal.Footer>
            </rbs.Modal>
        );
    }
}