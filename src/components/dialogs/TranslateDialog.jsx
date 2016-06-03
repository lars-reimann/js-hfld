import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

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
     */
    handleChange(e) {
        this.setState({
            [field]: e.target.value
        });
    }

    /**
     * Checks if the entered x-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the x-coordinate is valid.
     */
    xIsValid() {
        return validators.isNumber(this.state.x);
    }

    /**
     * Checks if the entered y-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the y-coordinate is valid.
     */
    yIsValid() {
        return validators.isNumber(this.state.y);
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    isValid() {
        return this.xIsValid() && this.yIsValid();
    }

    /**
     * Submits the dialog.
     */
    ok() {
        const x = Number(this.state.x);
        const y = Number(this.state.y);
        actions.translateLayout(new Vec2(x, y));
        actions.setDialogVisibility("translate", false);
    }

    /**
     * Closes the dialog.
     */
    cancel() {
        actions.setDialogVisibility("translate", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.cancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>Translate Dialog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="x" validationState={getValidationStyle(this.xIsValid())}>
                            <ControlLabel>x-coordinate:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.x}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange("x", e)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="y" validationState={getValidationStyle(this.yIsValid())}>
                            <ControlLabel>y-coordinate:</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.y}
                                placeholder="Enter a number..."
                                onChange={e => this.handleChange("y", e)}
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