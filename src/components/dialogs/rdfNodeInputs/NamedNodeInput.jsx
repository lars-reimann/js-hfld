import React                                  from "react";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";

import {NamedNode} from "@ignavia/rdf";

import {getValidationState} from "../../../utils/utils.js";

function onChange(value, handleChange) {
    const node = new NamedNode(value);
    const valid = value !== "";
    handleChange({node, valid});
}

export default function ({node, valid, handleChange}) {
    return (
        <FormGroup controlId="iri" validationState={getValidationState(valid)}>
            <ControlLabel>IRI</ControlLabel>
            <FormControl
                type="text"
                value={node.nominalValue}
                placeholder="Enter a string..."
                onChange={e => onChange(e.target.value, handleChange)}
            />
            <FormControl.Feedback />
        </FormGroup>
    );
}