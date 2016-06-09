import React                                  from "react";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";

import {getValidationStyle} from "../../../utils/utils.js";

export default function ({node, handleChange}) {
    const iri = node.nominalValue;
    return (
        <FormGroup controlId="iri" validationStyle={getValidationStyle(iri !== "")}>
            <ControlLabel>IRI</ControlLabel>
            <FormControl
                type="text"
                value={iri}
                placeholder="Enter a string..."
                onChange={handleChange}
            />
            <FormControl.Feedback />
        </FormGroup>
    );
}