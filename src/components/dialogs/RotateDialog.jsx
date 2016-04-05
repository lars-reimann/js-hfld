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
            angle: ""
        };
    }

    handleAngleChange() {
        this.setState({
            angle: this.refs.angle.getValue()
        });
    }

    angleIsValid() {
        return validators.isNumber(this.state.angle)
    }

    ok() {
        const angle = this.state.angle / Math.PI * 180;
        this.initState();
        actions.SUBMIT_ROTATE_DIALOG(angle);
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={::this.ok} disabled={!this.angleIsValid()}>OK</Button>
                    <Button onClick={::this.cancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}