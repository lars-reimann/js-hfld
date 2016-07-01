import React    from "react";
import * as rbs from "react-bootstrap";

import * as actions from "../../actions/actions.js";

/**
 * Toggles whether edge arrows should be scaled.
 *
 * @param {Object} props
 * The current props.
 *
 * @ignore
 */
function toggleScaleEdgeArrows(props) {
    actions.setScaleEdgeArrows(!props.config.scaleEdgeArrows);
}

/**
 * Toggles whether edge decals should be scaled.
 *
 * @param {Object} props
 * The current props.
 *
 * @ignore
 */
function toggleScaleEdgeDecals(props) {
    actions.setScaleEdgeDecals(!props.config.scaleEdgeDecals);
}

/**
 * Toggles whether nodes should be scaled.
 *
 * @param {Object} props
 * The current props.
 *
 * @ignore
 */
function toggleScaleNodes(props) {
    actions.setScaleNodes(!props.config.scaleNodes);
}

/**
 * Closes the dialog.
 *
 * @ignore
 */
function close() {
    actions.setDialogVisibility("draph", false);
}

/**
 * Renders this component.
 *
 * @param {Object} props
 * The props to use.
 *
 * @param {Object} props.visible
 * Whether to show the dialog.
 *
 * @param {Object} props.config
 * The configuration of the application.
 */
export default function (props) {
    return (
        <rbs.Modal show={props.visible} onHide={close}>
            <rbs.Modal.Header closeButton>
                <rbs.Modal.Title>Configure Graphical View</rbs.Modal.Title>
            </rbs.Modal.Header>
            <rbs.Modal.Body>
                <form>
                    <fieldset>
                        <legend>Cartesian Fisheye</legend>
                        <rbs.FormGroup controlId="cartesian-px">
                            <rbs.ControlLabel>Strength of x-Distortion:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="range"
                                min="0"
                                max="0.9"
                                step="0.01"
                                value={props.config.cartesianFisheyeStrengthX}
                                onChange={e => actions.setCartesianFisheyeStrengthX(Number(e.target.value))}
                            />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="cartesian-py">
                            <rbs.ControlLabel>Strength of y-Distortion:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="range"
                                min="0"
                                max="0.9"
                                step="0.01"
                                value={props.config.cartesianFisheyeStrengthY}
                                onChange={e => actions.setCartesianFisheyeStrengthY(Number(e.target.value))}
                            />
                        </rbs.FormGroup>
                    </fieldset>
                    <fieldset>
                        <legend>Size-Scaling</legend>
                        <rbs.FormGroup controlId="size-scaling-midpoint">
                            <rbs.ControlLabel>Size-Scaling Midpoint:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={props.config.sizeScalingMidpoint}
                                onChange={e => actions.setSizeScalingMidpoint(Number(e.target.value))}
                            />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="size-scaling-steepness">
                            <rbs.ControlLabel>Size-Scaling Steepness:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="range"
                                min="0"
                                max="10"
                                step="0.1"
                                value={props.config.sizeScalingSteepness}
                                onChange={e => actions.setSizeScalingSteepness(Number(e.target.value))}
                            />
                        </rbs.FormGroup>
                    </fieldset>
                </form>
            </rbs.Modal.Body>
        </rbs.Modal>
    );
}
