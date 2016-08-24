import React    from "react";
import * as rbs from "react-bootstrap";

import * as actions from "../../actions/actions.js";

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
                        <rbs.FormGroup controlId="cartesian-fisheye-center-height">
                            <rbs.ControlLabel>Center Height:</rbs.ControlLabel>
                            <rbs.FormControl
                                disabled
                                type="range"
                                min="0.001"
                                max="0.499"
                                step="0.001"
                                value={props.config.cartesianFisheyeCenterHeight}
                                onChange={e => actions.setCartesianFisheyeCenterHeight(Number(e.target.value))}
                            />
                        </rbs.FormGroup>
                    </fieldset>
                    <fieldset>
                        <legend>Polar Fisheye</legend>
                        <rbs.FormGroup controlId="polar-fisheye-center-height">
                            <rbs.ControlLabel>Center Height:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="range"
                                min="0.001"
                                max="0.499"
                                step="0.001"
                                value={props.config.polarFisheyeCenterHeight}
                                onChange={e => actions.setPolarFisheyeCenterHeight(Number(e.target.value))}
                            />
                        </rbs.FormGroup>
                        <rbs.FormGroup controlId="polar-fisheye-radius">
                            <rbs.ControlLabel>Radius:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="range"
                                min="0"
                                max="5"
                                step="0.01"
                                value={props.config.polarFisheyeRadius}
                                onChange={e => actions.setPolarFisheyeRadius(Number(e.target.value))}
                            />
                        </rbs.FormGroup>
                    </fieldset>
                    <fieldset>
                        <legend>Size-Scaling</legend>
                        <rbs.FormGroup controlId="size-scaling-midpoint">
                            <rbs.ControlLabel>Midpoint:</rbs.ControlLabel>
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
                            <rbs.ControlLabel>Steepness:</rbs.ControlLabel>
                            <rbs.FormControl
                                type="range"
                                min="0"
                                max="50"
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
