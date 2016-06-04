import React       from "react";
import {Container} from "flux/utils";

import * as stores from "../stores/stores.js";

import App from "../components/App.jsx";

class AppWrapper extends React.Component {
    static getStores() {
        return [
            stores.alertStore,
            stores.appStore,
            stores.dialogStore,
            stores.graphStore,
            stores.rdfStore
        ];
    }

    static calculateState() {
        return {
            alerts:  stores.alertStore.getState(),
            app:     stores.appStore.getState(),
            dialogs: stores.dialogStore.getState(),
            graph:   stores.graphStore.getState(),
            rdf:     stores.rdfStore.getState(),
        };
    }

    render() {
        return <App {...this.state} />;
    }
}

export default Container.create(AppWrapper, {pure: false});
