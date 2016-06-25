import React    from "react";
import * as rbs from "react-bootstrap";

import * as actions from "../../actions/actions.js";

/**
 * The dialog shown to the user when he wants to close the graph.
 */
export default class extends React.Component {

    /**
     * @param {Object} props
     * The props to use.
     *
     * @param {boolean} props.visible
     * Whether to show the dialog.
     */
    constructor(props) {
        super(props);
    }

    /**
     * Submits the dialog.
     *
     * @private
     */
    ok() {
        actions.close();
        actions.setDialogVisibility("close", false);
    }

    /**
     * Closes the dialog.
     *
     * @private
     */
    cancel() {
        actions.setDialogVisibility("close", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <rbs.Modal show={this.props.visible} onHide={() => this.cancel()}>
                <rbs.Modal.Header closeButton>
                    <rbs.Modal.Title>Close</rbs.Modal.Title>
                </rbs.Modal.Header>
                <rbs.Modal.Body>
                    <p>Do you really want to close this graph?</p>
                </rbs.Modal.Body>
                <rbs.Modal.Footer>
                    <rbs.Button onClick={() => this.ok()}>OK</rbs.Button>
                    <rbs.Button onClick={() => this.cancel()}>Cancel</rbs.Button>
                </rbs.Modal.Footer>
            </rbs.Modal>
        );
    }
}
