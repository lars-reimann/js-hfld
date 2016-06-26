import React       from "react";
import {Glyphicon} from "react-bootstrap";

/**
 * An invisible element that takes up as much space as a normal glyphicon.
 */
export default function render () {
    return <Glyphicon glyph="ok" style={{visibility: "hidden"}} />;
}
