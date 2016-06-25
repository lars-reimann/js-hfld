import React    from "react";
import * as rbs from "react-bootstrap";

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

        this.state = {
            factorX: "1",
            factorY: "1",
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
                        <rbs.FormGroup controlId="factorX" validationState={getValidationStyle(this.isValid("factorX"))}>
                            <rbs.ControlLabel>Factor in x-Direction:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.factorX}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="factorY" validationState={getValidationStyle(this.isValid("factorY"))}>
                            <rbs.ControlLabel>Factor in y-Direction:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.factorY}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="centerX" validationState={getValidationStyle(this.isValid("centerX"))}>
                            <rbs.ControlLabel>x-Coordinate of Center:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.centerX}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="centerY" validationState={getValidationStyle(this.isValid("centerY"))}>
                            <rbs.ControlLabel>y-Coordinate of Center:</rbs.ControlLabel>
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
