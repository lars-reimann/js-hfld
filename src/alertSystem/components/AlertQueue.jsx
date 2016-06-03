import React from "react";

import Alert from "./Alert.jsx";

const style = {
    position: "absolute",
    right: 10,
    bottom: 10
};

export default function (props) {
    if (props.app.get("alerts").size > 0) {
        const first = props.app.get("alerts").first();
        return (
            <div key={first.id} style={style}>
                <Alert type={first.type} message={first.message} />
            </div>
        );
    }
    return null;
}