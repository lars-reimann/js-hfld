import React       from "react";
import {Glyphicon} from "react-bootstrap";

import BlankGlyphicon from "./BlankGlyphicon.jsx";

/**
 * A glyphicon to show if something is switched on.
 *
 * @param {Object} props
 * The props to use.
 *
 * @param {Boolean} props.enabled
 * Whether the option is switched on.
 */
export default function ({enabled}) {
    return enabled ? <Glyphicon glyph="ok" /> : <BlankGlyphicon />;
};