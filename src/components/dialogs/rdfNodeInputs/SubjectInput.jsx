import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import * as rdf from "@ignavia/rdf";

import BlankNodeInput from "./BlankNodeInput.jsx";
import NamedNodeInput from "./NamedNodeInput.jsx";

const defaultBlankNode = new rdf.BlankNode("");
const defaultNamedNode = new rdf.NamedNode("");

function nodeInput(node, valid, handleChange) {
    const props = {node, valid, handleChange};
    switch (node.interfaceName) {
    case "BlankNode":
        return <BlankNodeInput {...props} />;
    case "NamedNode":
        return <NamedNodeInput {...props} />;
    }
}

function handleInterfaceChange(interfaceName, handleChange) {
    switch (interfaceName) {
    case "BlankNode":
        return handleChange({
            node:  defaultBlankNode,
            valid: false
        });
    case "NamedNode":
        return handleChange({
            node:  defaultNamedNode,
            valid: false
        });
    }
}

export default function ({node, valid, handleChange}) {
    return (
        <div>
            <FormGroup controlId="interfaceName">
                <ControlLabel>Interface Name</ControlLabel>
                <FormControl
                    componentClass="select"
                    value={node.interfaceName}
                    onChange={e => handleInterfaceChange(e.target.value, handleChange)}>
                    <option value="BlankNode">Blank Node</option>
                    <option value="NamedNode">Named Node</option>
                </FormControl>
            </FormGroup>
            {nodeInput(node, valid, handleChange)}
        </div>
    );
}
