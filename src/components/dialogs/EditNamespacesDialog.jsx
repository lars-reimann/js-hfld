import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

/**
 * The dialog shown to the user when he wants to rotate the layout.
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

        const selected = ([...props.prefixes][0] || [])[0];
        const prefix   = selected === undefined ? "" : selected;
        this.state = {
            selected,
            prefix,
            iri: selected === undefined ? "" : this.props.prefixes.resolve(prefix),
        };
    }

    componentWillReceiveProps(nextProps) {
        const selected = ([...nextProps.prefixes][0] || [])[0];
        const prefix   = selected === undefined ? "" : selected;
        this.setState({
            selected,
            prefix,
            iri:    selected === undefined ? "" : this.props.prefixes.resolve(prefix),
        });
    }

    /**
     * Submits the dialog.
     */
    save() {
        actions.enqueueAlert("success", "Edited a namespace.");
        actions.editNamespace(this.state.prefix, this.state.iri);
    }

    /**
     * Closes the dialog.
     */
    close() {
        actions.setDialogVisibility("editNamespaces", false);
    }

    handleSelection(e) {
        const selected = e.target.value;
        const prefix   = selected === undefined ? "" : selected;
        this.setState({
            selected,
            prefix,
            iri:    selected === undefined ? "" : this.props.prefixes.resolve(prefix),
        });
    }

    /**
     * Checks if the entered y-coordinate is valid.
     *
     * @return {Boolean}
     * Whether the y-coordinate is valid.
     */
    iriIsValid() {
        return validators.isNotEmpty(this.state.iri);
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    isValid() {
        return this.iriIsValid();
    }

    options() {
        return [...this.props.prefixes]
            .map(([prefix, iri]) => (
                <option key={prefix} value={prefix}>{prefix} => {iri}</option>
            ));
    }

    handleInputChange(e) {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.close()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Namespaces</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="selected">
                            <ControlLabel>Selection:</ControlLabel>
                            <FormControl
                                componentClass="select"
                                value={this.state.selected}
                                onChange={e => this.handleSelection(e)}>
                                {this.options()}
                            </FormControl>
                        </FormGroup>
                        { this.state.selected === undefined ? null :
                            <div>
                                <FormGroup controlId="prefix">
                                    <ControlLabel>Prefix</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.prefix}
                                        placeholder="Enter a string..."
                                        onChange={e => this.handleInputChange(e)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="iri" validationState={getValidationStyle(this.iriIsValid())}>
                                    <ControlLabel>IRI</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.iri}
                                        placeholder="Enter a string..."
                                        onChange={e => this.handleInputChange(e)}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </div>
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.save()} disabled={!this.isValid()}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}