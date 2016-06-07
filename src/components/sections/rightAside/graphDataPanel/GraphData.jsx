import React from "react";

import {Tooltip, OverlayTrigger} from "react-bootstrap";

export default function (props) {
    return (
        <div>
            <h2>{props.title}</h2>
            <OverlayTrigger placement="right" overlay={
                <Tooltip id="numberOfAdjacentNodes">
                    <span>Incoming: {props.node.getNumberOfAdjacentNodes("inc")}</span>
                    <br />
                    <span>Outgoing: {props.node.getNumberOfAdjacentNodes("out")}</span>
                </Tooltip>}>
                <span>Number of adjacent nodes: {props.node.getNumberOfAdjacentNodes()}</span>
            </OverlayTrigger>
            <br />
            <OverlayTrigger placement="right" overlay={
                <Tooltip id="numberOfIncidentEdges">
                    <span>Incoming: {props.node.getNumberOfIncidentEdges("inc")}</span>
                    <br />
                    <span>Outgoing: {props.node.getNumberOfIncidentEdges("out")}</span>
                </Tooltip>}>
                <span>Number of incident edges: {props.node.getNumberOfIncidentEdges()}</span>
            </OverlayTrigger>
        </div>
    );
}