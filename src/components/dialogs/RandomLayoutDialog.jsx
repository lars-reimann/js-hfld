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
            x:   "0",
            y:   "0",
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
            return validators.isValidState(k => this.isValid(k), this.state);
        }
    }

    /**
     * Submits the dialog.
     *
     * @private
     */
    ok() {
        const pos = new Vec2(
            Number(this.state.x),
            Number(this.state.y)
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
