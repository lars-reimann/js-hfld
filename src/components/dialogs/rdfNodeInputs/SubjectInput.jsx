import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import BlankNodeInput from "./BlankNodeInput.jsx";
import NamedNodeInput from "./NamedNodeInput.jsx";

function nodeInput(node) {
    switch (node.interfaceName) {
    case "blankNode":console.log("blank")
        return (
            <BlankNodeInput
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
                    onChange={value => handleInterfaceNameChange(value)}>
                    <option value="blankNode">Blank Node</option>
                    <option value="literal">Literal</option>
                    <option value="namedNode">Named Node</option>
                </FormControl>
            </FormGroup>
            {nodeInput(node)}
        </div>
    );
}
