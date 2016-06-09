import React                                            from "react";
import {FormGroup, ControlLabel, FormControl, Checkbox} from "react-bootstrap";

import {xmlSchemaTypes as xsd} from "@ignavia/rdf";

import {getValidationStyle} from "../../utils/utils.js";

const langString = "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString";

function getValueInputType(datatype) {
    switch (datatype) {
    case langString:
    case xsd.string:
        return "text";
    case xsd.dateTime:
        return "dateTime";
    case xsd.date:
        return "date";
    case xsd.time:
        return "time";
    default:
        return "number";
    }
}

function valueInput(value, datatype, handleChange) {
    if (datatype === xsd.boolean) {
        return (
            <Checkbox
                checked={value === "true"}
                onChange={handleChange}>
                Enabled
            </Checkbox>
        );
    } else {
        return (
             <FormControl
                type={getValueInputType(datatype)}
                value={value}
                placeholder="Enter a string..."
                onChange={handleChange}
            />
        );
    }
}

export default function ({node, handleChange}) {
    const value    = node.nominalValue;
    const language = node.language;
    const datatype = node.datatype;
    return (
        <div>
            <FormGroup controlId="value" validationStyle={getValidationStyle(value !== "")}>
                <ControlLabel>Value</ControlLabel>
                {valueInput()}
                <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="datatype">
                <ControlLabel>Datatype</ControlLabel>
                <FormControl
                    componentClass="select"
                    value={datatype}
                    onChange={handleChange}>
                    <option value={langString}>Language String</option>
                    <option value={xsd.string}>String</option>
                    <option value={xsd.boolean}>Boolean</option>
                    <option value={xsd.dateTime}>Date + Time</option>
                    <option value={xsd.date}>Data</option>
                    <option value={xsd.time} disabled>Time</option>
                    <option value={xsd.double}>Double</option>
                    <option value={xsd.float}>Float</option>
                    <option value={xsd.decimal}>Decimal</option>
                    <option value={xsd.positiveInteger}>Positive Integer</option>
                    <option value={xsd.nonNegativeInteger}>Non-negative Integer</option>
                    <option value={xsd.integer}>Integer</option>
                    <option value={xsd.nonPositiveInteger}>Non-positive Integer</option>
                    <option value={xsd.negativeInteger}>Negative Integer</option>
                    <option value={xsd.long}>Long</option>
                    <option value={xsd.int}>Int</option>
                    <option value={xsd.short}>Short</option>
                    <option value={xsd.byte}>Byte</option>
                    <option value={xsd.unsignedLong}>Unsigned Long</option>
                    <option value={xsd.unsignedInt}>Unsigned Int</option>
                    <option value={xsd.unsignedShort}>Unsigned Short</option>
                    <option value={xsd.unsignedByte}>Unsigned Byte</option>
                </FormControl>
            </FormGroup>
            <FormGroup controlId="language">
                <ControlLabel>Language</ControlLabel>
                <FormControl
                    type="text"
                    value={language}
                    placeholder="Enter a string..."
                    onChange={handleChange}
                />
            </FormGroup>
        </div>
    );
}