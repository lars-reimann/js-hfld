export default class EdgeSelector {

    static makeSelector(s) {
        const anyRegex = /^\*$/;

        if (anyRegex.test(s)) {
            return new AnyEdgeSelector();
        }
    }

    constructor() {}

    getAffectedEdges(rdfGraph) {
        throw new Error("Calling an abstract method.");
    }

    isAffectedEdge(rdfGraph, edgeId) {
        return this.getAffectedEdges(rdfGraph).has(edgeId);
    }
}

class AnyEdgeSelector extends EdgeSelector {
    constructor() {
        super();
    }

    getAffectedEdges(rdfGraph) {
        const result = new Set();
        for (let edge of rdfGraph) {
            result.add(edge.id);
        }
        return result;
    }
}