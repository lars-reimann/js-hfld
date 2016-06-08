import React                                                           from "react";
import {Modal, Checkbox, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

import * as actions from "../../actions/actions.js";

/**
 * Closes the dialog.
 */
function hide() {
    actions.setDialogVisibility("table", false);
}

function handleRowsPerPageChange(e) {
    const rowsPerPage = Number(e.target.value);
    actions.setTableRowsPerPage(rowsPerPage);
}

/**
 * Renders this component.
 */
export default function (props) {
    return (
        <Modal show={props.visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Table Dialog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup controlId="rowsPerPage">
                        <ControlLabel>Rows per page</ControlLabel>
                        <FormControl
                            type="range"
                            min="1"
                            max="50"
                            step="1"
                            value={props.config.tableRowsPerPage}
                            placeholder="Enter a number..."
                            onChange={e => handleRowsPerPageChange(e)}
                        />
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal>
    );
}
