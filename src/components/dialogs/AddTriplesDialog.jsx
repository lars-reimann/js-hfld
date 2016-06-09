import React                                                                          from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button, Tooltip, OverlayTrigger} from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants to create an Eades-Layout.
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
            springForceCoef:     "2",
            repulsiveForceCoef:  "1",
            idealDistance:       "0.1",
            forceToDistanceCoef: "0.1",
            nSteps:              "100",
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
     * Checks if the entered spring force coefficient is valid.
     *
     * @return {Boolean}
     * Whether the spring force coefficient is valid.
     */
    springForceCoefIsValid() {
        return validators.isNumber(this.state.springForceCoef);
    }

    /**
     * Checks if the entered repulsive force coefficent is valid.
     *
     * @return {Boolean}
     * Whether the repulsive force coefficent is valid.
     */
    repulsiveForceCoefIsValid() {
        return validators.isNumber(this.state.repulsiveForceCoef);
    }

    /**
     * Checks if the entered ideal distance is valid.
     *
     * @return {Boolean}
     * Whether the ideal distance is valid.
     */
    idealDistanceIsValid() {
        return validators.isNumber(this.state.idealDistance);
    }

    /**
     * Checks if the entered force-to-distance coefficient is valid.
     *
     * @return {Boolean}
     * Whether the force-to-distance coefficient is valid.
     */
    forceToDistanceCoefIsValid() {
        return validators.isNumber(this.state.forceToDistanceCoef);
    }

    /**
     * Checks if the entered number of simulation steps is valid.
     *
     * @return {Boolean}
     * Whether the number of simulation steps is valid.
     */
    nStepsIsValid() {
        return validators.isNumber(this.state.nSteps);
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    isValid() {
        return this.springForceCoefIsValid()     &&
               this.repulsiveForceCoefIsValid()  &&
               this.idealDistanceIsValid()       &&
               this.forceToDistanceCoefIsValid() &&
               this.nStepsIsValid();
    }

    /**
     * Submits the dialog.
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
        actions.setDialogVisibility("addTriples", false);
    }

    /**
     * Closes the dialog.
     */
    cancel() {
        actions.setDialogVisibility("addTriples", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.cancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Triples</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="springForceCoef" validationState={getValidationStyle(this.springForceCoefIsValid())}>
                            <ControlLabel>
                                <OverlayTrigger placement="right" overlay={
                                    <Tooltip id="springForceCoef-tooltip">The spring force between two adjacent nodes scales linearly with this parameter.</Tooltip>}>
                                    <span>Spring Force Coefficient:</span>
                                </OverlayTrigger>
                            </ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.springForceCoef}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="repulsiveForceCoef" validationState={getValidationStyle(this.repulsiveForceCoefIsValid())}>
                            <ControlLabel>
                                <OverlayTrigger placement="right" overlay={
                                    <Tooltip id="repulsiveForceCoef-tooltip">The repulsive force between two non-adjacent nodes scales linearly with this parameter.</Tooltip>}>
                                    <span>Repulsive Force Coefficient:</span>
                                </OverlayTrigger>
                            </ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.repulsiveForceCoef}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="idealDistance" validationState={getValidationStyle(this.idealDistanceIsValid())}>
                            <ControlLabel>
                                <OverlayTrigger placement="right" overlay={
                                    <Tooltip id="idealDistance-tooltip">If the distance between two adjacent nodes equals this value, the force is 0.</Tooltip>}>
                                    <span>Ideal Distance:</span>
                                </OverlayTrigger>
                            </ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.idealDistance} // TODO: make ideal distance based on screen diagonal
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="forceToDistanceCoef" validationState={getValidationStyle(this.forceToDistanceCoefIsValid())}>
                            <ControlLabel>
                                <OverlayTrigger placement="right" overlay={
                                    <Tooltip id="forceToDistance-tooltip">The conversion from a force to a translation scales linearly with this value.</Tooltip>}>
                                    <span>Force-to-distance Coefficient:</span>
                                </OverlayTrigger>
                            </ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.forceToDistanceCoef}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="nSteps" validationState={getValidationStyle(this.nStepsIsValid())}>
                            <ControlLabel>Number of Simulation Steps:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.nSteps}
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