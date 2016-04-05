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
            factor: ""
        };
    }

    handleFactorChange() {
        this.setState({
            factor: this.refs.factor.getValue()
        });
    }

    factorIsValid() {
        return validators.isNumber(this.state.factor);
    }

    ok() {
        const factor = this.state.factor;
        this.initState();
        actions.SUBMIT_SCALE_DIALOG(factor);
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={::this.ok} disabled={!this.factorIsValid()}>OK</Button>
                    <Button onClick={::this.cancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}