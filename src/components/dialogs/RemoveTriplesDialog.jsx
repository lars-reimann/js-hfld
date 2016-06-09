import React           from "react";
import {Modal, Button} from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";

/**
 * The dialog shown to the user when he wants close the graph.
 */
export default class extends React.Component {

    /**
     * @param {Object} props
     * The props to use.
     *
     * @param {Boolean} props.visible
     * Whether to show the dialog.
     */
    constructor(props) {
        super(props);
    }

    /**
     * Submits the dialog.
     */
    ok() {
        actions.removeTriples(this.props.triples);
        actions.setDialogVisibility("removeTriples", false);
    }

    /**
     * Closes the dialog.
     */
    cancel() {
        actions.setDialogVisibility("removeTriples", false);
    }

    numberOfTriples() {
        return this.props.triples.length;
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.cancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove triples</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Do you really want to remove the {this.numberOfTriples()} selected
                        triple{this.numberOfTriples() === 1 ? "" : "s"}?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.ok()}>OK</Button>
                    <Button onClick={() => this.cancel()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
