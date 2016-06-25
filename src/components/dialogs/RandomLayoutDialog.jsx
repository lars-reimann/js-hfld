import React    from "react";
import * as rbs from "react-bootstrap";

import {Vec2} from "@ignavia/ella";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationState} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants to randomly position the nodes.
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
         * The initial state.
         *
         * @type {Object}
         * @private
         */
        this.state = {
            posX:   "0",
            posY:   "0",
            width:  `${screen.width}`,
            height: `${screen.height}`,
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
            return this.isValid("posX")  &&
                   this.isValid("posY")  &&
                   this.isValid("width") &&
                   this.isValid("height");
        }
    }

    /**
     * Submits the dialog.
     *
     * @private
     */
    ok() {
        const pos = new Vec2(
            Number(this.state.posX),
            Number(this.state.posY)
        );
        const width  = Number(this.state.width);
        const height = Number(this.state.height);
        actions.randomLayout({ pos, width, height });
        actions.setDialogVisibility("randomLayout", false);
    }

    /**
     * Closes the dialog.
     *
     * @private
     */
    cancel() {
        actions.setDialogVisibility("randomLayout", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <rbs.Modal show={this.props.visible} onHide={() => this.cancel()}>
                <rbs.Modal.Header closeButton>
                    <rbs.Modal.Title>Random Layout</rbs.Modal.Title>
                </rbs.Modal.Header>
                <rbs.Modal.Body>
                    <form>
                        <rbs.FormGroup controlId="posX" validationState={getValidationState(this.isValid("posX"))}>
                            <rbs.ControlLabel>Minimum x-coordinate:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.posX}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="posY" validationState={getValidationState(this.isValid("posY"))}>
                            <rbs.ControlLabel>Minimum y-coordinate:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.posY}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="width" validationState={getValidationState(this.isValid("width"))}>
                            <rbs.ControlLabel>Width:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.width}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="height" validationState={getValidationState(this.isValid("height"))}>
                            <rbs.ControlLabel>Height:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="number"
                                value={this.state.height}
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
