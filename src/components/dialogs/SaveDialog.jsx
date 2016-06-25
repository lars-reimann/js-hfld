import React    from "react";
import * as rbs from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationState} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants to save something.
 */
export default class extends React.Component {

    /**
     * @param {Object} props
     * The props to use.
     *
     * @param {Boolean} props.visible
     * Whether to show the dialog.
     *
     * @param {string} props.name
     * The name of the dialog.
     *
     * @param {string} props.title
     * The title to display.
     *
     * @param {string} props.data
     * The data to save.
     *
     * @param {string} props.filename
     * The suggested filename.
     *
     * @param {Function} props.save
     * The function that handles the saving.
     */
    constructor(props) {
        super(props);

        /**
         * The state of the dialog.
         *
         * @type {Object}
         * @private
         */
        this.state = {
            filename: this.props.filename,
        };
    }

    /**
     * Handles user input.
     *
     * @param {Event} e
     * The fired event.
     */
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    /**
     * Checks if the input is valid.
     *
     * @return {Boolean}
     * Whether the input are valid.
     */
    isValid() {
        return this.state.filename !== "";
    }

    /**
     * Submits the dialog.
     */
    ok() {
        this.props.save(this.props.data, this.state.filename);
        actions.setDialogVisibility(this.props.name, false);
    }

    /**
     * Closes the dialog.
     */
    close() {
        actions.setDialogVisibility(this.props.name, false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <rbs.Modal show={this.props.visible} onHide={() => this.close()}>
                <rbs.Modal.Header closeButton>
                    <rbs.Modal.Title>{this.props.title}</rbs.Modal.Title>
                </rbs.Modal.Header>
                <rbs.Modal.Body>
                    <form>
                        <rbs.FormGroup controlId="filename" validationState={getValidationState(this.isValid())}>
                            <rbs.ControlLabel>Filename:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="text"
                                value={this.state.filename}
                                placeholder="Enter a string..."
                                onChange={e => this.handleChange(e)}
                            />
                            <rbs.FormControl.Feedback />
                        </rbs.FormGroup>
                    </form>
                </rbs.Modal.Body>
                <rbs.Modal.Footer>
                    <rbs.Button onClick={() => this.ok()} disabled={!this.isValid()} bsStyle="primary">OK</rbs.Button>
                    <rbs.Button onClick={() => this.close()}>Cancel</rbs.Button>
                </rbs.Modal.Footer>
            </rbs.Modal>
        );
    }
}