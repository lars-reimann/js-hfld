import React from "react";
import {Modal, Input, Button} from "react-bootstrap";

import actions from "../../actions/actions.js";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            factor: ""
        };
    }

    cancel() {
        this.state.factor = "";
        actions.SHOW_SCALE_DIALOG(false);
    }

    ok() {
        const factor = this.state.factor;
        this.state.factor = "";
        actions.SUBMIT_SCALE_DIALOG(factor);
    }

    validateFactor() {
        const factor = Number.parseFloat(this.state.factor);
        return Number.isNaN(factor) ? "error" : "success";
    }

    handleFactorChange() {
        this.setState({
            factor: this.refs.factor.getValue()
        });
    }

    render() {
        return (
            <Modal show={this.props.app.get("showScaleDialog")} onHide={::this.cancel}>
            <Modal.Header closeButton>
                <Modal.Title>Scale Dialog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <Input
                        type="number"
                        label="Factor"
                        value={this.state.factor}
                        placeholder="Enter a number..."
                        ref="factor"
                        onChange={::this.handleFactorChange}
                        bsStyle={this.validateFactor()}
                        hasFeedback
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={::this.ok} disabled={this.validateFactor() !== "success"}>OK</Button>
                <Button onClick={::this.cancel}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}