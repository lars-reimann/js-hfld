import React       from "react";
import {Glyphicon} from "react-bootstrap";

import BlankGlyphicon from "./BlankGlyphicon.jsx";

export default props => props.active ? <Glyphicon glyph="ok" /> : <BlankGlyphicon />;