import React                                  from "react";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";

import {getValidationStyle} from "../../../utils/utils.js";

export default function ({node, handleChange}) {
    const tempName = node.nominalValue;
    return (
        <FormGroup controlId="tempName" validationStyle={getValidationStyle(tempName !== "")}>
            <ControlLabel>Temporary Name</ControlLabel>
            <FormControl
                type="text"
                value={tempName}
                placeholder="Enter a string..."
                onChange={handleChange}
            />
            <FormControl.Feedback />
        </FormGroup>
    );
}