import React from "react";
import {Modal, Input, Button} from "react-bootstrap";

import actions                          from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.initState();
    }

    initState() {
        this.state = {
            angle:   "",
            centerX: "0",
            centerY: "0"
        };
    }

    handleAngleChange() {
        this.setState({
            angle: this.refs.angle.getValue()
        });
    }

    handleCenterXChange() {
        this.setState({
            centerX: this.refs.centerX.getValue()
        });
    }

    handleCenterYChange() {
        this.setState({
            centerY: this.refs.centerY.getValue()
        });
    }

    angleIsValid() {
        return validators.isNumber(this.state.angle)
    }

    centerXIsValid() {
        return validators.isNumber(this.state.centerX);
    }

    centerYIsValid() {
        return validators.isNumber(this.state.centerY);
    }

    isValid() {
        return this.angleIsValid() && this.centerXIsValid() && this.centerYIsValid();
    }

    ok() {
        const angle   = Number(this.state.angle) / 180 * Math.PI;
        const centerX = Number(this.state.centerX);
        const centerY = Number(this.state.centerY);
        this.initState();
        actions.SUBMIT_ROTATE_DIALOG(angle, centerX, centerY);
    }

    cancel() {
        this.initState();
        actions.SHOW_ROTATE_DIALOG(false);
    }

    render() {
        return (
            <Modal show={this.props.app.get("showRotateDialog")} onHide={::this.cancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Rotate Dialog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Input
                            type="number"
                            label="Angle (in degrees)"
                            value={this.state.angle}
                            placeholder="Enter a number..."
                            ref="angle"
                            onChange={::this.handleAngleChange}
                            bsStyle={getValidationStyle(this.angleIsValid())}
                            hasFeedback
                        />
                        <Input
                            type="number"
                            label="Center x-coordinate"
                            value={this.state.centerX}
                            placeholder="Enter a number..."
                            ref="centerX"
                            onChange={::this.handleCenterXChange}
                            bsStyle={getValidationStyle(this.centerXIsValid())}
                            hasFeedback
                        />
                        <Input
                            type="number"
                            label="Center y-coordinate"
                            value={this.state.centerY}
                            placeholder="Enter a number..."
                            ref="centerY"
                            onChange={::this.handleCenterYChange}
                            bsStyle={getValidationStyle(this.centerYIsValid())}
                            hasFeedback
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={::this.ok} disabled={!this.isValid()}>OK</Button>
                    <Button onClick={::this.cancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}