import React from "react";

import {TurtleWriter} from "@ignavia/rdf";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.writer = new TurtleWriter();
    }

    render() {
        return (
            <div>
                {this.writer.serialize(this.props.rdf.graph)}
            </div>
        );
    }
}