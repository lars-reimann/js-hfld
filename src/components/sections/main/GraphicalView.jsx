import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const draph = document.getElementById("draph");
        draph.appendChild(this.props.graphView.renderer.view);
        this.props.graphView.renderer.resize(
            draph.offsetWidth,
            draph.offsetHeight
        );
    }

    componentDidUpdate() {
        const draph = document.getElementById("draph");
        draph.innerHTML = "";
        draph.appendChild(this.props.graphView.renderer.view);
        this.props.graphView.renderer.resize(
            draph.offsetWidth,
            draph.offsetHeight
        );
    }

    componentWillUnmount() {
        document.getElementById("draph").innerHTML = "";
    }

    render() {
        return (
            <div id="draph"></div>
        );
    }
}
