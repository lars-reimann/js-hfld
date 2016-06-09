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

        this.state = {
            prefix: ([...props.prefixes][0] || [])[0],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            prefix: ([...nextProps.prefixes][0] || [])[0],
        });
    }

    /**
     * Submits the dialog.
     */
    ok() {
        actions.enqueueAlert("success", "Removed a namespace.");
        actions.removeNamespace(this.state.prefix);
    }

    /**
     * Closes the dialog.
     */
    close() {
        actions.setDialogVisibility("removeNamespaces", false);
    }

    handleSelection(e) {
        this.setState({
            prefix: e.target.value
        });
    }

    options(prefixes) {
        return [...prefixes]
            .map(([prefix, iri]) => (
                <option key={prefix} value={prefix}>{prefix} => {iri}</option>
            ));
    }

    /**
     * Renders this component.
     */
    render() {
        const prefix = this.state.prefix;
        const iri    = prefix === undefined ? undefined : this.props.prefixes.resolve(prefix);
        return (
            <Modal show={this.props.visible} onHide={() => this.close()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Namespaces</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="prefix">
                            <ControlLabel>Prefix:</ControlLabel>
                            <FormControl
                                componentClass="select"
                                value={this.state.prefix}
                                onChange={e => this.handleSelection(e)}>
                                {this.options(this.props.prefixes)}
                            </FormControl>
                        </FormGroup>
                    </form>
                    { !iri ? null :
                        <div>
                            <p>You are about to delete this mapping:</p>
                            <p>{prefix} => {iri}</p>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.ok()} bsStyle="danger">Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}