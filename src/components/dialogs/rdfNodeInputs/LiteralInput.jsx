import React                                            from "react";
import {FormGroup, ControlLabel, FormControl, Checkbox} from "react-bootstrap";

import {xmlSchemaTypes as xsd, Literal} from "@ignavia/rdf";

import {getValidationState, validators} from "../../../utils/utils.js";

const langString = "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString";

function standardInput(node, handleChange, type, placeholder, validator) {
    return (
        <FormControl
            type={type}
            value={node.nominalValue}
            placeholder={placeholder}
            onChange={e => onValueChange(
                e.target.value,
                validator,
                node,
                handleChange
            )}
        />
    );
}

function stringInput(node, handleChange) {
    return standardInput(node, handleChange,
        "text",
        "Enter a string...",
        validators.isNotEmpty
    );
}

function dateTimeInput(node, handleChange) {
    return standardInput(node, handleChange,
        "datetime",
        "Enter a date and time...",
        validators.isDateTime
    );
}

function dateInput(node, handleChange) {
    return standardInput(node, handleChange,
        "date",
        "Enter a date...",
        validators.isDate
    );
}

function timeInput(node, handleChange) {
    return standardInput(node, handleChange,
        "time",
        "Enter a time...",
        validators.isTime
    );
}

function booleanInput(node, handleChange) {
    return (
        <Checkbox
            checked={node.nominalValue === "true"}
            onChange={e => onValueChange(
                invertBooleanString(node.nominalValue),
                validators.isBoolean,
                node,
                handleChange
            )}>
            Enabled
        </Checkbox>
    );
}

function invertBooleanString(s) {
    return s === "true" ? "false" : "true";
}

function numberInput(node, handleChange) {
    return standardInput(node, handleChange,
        "number",
        "Enter a number...",
        validators.isNumber
    );
}

function valueInput(node, handleChange) {
    switch (node.datatype) {
    case langString:
    case xsd.string:
        return stringInput(node, handleChange);
    case xsd.boolean:
        return booleanInput(node, handleChange);
    case xsd.dateTime:
        return dateTimeInput(node, handleChange);
    case xsd.date:
        return dateInput(node, handleChange);
    case xsd.time:
        return timeInput(node, handleChange);
    case xsd.decimal:
        return numberInput(node, handleChange);
    }
}

function onValueChange(value, validator, node, handleChange) {
    const newNode = new Literal(
        value,
        {
            datatype: node.datatype,
            language: node.language,
        }
    );
    handleChange({
        node: newNode,
        valid: validator(value),
    });
}

function validate(node) {
    switch (node.datatype) {
    case langString:
    case xsd.string:
        return validators.isNotEmpty(node.nominalValue);
    case xsd.boolean:
        return validators.isBoolean(node.nominalValue);
    case xsd.dateTime:
        return validators.isDateTime(node.nominalValue);
    case xsd.date:
        return validators.isDate(node.nominalValue);
    case xsd.time:
        return validators.isTime(node.nominalValue);
    case xsd.decimal:
        return validators.isNumber(node.nominalValue);
    }
}

function onDatatypeChange(datatype, node, handleChange) {
    const newNode = new Literal(
        datatype === xsd.boolean ? "false" : "",
        {
            datatype,
            language: node.language,
        }
    );

    handleChange({
        node: newNode,
        valid: validate(newNode),
    });
}

function onLanguageChange(language, node, handleChange) {
    const datatype = node.datatype === langString && !language ?
        xsd.string : node.datatype;
    language = language === "" ? undefined : language;
    const newNode = new Literal(
        node.nominalValue,
        {
            datatype,
            language: language,
        }
    );
    handleChange({
        node: newNode,
        valid: true
    });
}

export default function ({node, valid, handleChange}) {
    return (
        <div>
            <FormGroup controlId="datatype">
                <ControlLabel>Datatype</ControlLabel>
                <FormControl
                    componentClass="select"
                    value={node.datatype}
                    onChange={e => onDatatypeChange(e.target.value, node, handleChange)}
                    disabled={node.language}>
                    <option value={xsd.string}>String</option>
                    <option value={xsd.decimal}>Number</option>
                    <option value={xsd.boolean}>Boolean</option>
                    <option value={xsd.dateTime}>Date + Time</option>
                    <option value={xsd.date}>Date</option>
                    <option value={xsd.time} >Time</option>
                    <option value={langString} disabled>Language String</option>
                </FormControl>
            </FormGroup>
            <FormGroup controlId="value" validationState={getValidationState(valid)}>
                <ControlLabel>Value</ControlLabel>
                {valueInput(node, handleChange)}
                <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="language">
                <ControlLabel>Language</ControlLabel>
                <FormControl
                    type="text"
                    value={node.language}
                    placeholder="Enter a string..."
                    onChange={e => onLanguageChange(e.target.value, node, handleChange)}
                />
            </FormGroup>
        </div>
    );
}