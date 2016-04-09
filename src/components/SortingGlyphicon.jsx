import React       from "react";
import {Glyphicon} from "react-bootstrap";

export default function ({order}) {
    if (order === "asc") {
        return <Glyphicon glyph="triangle-top" />
    } else if (order === "desc") {
        return <Glyphicon glyph="triangle-bottom" />
    } else {
        return null;
    }
}