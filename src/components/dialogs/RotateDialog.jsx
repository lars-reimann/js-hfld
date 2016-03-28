import React from "react";
import {Modal, Input, Button} from "react-bootstrap";

import actions from "../../actions/actions.js";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            angle: ""
        };
    }

    cancel() {
        this.state.angle = "";
        actions.SHOW_ROTATE_DIALOG(false);
    }

    ok() {
        const angle = this.state.angle / Math.PI * 180;
        this.state.angle = "";
        actions.SUBMIT_ROTATE_DIALOG(angle);
    }

    validateAngle() {
        const angle = Number.parseFloat(this.state.angle);
        return Number.isNaN(angle) ? "error" : "success";
    }

    handleAngleChange() {
        this.setState({
            angle: this.refs.angle.getValue()
        });
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
                        value={this.state.factor}
                        placeholder="Enter a number..."
                        ref="angle"
                        onChange={::this.handleAngleChange}
                        bsStyle={this.validateAngle()}
                        hasFeedback
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={::this.ok} disabled={this.validateAngle() !== "success"}>OK</Button>
                <Button onClick={::this.cancel}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}