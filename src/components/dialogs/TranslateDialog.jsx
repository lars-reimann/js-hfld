import React from "react";
import {Modal, FormGroup, Input,FormControl, ControlLabel, Button} from "react-bootstrap";

import actions                          from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.initState();
    }

    initState() {
        this.state = {
            centerX: "",
            centerY: ""
        };
    }

    handleChange(field, e) {
        this.setState({
            [field]: e.target.value
        });
    }

    xIsValid() {
        return validators.isNumber(this.state.x);
    }

    yIsValid() {
        return validators.isNumber(this.state.y);
    }

    isValid() {
        return this.xIsValid() && this.yIsValid();
    }

    ok() {
        const x = Number(this.state.x);
        const y = Number(this.state.y);
        this.initState();
        actions.SUBMIT_TRANSLATE_DIALOG(x, y);
    }

    cancel() {
        this.initState();
        actions.SHOW_TRANSLATE_DIALOG(false);
    }

    render() {
        return (
            <Modal show={this.props.app.get("showTranslateDialog")} onHide={() => this.cancel()}>
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