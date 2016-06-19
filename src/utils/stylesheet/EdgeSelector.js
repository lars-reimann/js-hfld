import * as rdf from "@ignavia/rdf";

export default class EdgeSelector {

    static makeSelector(s) {
        const anyRegex    = /^\*$/;
        const filterRegex = /^(\S*)\s*->\s*(\S*)\s*->\s*(\S*)$/;

        if (anyRegex.test(s)) {
            return new AnyEdgeSelector();
        } else if (filterRegex.test(s)) {
            const [, subject, predicate, object] = filterRegex.exec(s);
            const subjectFilter   = FilterEdgesSelector.makeNodeFilter(subject);
            const predicateFilter = FilterEdgesSelector.makeNodeFilter(predicate);
            const objectFilter    = FilterEdgesSelector.makeNodeFilter(object);
            return new FilterEdgesSelector(subjectFilter, predicateFilter, objectFilter);
        } else {
            throw new Error(`Invalid selector: ${s}.`);
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

class FilterEdgesSelector extends EdgeSelector {
    static makeNodeFilter(s) {
        const anyRegex        = /^\*$/;
        const valueRegex      = /^"(.*)"$/;
        const exactBlankRegex = /^_:(.*)$/;
        const exactNamedRegex = /^<(.*)>$/;

        if (anyRegex.test(s)) {
            return undefined;
        } else if (valueRegex.test(s)) {
            const [, value] = valueRegex.exec(s);
            return value;
        } else if (exactBlankRegex.test(s)) {
            const [, nominalValue] = exactBlankRegex.exec(s);
            return new rdf.BlankNode(nominalValue);
        } else if (exactNamedRegex.test(s)) {
            const [, nominalValue] = exactNamedRegex.exec(s);
            return new rdf.NamedNode(nominalValue);
        } else {
            throw new Error(`Invalid filter: ${s}.`);
        }
    }

    constructor(subjectFilter, predicateFilter, objectFilter) {
        super();

        this.subjectFilter = subjectFilter;

        this.predicateFilter = predicateFilter;

        this.objectFilter = objectFilter;
    }

    getAffectedEdges(rdfGraph) {
        const result = new Set();

        const filteredGraph = rdfGraph.match({
            subject:   this.subjectFilter,
            predicate: this.predicateFilter,
            object:    this.objectFilter,
        });
        for (let triple of filteredGraph) {
            result.add(triple.id);
        }

        return result;
    }
}