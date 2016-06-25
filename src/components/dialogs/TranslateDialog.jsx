import React    from "react";
import * as rbs from "react-bootstrap";

import {Vec2} from "@ignavia/ella";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants to move the layout.
 */
export default class extends React.Component {

    /**
     * @param {Object} props
     * The props to use.
     *
     * @param {Boolean} props.visible
     * Whether to show this dialog.
     */
    constructor(props) {
        super(props);

        this.state = {
            x: "0",
            y: "0",
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
        const vector = new Vec2(
        	Number(this.state.x),
        	Number(this.state.y)
        );
        actions.translateLayout(vector);
        actions.setDialogVisibility("translate", false);
    }

    /**
     * Closes the dialog.
     *
     * @private
     */
    cancel() {
        actions.setDialogVisibility("translate", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <rbs.Modal show={this.props.visible} onHide={() => this.cancel()}>
                <rbs.Modal.Header closeButton>
                    <rbs.Modal.Title>Translate</rbs.Modal.Title>
                </rbs.Modal.Header>
                <rbs.Modal.Body>
                    <form>
                        <rbs.FormGroup controlId="x" validationState={getValidationStyle(this.isValid("x"))}>
                            <rbs.ControlLabel>x-Coordinate:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.x}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="y" validationState={getValidationStyle(this.isValid("y"))}>
                            <rbs.ControlLabel>y-Coordinate:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.y}
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
