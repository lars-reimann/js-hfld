import React from "react";

import GraphicalView from "./GraphicalView.jsx";
import SourceView    from "./SourceView.jsx";
import TableView     from "./TableView.jsx";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SourceView />
        );
    }
}