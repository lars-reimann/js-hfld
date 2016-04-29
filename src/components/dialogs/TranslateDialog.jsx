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
            centerX: "",
            centerY: ""
        };
    }

    handleXChange() {
        this.setState({
            x: this.refs.x.getValue()
        });
    }

    handleYChange() {
        this.setState({
            y: this.refs.y.getValue()
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
            <Modal show={this.props.app.get("showTranslateDialog")} onHide={::this.cancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Translate Dialog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Input
                            type="number"
                            label="x-coordinate"
                            value={this.state.x}
                            placeholder="Enter a number..."
                            ref="x"
                            onChange={::this.handleXChange}
                            bsStyle={getValidationStyle(this.xIsValid())}
                            hasFeedback
                        />
                        <Input
                            type="number"
                            label="y-coordinate"
                            value={this.state.y}
                            placeholder="Enter a number..."
                            ref="y"
                            onChange={::this.handleYChange}
                            bsStyle={getValidationStyle(this.yIsValid())}
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