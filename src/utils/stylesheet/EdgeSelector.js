import * as rdf from "@ignavia/rdf";

/**
 * Selects edges in a graph.
 */
export default class EdgeSelector {

    /**
     * A factory method to create the appropriate subclass of EdgeSelector.
     *
     * @param {string} s
     * The stringified selector.
     *
     * @return {EdgeSelector}
     * The created selector.
     */
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

    /**
     *
     */
    constructor() {}

    /**
     * Returns a set of the affected edges.
     *
     * @param {Graph} rdfGraph
     * The graph to filter.
     *
     * @return {Set}
     * The IDs of the affected edges.
     */
    getAffectedEdges(rdfGraph) {
        throw new Error("Calling an abstract method.");
    }

    /**
     * Tests if the given edge is affected by this selector.
     *
     * @param {Graph} rdfGraph
     * The graph to filter.
     *
     * @param {String} edgeId
     * The ID of the edge to test.
     */
    isAffectedEdge(rdfGraph, edgeId) {
        return this.getAffectedEdges(rdfGraph).has(edgeId);
    }
}

/**
 * Selects all edges in the graph.
 */
class AnyEdgeSelector extends EdgeSelector {

    /**
     *
     */
    constructor() {
        super();
    }

    /**
     * @override
     */
    getAffectedEdges(rdfGraph) {
        const result = new Set();
        for (let edge of rdfGraph) {
            result.add(edge.id);
        }
        return result;
    }

    /**
     * Stringifies the selector.
     *
     * @return {string}
     * The stringified selector.
     */
    toString() {
        return "*";
    }
}

/**
 * Filters the edges according to the subject, predicate and object properties.
 */
class FilterEdgesSelector extends EdgeSelector {

    /**
     * Parses the stringified node filter.
     *
     * @param {string} s
     * The stringified node filter.
     *
     * @return {null|string|RDFNode}
     * The created filter.
     */
    static makeNodeFilter(s) {
        const anyRegex        = /^\*$/;
        const valueRegex      = /^"(.*)"$/;
        const exactBlankRegex = /^_:(.*)$/;
        const exactNamedRegex = /^<(.*)>$/;

        if (anyRegex.test(s)) {
            return null;
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

    /**
     * @param {null|string|RDFNode} subjectFilter
     * The filter to apply to the subject property.
     *
     * @param {null|string|RDFNode} predicateFilter
     * The filter to apply to the predicate property.
     *
     * @param {null|string|RDFNode} objectFilter
     * The filter to apply to the object property.
     */
    constructor(subjectFilter, predicateFilter, objectFilter) {
        super();

        /**
         * The filter to apply to the subject property.
         *
         * @type {null|string|RDFNode}
         * @private
         */
        this.subjectFilter = subjectFilter;

        /**
         * The filter to apply to the predicate property.
         *
         * @type {null|string|RDFNode}
         * @private
         */
        this.predicateFilter = predicateFilter;

        /**
         * The filter to apply to the object property.
         *
         * @type {null|string|RDFNode}
         * @private
         */
        this.objectFilter = objectFilter;
    }

    /**
     * @override
     */
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