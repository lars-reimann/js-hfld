import React       from "react";
import {Container} from "flux/utils";

import {appStore, graphStore, rdfStore} from "../stores/stores.js";

import HFLD from "./HFLD.jsx";

class HFLDContainer extends React.Component {
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
        return <HFLD {...this.state} />;
    }
}

export default Container.create(HFLDContainer, {pure: false});
