import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const draph = document.getElementById("draph");
        draph.appendChild(this.props.graphView.renderer.view);
        this.props.graphView.resize(
            draph.offsetWidth,
            draph.offsetHeight
        );
        this.props.graphView.startRenderLoop(); // call in constructor
    }

    componentWillUpdate() {
        this.props.graphView.stopRenderLoop();
        document.getElementById("draph").innerHTML = "";
    }

    componentDidUpdate() {
        const draph = document.getElementById("draph");
        draph.innerHTML = "";
        draph.appendChild(this.props.graphView.renderer.view);
        this.props.graphView.resize(
            draph.offsetWidth,
            draph.offsetHeight
        );
        this.props.graphView.startRenderLoop();
    }

    componentWillUnmount() {
        this.props.graphView.stopRenderLoop();
        document.getElementById("draph").innerHTML = "";
    }

    render() {
        return (
            <div id="draph"></div>
        );
    }
}
