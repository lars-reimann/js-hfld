import React       from "react";
import {Container} from "flux/utils";

import {appStore, graphStore, rdfStore} from "../stores/stores.js";

import App from "../components/App.jsx";

class AppWrapper extends React.Component {
    static getStores() {
        return [appStore, graphStore, rdfStore];
    }

    static calculateState() {
        return {
            app:     appStore,
            graph:   graphStore.getState(),
            rdf:     rdfStore.getState()
        };
    }

    render() {
        return <App {...this.state} />;
    }
}

export default Container.create(AppWrapper, {pure: false});
