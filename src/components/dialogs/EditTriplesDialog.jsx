import React                                                                          from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button, Tooltip, OverlayTrigger, Tabs, Tab} from "react-bootstrap";

import {ObjectInput, PredicateInput, SubjectInput} from "./rdfNodeInputs/rdfNodeInputs.js";

import * as rdf from "@ignavia/rdf";

import * as actions                     from "../../actions/actions.js";
import {validators, getValidationStyle} from "../../utils/utils.js";

const defaultBlankNode = new rdf.BlankNode("");
const defaultLiteral   = new rdf.Literal("");
const defaultNamedNode = new rdf.NamedNode("");

/**
 * The dialog shown to the user when he wants to create an Eades-Layout.
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

        const selected = this.props.triples[0];

        this.state = {
            activeTab:                "add",

            subjectToAdd:             defaultNamedNode,
            subjectToAddIsValid:      false,
            predicateToAdd:           defaultNamedNode,
            predicateToAddIsValid:    false,
            objectToAdd:              defaultNamedNode,
            objectToAddIsValid:       false,

            tripleToUpdate:           selected ? selected.id : undefined,
            subjectToUpdate:          selected ? selected.subject : "",
            subjectToUpdateIsValid:   selected ? true : false,
            predicateToUpdate:        selected ? selected.predicate : "",
            predicateToUpdateIsValid: selected ? true : false,
            objectToUpdate:           selected ? selected.object : "",
            objectToUpdateIsValid:    selected ? true : false,
        };
    }

    getInitialToAddState() {
        return {
            subjectToAdd:             defaultNamedNode,
            subjectToAddIsValid:      false,
            predicateToAdd:           defaultNamedNode,
            predicateToAddIsValid:    false,
            objectToAdd:              defaultNamedNode,
            objectToAddIsValid:       false,
        };
    }

    getToUpdateState(selected) {
        return {
            tripleToUpdate:           selected ? selected.id : undefined,
            subjectToUpdate:          selected ? selected.subject : "",
            subjectToUpdateIsValid:   selected ? true : false,
            predicateToUpdate:        selected ? selected.predicate : "",
            predicateToUpdateIsValid: selected ? true : false,
            objectToUpdate:           selected ? selected.object : "",
            objectToUpdateIsValid:    selected ? true : false,
        };
    }

    resetToAddState() {
        this.setState(this.getInitialToAddState());
    }

    handleToAddSubjectChange({node, valid}) {
        this.setState({
            subjectToAdd:        node,
            subjectToAddIsValid: valid,
        });
    }

    handleToAddPredicateChange({node, valid}) {
        this.setState({
            predicateToAdd:        node,
            predicateToAddIsValid: valid,
        });
    }

    handleToAddObjectChange({node, valid}) {
        this.setState({
            objectToAdd:        node,
            objectToAddIsValid: valid,
        });
    }

    handleToUpdateSubjectChange({node, valid}) {
        this.setState({
            subjectToUpdate:        node,
            subjectToUpdateIsValid: valid,
        });
    }

    handleToUpdatePredicateChange({node, valid}) {
        this.setState({
            predicateToUpdate:        node,
            predicateToUpdateIsValid: valid,
        });
    }

    handleToUpdateObjectChange({node, valid}) {
        this.setState({
            objectToUpdate:        node,
            objectToUpdateIsValid: valid,
        });
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    toAddIsValid() {
        return this.state.subjectToAddIsValid   &&
               this.state.predicateToAddIsValid &&
               this.state.objectToAddIsValid;
    }

    toUpdateIsValid() {
        return this.state.subjectToUpdateIsValid   &&
               this.state.predicateToUpdateIsValid &&
               this.state.objectToUpdateIsValid;
    }

    /**
     * Submits the dialog.
     */
    add() {
        const triple = new rdf.Triple(
            this.state.subjectToAdd,
            this.state.predicateToAdd,
            this.state.objectToAdd
        );
        actions.enqueueAlert("success", "Added a triple.");
        actions.addTriple(triple);
    }

    /**
     * Closes the dialog.
     */
    close() {
        actions.setDialogVisibility("editTriples", false);
    }

    handleTabChange(key) {
        this.setState({
            activeTab: key
        });
    }

    update() {
        const oldTriple = this.props.rdf.getGraph().getTripleById(this.state.tripleToUpdate);
        const newTriple = new rdf.Triple(
            this.state.subjectToUpdate,
            this.state.predicateToUpdate,
            this.state.objectToUpdate
        );

        this.setState(this.getToUpdateState(this.props.triples[0]));

        actions.enqueueAlert("success", "Updated the selected triple.");
        actions.updateTriple(oldTriple, newTriple, true);
    }

    remove() {
        const triple = this.props.rdf.getGraph().getTripleById(this.state.tripleToUpdate);

        actions.enqueueAlert("success", "Removed the selected triple.");
        actions.removeTriples([triple]);
    }

    removeAll() {
        actions.enqueueAlert("success", "Removed all selected triples.");
        actions.removeTriples(this.props.triples);
    }

    footer() {
        switch (this.state.activeTab) {
        case "add":
            return (
                <div>
                    <Button onClick={() => this.add()} bsStyle="primary" disabled={!this.toAddIsValid()}>Add</Button>
                    <Button onClick={() => this.resetToAddState()} bsStyle="danger">Reset Form</Button>
                </div>
            );
        case "update":
            return (
                <div>
                    <Button onClick={() => this.update()} bsStyle="primary" disabled={!this.toUpdateIsValid()}>Update</Button>
                    <Button onClick={() => this.remove()} bsStyle="danger">Remove</Button>
                </div>
            );
        case "remove":
            return (
                <div>
                    <Button onClick={() => this.removeAll()} bsStyle="danger">Remove All</Button>
                </div>
            );
        }
    }

    tripleToString(triple) {
        return this.props.rdf.nodeToString(triple.subject)   + " -> " +
               this.props.rdf.nodeToString(triple.predicate) + " -> " +
               this.props.rdf.nodeToString(triple.object);
    }

    numberOfTriples() {
        return this.props.triples.length;
    }

    options() {
        return [...this.props.triples]
            .map(triple => (
                <option key={triple.id} value={triple.id}>{this.tripleToString(triple)}</option>
            ));
    }

    handleTripleToUpdateChange(e) {
        const selected = this.props.rdf.getGraph().getTripleById(e.target.value);
        this.setState(this.getToUpdateState(selected));
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
                    <Modal.Title>Edit Triples</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs activeKey={this.state.activeTab} onSelect={key => this.handleTabChange(key)} id="method">
                        <Tab eventKey="add" title="Add" style={style}>
                            <form>
                                <fieldset>
                                    <legend>Subject</legend>
                                    <SubjectInput
                                        node={this.state.subjectToAdd}
                                        valid={this.state.subjectToAddIsValid}
                                        handleChange={result => this.handleToAddSubjectChange(result)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Predicate</legend>
                                    <PredicateInput
                                        node={this.state.predicateToAdd}
                                        valid={this.state.predicateToAddIsValid}
                                        handleChange={result => this.handleToAddPredicateChange(result)} />
                                </fieldset>
                                <fieldset>
                                    <legend>Object</legend>
                                    <ObjectInput
                                        node={this.state.objectToAdd}
                                        valid={this.state.objectToAddIsValid}
                                        handleChange={result => this.handleToAddObjectChange(result)} />
                                </fieldset>
                            </form>
                        </Tab>
                        <Tab eventKey="update" title="Update" style={style} disabled={this.props.triples.length === 0}>
                            <form>
                                <FormGroup controlId="tripleToUpdate">
                                    <ControlLabel>Selection:</ControlLabel>
                                    <FormControl
                                        componentClass="select"
                                        value={this.state.tripleToUpdate}
                                        onChange={e => this.handleTripleToUpdateChange(e)}>
                                        {this.options()}
                                    </FormControl>
                                </FormGroup>
                                { this.state.tripleToUpdate === undefined ? null :
                                    <div>
                                        <fieldset>
                                            <legend>Subject</legend>
                                            <SubjectInput
                                                node={this.state.subjectToUpdate}
                                                valid={this.state.subjectToUpdateIsValid}
                                                handleChange={result => this.handleToUpdateSubjectChange(result)}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Predicate</legend>
                                            <PredicateInput
                                                node={this.state.predicateToUpdate}
                                                valid={this.state.predicateToUpdateIsValid}
                                                handleChange={result => this.handleToUpdatePredicateChange(result)} />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Object</legend>
                                            <ObjectInput
                                                node={this.state.objectToUpdate}
                                                valid={this.state.objectToUpdateIsValid}
                                                handleChange={result => this.handleToUpdateObjectChange(result)} />
                                        </fieldset>
                                    </div>
                                }
                            </form>
                        </Tab>
                        <Tab eventKey="remove" title="Remove" style={style} disabled={this.props.triples.length === 0}>
                            <p>
                                Do you really want to remove the {this.numberOfTriples()} selected
                                triple{this.numberOfTriples() === 1 ? "" : "s"}?
                            </p>
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