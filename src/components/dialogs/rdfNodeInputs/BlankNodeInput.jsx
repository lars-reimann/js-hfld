import React                                  from "react";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";

import {BlankNode} from "@ignavia/rdf";

import {getValidationStyle} from "../../../utils/utils.js";

function onChange(value, handleChange) {
    const node = new BlankNode(value);
    const valid = value !== "";
    handleChange({node, value});
}

export default function ({node, valid, handleChange}) {
    const tempName = node.nominalValue;
    return (
        <FormGroup controlId="tempName" validationStyle={getValidationStyle(valid)}>
            <ControlLabel>Temporary Name</ControlLabel>
            <FormControl
                type="text"
                value={tempName}
                placeholder="Enter a string..."
                onChange={e => onChange(e.target.value, handleChange)}
            />
            <FormControl.Feedback />
        </FormGroup>
    );
}