import React       from "react";
import {Container} from "flux/utils";

import * as stores from "../stores/stores.js";

import App from "../components/App.jsx";

/**
 * Connects the React components and the stores.
 */
class AppWrapper extends React.Component {

    /**
     * Describes the stores the application uses.
     *
     * @return {Array}
     * The stores.
     */
    static getStores() {
        return [
            stores.alertStore,
            stores.configStore,
            stores.dialogStore,
            stores.graphStore,
            stores.rdfStore,
            stores.selectionStore,
        ];
    }

    /**
     * Bundles all stores of the application together. The result is the state
     * of the application.
     *
     * @return {Object}
     * The bundle.
     */
    static calculateState() {
        return {
            alerts:    stores.alertStore.getState(),
            config:    stores.configStore.getState(),
            dialogs:   stores.dialogStore.getState(),
            graph:     stores.graphStore,
            rdf:       stores.rdfStore,
            selection: stores.selectionStore,
        };
    }

    /**
     * Renders this component.
     */
    render() {
        return <App {...this.state} />;
    }
}

export default Container.create(AppWrapper, {pure: false});
