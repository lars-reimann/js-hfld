import React from "react";
import $     from "jquery";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    resize() {
        this.props.graphView.resize(
            this.$draph.offsetWidth,
            innerHeight - 71
        );
    }

    componentDidMount() {
        this.$draph = document.getElementById("draph");
        $(window).on("resize", () => this.resize());

        this.updateRendererView();
    }

    componentDidUpdate() {
        this.updateRendererView();
    }

    updateRendererView() {
        this.resize();
        this.$draph.appendChild(this.props.graphView.getView());
        this.props.graphView.startRenderLoop();
    }

    componentWillUpdate() {
        this.reset();
    }

    componentWillUnmount() {
        $(window).off("resize");
        this.reset();
    }

    reset() {
        this.props.graphView.stopRenderLoop();
        draph.innerHTML = "";
    }

    render() {
        return (
            <div id="draph"></div>
        );
    }
}
