import React       from "react";
import {Glyphicon} from "react-bootstrap";

import BlankGlyphicon from "./BlankGlyphicon.jsx";

export default function (props) {
    if (props.active) {
        return <Glyphicon glyph="ok" />;
    } else {
        return <BlankGlyphicon />;
    }
};