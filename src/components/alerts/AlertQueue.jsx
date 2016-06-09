import React from "react";

import Alert from "./Alert.jsx";

/**
 * The style to apply to the alert queue box.
 */
const style = {
    position: "absolute",
    right: 10,
    bottom: 10,
    zIndex: 1000000,
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
export default function ({alertMessages: [first]}) {
    return (
        <div style={style}>
            { first === undefined ? null :
                <Alert key={first.id} type={first.type} message={first.message} />
            }
        </div>
    );
}