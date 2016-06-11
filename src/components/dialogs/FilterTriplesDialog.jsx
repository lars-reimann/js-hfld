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

        this.state = this.initialState(props);

        // TODO receive current filter as props
    }

    initialState(props) {
        return {
            subject: {
                value: props.filter.subject,
                valid: true,
            },
            predicate: {
                value: props.filter.predicate,
                valid: true,
            },
            object: {
                value: props.filter.object,
                valid: true,
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.initialState(nextProps));
    }

    handleRDFSubjectChange({node, valid}) {
        this.setState({
            subject: {
                value: node,
                valid
            }
        });
    }

    handleRDFPredicateChange({node, valid}) {
        this.setState({
            predicate: {
                value: node,
                valid
            }
        });
    }

    handleRDFObjectChange({node, valid}) {
        this.setState({
            object: {
                value: node,
                valid
            }
        });
    }

    handleStringChange(e) {
        this.setState({
            [e.target.id]: {
                value: e.target.value,
                valid: true,
            }
        });
    }

    getType(value) {
        if (value === false) {
            return "disabled";
        } else if (typeof value === "string") {
            return "string";
        } else if (value instanceof rdf.RDFNode) {
            return "rdfNode";
        } else {
            throw new Error(`Could not get the type of ${value}.`);
        }
    }

    handleTypeChange(field, type) {
        switch (type) {
        case "disabled":
            return this.setState({
                [field]: {
                    value: false,
                    valid: true,
                }
            });
        case "string":
            return this.setState({
                [field]: {
                    value: "",
                    valid: true,
                }
            });
        case "rdfNode":
            return this.setState({
                [field]: {
                    value: defaultNamedNode,
                    valid: false,
                }
            });
        }
    }

    /**
     * Checks if all entered values are valid.
     *
     * @return {Boolean}
     * Whether all values are valid.
     */
    isValid() {
        return this.state.subject.valid   &&
               this.state.predicate.valid &&
               this.state.object.valid;
    }

    /**
     * Closes the dialog.
     */
    close() {
        actions.setDialogVisibility("filterTriples", false);
    }

    filter() {
        actions.filterTriples({
            subject: this.state.subject.value,
            predicate: this.state.predicate.value,
            object: this.state.object.value,
        });
    }

    resetForm() {
        actions.clearTripleFilter();
    }

    subjectFilter() {
        switch (this.getType(this.state.subject.value)) {
        case "disabled":
            return null;
        case "string":
            return (
                <FormGroup controlId="subject">
                    <ControlLabel>Subject:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.subject.value}
                        onChange={e => this.handleStringChange(e)}>
                    </FormControl>
                </FormGroup>
            );
        case "rdfNode":
            return (
                <SubjectInput
                    node={this.state.subject.value}
                    valid={this.state.subject.valid}
                    handleChange={result => this.handleRDFSubjectChange(result)}
                />
            );
        }
    }

    predicateFilter() {
        switch (this.getType(this.state.predicate.value)) {
        case "disabled":
            return null;
        case "string":
            return (
                <FormGroup controlId="predicate">
                    <ControlLabel>Predicate:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.predicate.value}
                        onChange={e => this.handleStringChange(e)}>
                    </FormControl>
                </FormGroup>
            );
        case "rdfNode":
            return (
                <PredicateInput
                    node={this.state.predicate.value}
                    valid={this.state.predicate.valid}
                    handleChange={result => this.handleRDFPredicateChange(result)}
                />
            );
        }
    }

    objectFilter() {
        switch (this.getType(this.state.object.value)) {
        case "disabled":
            return null;
        case "string":
            return (
                <FormGroup controlId="object">
                    <ControlLabel>Object:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.object.value}
                        onChange={e => this.handleStringChange(e)}>
                    </FormControl>
                </FormGroup>
            );
        case "rdfNode":
            return (
                <ObjectInput
                    node={this.state.object.value}
                    valid={this.state.object.valid}
                    handleChange={result => this.handleRDFObjectChange(result)}
                />
            );
        }
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
                    <Modal.Title>Filter Triples</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <fieldset>
                            <legend>Subject</legend>
                            <FormGroup controlId="subjectType">
                                <ControlLabel>Subject Type:</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    value={this.getType(this.state.subject.value)}
                                    onChange={e => this.handleTypeChange("subject", e.target.value)}>
                                    <option value="disabled">Disabled</option>
                                    <option value="string">String</option>
                                    <option value="rdfNode">RDFNode</option>
                                </FormControl>
                            </FormGroup>
                            {this.subjectFilter()}
                        </fieldset>
                        <fieldset>
                            <legend>Predicate</legend>
                            <FormGroup controlId="predicateType">
                                <ControlLabel>Predicate Type:</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    value={this.getType(this.state.predicate.value)}
                                    onChange={e => this.handleTypeChange("predicate", e.target.value)}>
                                    <option value="disabled">Disabled</option>
                                    <option value="string">String</option>
                                    <option value="rdfNode">RDFNode</option>
                                </FormControl>
                            </FormGroup>
                            {this.predicateFilter()}
                        </fieldset>
                        <fieldset>
                            <legend>Object</legend>
                            <FormGroup controlId="objectType">
                                <ControlLabel>Object Type:</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    value={this.getType(this.state.object.value)}
                                    onChange={e => this.handleTypeChange("object", e.target.value)}>
                                    <option value="disabled">Disabled</option>
                                    <option value="string">String</option>
                                    <option value="rdfNode">RDFNode</option>
                                </FormControl>
                            </FormGroup>
                            {this.objectFilter()}
                        </fieldset>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.filter()} bsStyle="primary" disabled={!this.isValid()}>Filter</Button>
                    <Button onClick={() => this.resetForm()} bsStyle="danger">Clear Filter</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}