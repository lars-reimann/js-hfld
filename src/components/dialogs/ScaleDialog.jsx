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
            factor:  "",
            centerX: "0",
            centerY: "0"
        };
    }

    handleFactorChange() {
        this.setState({
            factor: this.refs.factor.getValue()
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

    factorIsValid() {
        return validators.isNumber(this.state.factor);
    }

    centerXIsValid() {
        return validators.isNumber(this.state.centerX);
    }

    centerYIsValid() {
        return validators.isNumber(this.state.centerY);
    }

    isValid() {
        return this.factorIsValid() && this.centerXIsValid() && this.centerYIsValid();
    }

    ok() {
        const factor  = Number(this.state.factor);
        const centerX = Number(this.state.centerX);
        const centerY = Number(this.state.centerY);
        this.initState();
        actions.SUBMIT_SCALE_DIALOG(factor, centerX, centerY);
    }

    cancel() {
        this.initState();
        actions.SHOW_SCALE_DIALOG(false);
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
                            bsStyle={getValidationStyle(this.factorIsValid())}
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