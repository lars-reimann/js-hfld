import React    from "react";
import * as rbs from "react-bootstrap";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationState} from "../../utils/utils.js";

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
            activeTab: "add",
            prefixToAdd: "",
            iriToAdd: "",
            prefixToEdit: prefix,
            iriToEdit: selected === undefined ? "" : this.props.prefixes.resolve(prefix)
        };
    }

    componentWillReceiveProps(nextProps) {
        const selected = ([...nextProps.prefixes][0] || [])[0];
        const prefix   = selected === undefined ? "" : selected;
        this.setState({
            selected,
            prefixToAdd: "",
            iriToAdd: "",
            prefixToEdit: prefix,
            iriToEdit: selected === undefined ? "" : this.props.prefixes.resolve(prefix)
        });
    }

    handleSelectionChange(e) {
        const selected = e.target.value;
        const prefix   = selected === undefined ? "" : selected;
        this.setState({
            selected,
            prefixToEdit: prefix,
            iriToEdit:    selected === undefined ? "" : this.props.prefixes.resolve(prefix),
        });
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    stuffToAddIsValid() {
        return this.iriToAddIsValid();
    }

    stuffToUpdateIsValid() {
        return this.iriToEditIsValid();
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

    handleTabChange(key) {
        this.setState({
            activeTab: key
        });
    }

    close() {
        actions.setDialogVisibility("editNamespaces", false);
    }

    add() {
        actions.enqueueAlert("success", "Added a namespace.");
        actions.addNamespace(this.state.prefixToAdd, this.state.iriToAdd);
    }

    update() {
        actions.enqueueAlert("success", "Update a namespace.");
        actions.updateNamespace(this.state.selected, this.state.prefixToEdit, this.state.iriToEdit);
    }

    remove() {
        actions.enqueueAlert("success", "Removed a namespace.");
        actions.removeNamespace(this.state.prefixToEdit);
    }

    removeAll() {
        // TODO
    }

    resetToAddState() {
        // TODO
    }

    footer() {
        switch (this.state.activeTab) {
        case "add":
            return (
                <div>
                    <rbs.Button onClick={() => this.add()} bsStyle="primary" disabled={!this.stuffToAddIsValid()}>Add</rbs.Button>
                    <rbs.Button onClick={() => this.resetToAddState()} bsStyle="warning">Reset Form</rbs.Button>
                </div>
            );
        case "update":
            return (
                <div>
                    <rbs.Button onClick={() => this.update()} bsStyle="primary" disabled={!this.stuffToUpdateIsValid()}>Update</rbs.Button>
                    <rbs.Button onClick={() => this.remove()} bsStyle="danger">Remove</rbs.Button>
                </div>
            );
        case "remove":
            return (
                <rbs.Button onClick={() => this.removeAll()} bsStyle="danger">Remove All</rbs.Button>
            );
        }
    }

    iriToAddIsValid() {
        return validators.isNotEmpty(this.state.iriToAdd);
    }

    iriToEditIsValid() {
        return validators.isNotEmpty(this.state.iriToEdit);
    }

    /**
     * Renders this component.
     */
    render() {
        const style = {
            marginTop: 20
        };

        return (
            <rbs.Modal show={this.props.visible} onHide={() => this.close()}>
                <rbs.Modal.Header closeButton>
                    <rbs.Modal.Title>Edit Namespaces</rbs.Modal.Title>
                </rbs.Modal.Header>
                <rbs.Modal.Body>
                    <rbs.Tabs activeKey={this.state.activeTab} onSelect={key => this.handleTabChange(key)} id="method">
                        <rbs.Tab eventKey="add" title="Add" style={style}>
                            <form>
                                <rbs.FormGroup controlId="prefixToAdd">
                                    <rbs.ControlLabel>Prefix:</rbs.ControlLabel>
                                    <rbs.FormControl
                                        type="text"
                                        value={this.state.prefixtoAdd}
                                        placeholder="Enter a string..."
                                        onChange={e => this.handleInputChange(e)}
                                    />
                                </rbs.FormGroup>
                                <rbs.FormGroup controlId="iriToAdd" validationState={getValidationState(this.iriToAddIsValid())}>
                                    <rbs.ControlLabel>IRI:</rbs.ControlLabel>
                                    <rbs.FormControl
                                        type="text"
                                        value={this.state.iriToAdd}
                                        placeholder="Enter a string..."
                                        onChange={e => this.handleInputChange(e)}
                                    />
                                    <rbs.FormControl.Feedback />
                                </rbs.FormGroup>
                            </form>
                        </rbs.Tab>
                        <rbs.Tab eventKey="update" title="Update/Remove" style={style}>
                            <form>
                                <rbs.FormGroup controlId="selected">
                                    <rbs.ControlLabel>Selection:</rbs.ControlLabel>
                                    <rbs.FormControl
                                        componentClass="select"
                                        value={this.state.selected}
                                        onChange={e => this.handleSelectionChange(e)}>
                                        {this.options()}
                                    </rbs.FormControl>
                                </rbs.FormGroup>
                                { this.state.selected === undefined ? null :
                                    <div>
                                        <rbs.FormGroup controlId="prefixToEdit">
                                            <rbs.ControlLabel>Prefix</rbs.ControlLabel>
                                            <rbs.FormControl
                                                type="text"
                                                value={this.state.prefixToEdit}
                                                placeholder="Enter a string..."
                                                onChange={e => this.handleInputChange(e)}
                                            />
                                        </rbs.FormGroup>
                                        <rbs.FormGroup controlId="iriToEdit" validationState={getValidationState(this.iriToEditIsValid())}>
                                            <rbs.ControlLabel>IRI</rbs.ControlLabel>
                                            <rbs.FormControl
                                                type="text"
                                                value={this.state.iriToEdit}
                                                placeholder="Enter a string..."
                                                onChange={e => this.handleInputChange(e)}
                                            />
                                            <rbs.FormControl.Feedback />
                                        </rbs.FormGroup>
                                    </div>
                                }
                            </form>
                        </rbs.Tab>
                        <rbs.Tab eventKey="remove" title="Remove All">

                        </rbs.Tab>
                    </rbs.Tabs>
                </rbs.Modal.Body>
                <rbs.Modal.Footer>
                    {this.footer()}
                </rbs.Modal.Footer>
            </rbs.Modal>
        );
    }
}