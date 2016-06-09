import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import BlankNodeInput from "./BlankNodeInput.jsx";
import LiteralInput   from "./LiteralInput.jsx";
import NamedNodeInput from "./NamedNodeInput.jsx";

function nodeInput(node) {
    switch (node.interfaceName) {
    case "blankNode":
        return (
            <BlankNodeInput
                node={node}
            />
        );
    case "literal":
        return (
            <LiteralInput
                node={node}
            />
        );
    case "namedNode":
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

export default function ({node}) {
    const interfaceName = node.interfaceName;
    return (
        <div>
            <FormGroup controlId="interfaceName">
                <ControlLabel>Interface Name</ControlLabel>
                <FormControl
                    componentClass="select"
                    value={interfaceName}
                    onChange={value => this.handleInterfaceNameChange(value)}>
                    <option value="blankNode">Language String</option>
                    <option value="literal">String</option>
                    <option value="namedNode">Boolean</option>
                </FormControl>
            </FormGroup>
            {nodeInput(node)}
        </div>
    );
}
