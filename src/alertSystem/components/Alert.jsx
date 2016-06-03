import React from "react";

import {Alert} from "react-bootstrap";

import actions from "../actions/actions.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Computes how long the dialog should be visible. This is based in the
     * message length.
     *
     * @return {Number}
     * After how many milliseconds the alert should be dismissed.
     */
    getDuration() {
        return 2000 + this.props.message.length * 50;
    }

    handleDismiss() {
        actions.DEQUEUE_ALERT();
    }

    render() {
        return (
            <Alert bsStyle={this.props.type} onDismiss={::this.handleDismiss} dismissAfter={this.getDuration()}>
                <p>{this.props.message}</p>
            </Alert>
        );
    }
}