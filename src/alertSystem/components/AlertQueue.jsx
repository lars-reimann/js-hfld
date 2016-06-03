import React from "react";

import Alert from "./Alert.jsx";

/**
 * The style to apply to the alert queue box.
 */
const style = {
    position: "absolute",
    right: 10,
    bottom: 10
};

/**
 * Renders the component.
 *
 * @param {Object} props
 * The props to use.
 *
 * @param {Array} props.alertMessages
 * The alert messages to display.
 *
 * @param {Function} props.onDismiss
 * The function to call to dismiss an alert.
 */
export default function ({alertMessages, onDismiss}) {
    if (alertMessages.length > 0) {
        const first = alertMessages[0];
        return (
            <div key={first.id} style={style}>
                <Alert type={first.type} message={first.message} onDismiss={onDismiss} />
            </div>
        );
    }
    return null;
}