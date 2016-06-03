import React       from "react";
import {Container} from "flux/utils";

import {dequeueAlert} from "../actions/alertActions.js";
import AlertQueue     from "../components/AlertQueue.jsx";
import alertStore     from "../stores/alertStore.js";

/**
 * Hides the Flux lifecycle from the underlying React components.
 */
class AlertQueueWrapper extends React.Component {

    /**
     * Returns the stores to watch for updates.
     *
     * @return {Array}
     * The relevant stores.
     */
    static getStores() {
        return [alertStore];
    }

    /**
     * Returns the state of all associated stores.
     *
     * @return {Object}
     * The state of the stores.
     */
    static calculateState() {
        return {
            alertMessages: alertStore.getState()
        };
    }

    /**
     * Renders the component.
     */
    render() {
        return <AlertQueue {...this.state} onDismiss={dequeueAlert} />;
    }
}

export default Container.create(AlertQueueWrapper);