import React       from "react";
import {Glyphicon} from "react-bootstrap";

import BlankGlyphicon from "./BlankGlyphicon.jsx";

/**
 * A glyphicon to show how something is sorted.
 *
 * @param {Object} props
 * The props to use.
 *
 * @param {string} props.order
 * The order used for sorting. This can be one of "asc" or "desc".
 */
export default function render({order}) {
    if (order === "asc") {
        return <Glyphicon glyph="triangle-top" />;
    } else if (order === "desc") {
        return <Glyphicon glyph="triangle-bottom" />;
    } else {
        return <BlankGlyphicon />;
    }
}