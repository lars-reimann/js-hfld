import React                                                 from "react";
import {Modal, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import BlankNodeInput from "./BlankNodeInput.jsx";
import NamedNodeInput from "./NamedNodeInput.jsx";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            interfaceName: "literal"
        };
    }

    nodeInput() {
        switch (this.state.interfaceName) {
        case "blankNode":
            return (
                <BlankNodeInput
                    node={this.props.node}
                />
            );
        case "namedNode":
            return (
                <NamedNodeInput
                    node={this.props.node}
                />
            );
        }
    }

    handleInterfaceNameChange(interfaceName) {
        this.setState({ interfaceName });
    }

    render () {
        return (
            <div>
                <FormGroup controlId="interfaceName">
                    <ControlLabel>Interface Name</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={this.state.interfaceName}
                        onChange={value => this.handlvalueInterfaceNameChange(value)}>
                        <option value="blankNode">Language String</option>
                        <option value="literal">String</option>
                        <option value="namedNode">Boolean</option>
                    </FormControl>
                </FormGroup>
                {this.nodeInput()}
            </div>
        );
    }
}