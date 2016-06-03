import React       from "react";
import {Container} from "flux/utils";

import {dequeueAlert} from "../actions/alertActions.js";
import AlertQueue     from "../components/AlertQueue.jsx";
import alertStore     from "../stores/alertStore.js";

class AlertQueueWrapper extends React.Component {
    static getStores() {
        return [alertStore];
    }

    static calculateState() {
        return {
            alertMessages: alertStore.getState(),
            onDismiss: dequeueAlert,
        };
    }

    render() {
        return <AlertQueue {...this.state} />;
    }
}

export default Container.create(AlertQueueWrapper);