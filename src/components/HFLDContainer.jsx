import React       from "react";
import {Container} from "flux/utils";

import {appStore, earlStore, mappingStore, rdfStore} from "../stores/stores.js";

import HFLD from "./HFLD.jsx";

class HFLDContainer extends React.Component {
    static getStores() {
        return [appStore, earlStore, mappingStore, rdfStore];
    }

    static calculateState() {
        return {
            app:     appStore,
            earl:    earlStore.getState(),
            mapping: mappingStore.getState(),
            rdf:     rdfStore.getState()
        };
    }

    render() {
        return <HFLD {...this.state} />;
    }
}

export default Container.create(HFLDContainer, {pure: false});
