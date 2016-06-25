import React    from "react";
import * as rbs from "react-bootstrap";

import * as actions from "../../actions/actions.js";

/**
 * Adjusts the number of rows per page in the table view.
 *
 * @param {Event} e
 * The change event.
 *
 * @ignore
 */
function handleRowsPerPageChange(e) {
    const rowsPerPage = Number(e.target.value);
    actions.setTableRowsPerPage(rowsPerPage);
}

/**
 * Closes the dialog.
 *
 * @ignore
 */
function close() {
    actions.setDialogVisibility("table", false);
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
export default function render (props) {
    return (
        <rbs.Modal show={props.visible} onHide={close}>
            <rbs.Modal.Header closeButton>
                <rbs.Modal.Title>Configure Table View</rbs.Modal.Title>
            </rbs.Modal.Header>
            <rbs.Modal.Body>
                <form>
                    <rbs.FormGroup controlId="rowsPerPage">
                        <rbs.ControlLabel>Rows Per Page:</rbs.ControlLabel>
                        <rbs.FormControl
                            type="range"
                            min="1"
                            max="50"
                            step="1"
                            value={props.config.tableRowsPerPage}
                            placeholder="Enter a number..."
                            onChange={handleRowsPerPageChange}
                        />
                    </rbs.FormGroup>
                </form>
            </rbs.Modal.Body>
        </rbs.Modal>
    );
}
