import React                                  from "react";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";

import {NamedNode} from "@ignavia/rdf";

import {getValidationStyle} from "../../../utils/utils.js";

function onChange(value, handleChange) {
    const node = new NamedNode(value);
    const valid = value !== "";
    handleChange({node, value});
}

export default function ({node, valid, handleChange}) {
    return (
        <FormGroup controlId="iri" validationStyle={getValidationStyle(valid)}>
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