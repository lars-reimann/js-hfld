import React from "react";
import $     from "jquery";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    resize() {
        this.props.graphView.resize(
            this.$draph[0].offsetWidth,
            innerHeight - 71
        );
    }

    componentDidMount() {
        this.$draph = $("#draph");
        $(window).on("resize", () => this.resize());

        this.updateRendererView();
    }

    componentDidUpdate() {
        this.updateRendererView();
    }

    updateRendererView() {
        this.resize();
        this.$draph.append(this.props.graphView.getView());
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
        this.$draph.html("");
    }

    render() {
        return (
            <div id="draph"></div>
        );
    }
}
