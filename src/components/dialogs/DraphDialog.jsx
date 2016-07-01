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
                        <legend>Polar Fisheye</legend>
                        <rbs.FormGroup controlId="polar-p">
                            <rbs.ControlLabel>Strength of Distortion:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="range"
                                min="0"
                                max="0.9"
                                step="0.01"
                                value={props.config.polarFisheyeStrength}
                                onChange={e => actions.setPolarFisheyeStrength(Number(e.target.value))}
                            />
                        </rbs.FormGroup>
                    </fieldset>
                    <fieldset>
                        <legend>Scaling</legend>
                        <rbs.FormGroup controlId="scaling">
                            <rbs.ControlLabel>Enable Scaling:</rbs.ControlLabel>
                            <rbs.Checkbox
                                checked={props.config.scaleNodes}
                                onChange={() => toggleScaleNodes(props)}>
                                Scale Nodes
                            </rbs.Checkbox>
                            <rbs.Checkbox
                                checked={props.config.scaleEdgeDecals}
                                onChange={() => toggleScaleEdgeDecals(props)}>
                                Scale Edge Decals
                            </rbs.Checkbox>
                            <rbs.Checkbox
                                checked={props.config.scaleEdgeArrows}
                                onChange={() => toggleScaleEdgeArrows(props)}>
                                Scale Edge Labels
                            </rbs.Checkbox>
                        </rbs.FormGroup>
                    </fieldset>
                </form>
            </rbs.Modal.Body>
        </rbs.Modal>
    );
}
