import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import BlankNodeInput from "./BlankNodeInput.jsx";
import LiteralInput   from "./LiteralInput.jsx";
import NamedNodeInput from "./NamedNodeInput.jsx";

function nodeInput(node) {
    switch (node.interfaceName) {
    case "BlankNode":
        return (
            <BlankNodeInput
                node={node}
            />
        );
    case "Literal":
        return (
            <LiteralInput
                node={node}
            />
        );
    case "NamedNode":
        return (
            <NamedNodeInput
                node={node}
            />
        );
    }
}

function handleInterfaceNameChange(interfaceName) {
    this.setState({ interfaceName });
}

export default function ({node, valid}) {
    const interfaceName = node.interfaceName;
    return (
        <div>
            <FormGroup controlId="interfaceName">
                <ControlLabel>Interface Name</ControlLabel>
                <FormControl
                    componentClass="select"
                    value={interfaceName}
                    onChange={value => this.handleInterfaceNameChange(value)}>
                    <option value="BlankNode">Blank Node</option>
                    <option value="Literal">Literal</option>
                    <option value="NamedNode">Named Node</option>
                </FormControl>
            </FormGroup>
            {nodeInput(node)}
        </div>
    );
}
