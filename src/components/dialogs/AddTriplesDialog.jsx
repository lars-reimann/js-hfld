import React                                                                          from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button, Tooltip, OverlayTrigger} from "react-bootstrap";

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

        this.state = {
            subject:          defaultNamedNode,
            subjectIsValid:   false,
            predicate:        defaultNamedNode,
            predicateIsValid: false,
            object:           defaultNamedNode,
            objectIsValid:    false,
        };
    }

    resetState() {
        this.setState({
            subject:          defaultNamedNode,
            subjectIsValid:   false,
            predicate:        defaultNamedNode,
            predicateIsValid: false,
            object:           defaultNamedNode,
            objectIsValid:    false,
        });
    }

    handleSubjectChange({node, valid}) {
        this.setState({
            subject:        node,
            subjectIsValid: valid,
        });
    }

    handlePredicateChange({node, valid}) {
        this.setState({
            predicate:        node,
            predicateIsValid: valid,
        });
    }

    handleObjectChange({node, valid}) {
        this.setState({
            object:        node,
            objectIsValid: valid,
        });
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    isValid() {
        return this.state.subjectIsValid   &&
               this.state.predicateIsValid &&
               this.state.objectIsValid;
    }

    /**
     * Submits the dialog.
     */
    save() {
        const triple = new rdf.Triple(
            this.state.subject,
            this.state.predicate,
            this.state.object
        );
        actions.enqueueAlert("success", "Added a triple.");
        actions.addTriple(triple);
    }

    /**
     * Closes the dialog.
     */
    close() {
        actions.setDialogVisibility("addTriples", false);
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Modal show={this.props.visible} onHide={() => this.close()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Triples</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <fieldset>
                            <legend>Subject</legend>
                            <SubjectInput
                                node={this.state.subject}
                                valid={this.state.subjectIsValid}
                                handleChange={result => this.handleSubjectChange(result)}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>Predicate</legend>
                            <PredicateInput
                                node={this.state.predicate}
                                valid={this.state.predicateIsValid}
                                handleChange={result => this.handlePredicateChange(result)} />
                        </fieldset>
                        <fieldset>
                            <legend>Object</legend>
                            <ObjectInput
                                node={this.state.object}
                                valid={this.state.objectIsValid}
                                handleChange={result => this.handleObjectChange(result)} />
                        </fieldset>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.save()} bsStyle="primary" disabled={!this.isValid()}>Save</Button>
                    <Button onClick={() => this.resetState()} bsStyle="danger">Reset Form</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}