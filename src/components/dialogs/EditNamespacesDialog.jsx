import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button, Tabs, Tab} from "react-bootstrap";

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
        actions.editNamespace(this.state.prefixToEdit, this.state.iriToEdit);
    }

    remove() {
        actions.enqueueAlert("success", "Removed a namespace.");
        actions.removeNamespace(this.state.prefixToEdit);
    }

    footer() {
        switch (this.state.activeTab) {
        case "add":
            return (
                <div>
                    <Button onClick={() => this.add()} bsStyle="primary" disabled={!this.stuffToAddIsValid()}>Add</Button>
                    <Button onClick={() => this.resetState()} bsStyle="danger">Reset Form</Button>
                </div>
            );
        case "update":
            return (
                <div>
                    <Button onClick={() => this.update()} bsStyle="primary" disabled={!this.stuffToUpdateIsValid()}>Update</Button>
                    <Button onClick={() => this.remove()} bsStyle="danger">Remove</Button>
                </div>
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
            <Modal show={this.props.visible} onHide={() => this.close()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Namespaces</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs activeKey={this.state.activeTab} onSelect={key => this.handleTabChange(key)} id="method">
                        <Tab eventKey="add" title="Add" style={style}>
                            <form>
                                <FormGroup controlId="prefixToAdd">
                                    <ControlLabel>Prefix:</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.prefixtoAdd}
                                        placeholder="Enter a string..."
                                        onChange={e => this.handleInputChange(e)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="iriToAdd" validationState={getValidationStyle(this.iriToAddIsValid())}>
                                    <ControlLabel>IRI:</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.iriToAdd}
                                        placeholder="Enter a string..."
                                        onChange={e => this.handleInputChange(e)}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </form>
                        </Tab>
                        <Tab eventKey="update" title="Update/Remove" style={style}>
                            <form>
                                <FormGroup controlId="selected">
                                    <ControlLabel>Selection:</ControlLabel>
                                    <FormControl
                                        componentClass="select"
                                        value={this.state.selected}
                                        onChange={e => this.handleSelectionChange(e)}>
                                        {this.options()}
                                    </FormControl>
                                </FormGroup>
                                { this.state.selected === undefined ? null :
                                    <div>
                                        <FormGroup controlId="prefixToEdit">
                                            <ControlLabel>Prefix</ControlLabel>
                                            <FormControl
                                                type="text"
                                                value={this.state.prefixToEdit}
                                                placeholder="Enter a string..."
                                                onChange={e => this.handleInputChange(e)}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="iriToEdit" validationState={getValidationStyle(this.iriToEditIsValid())}>
                                            <ControlLabel>IRI</ControlLabel>
                                            <FormControl
                                                type="text"
                                                value={this.state.iriToEdit}
                                                placeholder="Enter a string..."
                                                onChange={e => this.handleInputChange(e)}
                                            />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                    </div>
                                }
                            </form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    {this.footer()}
                </Modal.Footer>
            </Modal>
        );
    }
}