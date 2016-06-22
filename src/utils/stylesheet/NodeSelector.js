import * as rdf from "@ignavia/rdf";

/**
 * Selects nodes in a graph.
 */
export default class NodeSelector {

    /**
     * A factory method to create the appropriate subclass of NodeSelector.
     *
     * @param {string} s
     * The stringified selector.
     *
     * @return {NodeSelector}
     * The created selector.
     */
    static makeSelector(s) {
        const anyRegex        = /^\*$/;
        const anyBlankRegex   = /^\.blank$/;
        const anyNamedRegex   = /^\.named$/;
        const valueRegex      = /^"(.*)"$/;
        const exactBlankRegex = /^_:(.*)$/;
        const exactNamedRegex = /^<(.*)>$/;

        if (anyRegex.test(s)) {
            return new AnyNodeSelector();
        } else if (anyBlankRegex.test(s)) {
            return new InterfaceNodeSelector("BlankNode");
        } else if (anyNamedRegex.test(s)) {
            return new InterfaceNodeSelector("NamedNode");
        } else if (valueRegex.test(s)) {
            const [, nominalValue] = valueRegex.exec(s);
            return new ValueNodeSelector(nominalValue);
        } else if (exactBlankRegex.test(s)) {
            const [, nominalValue] = exactBlankRegex.exec(s);
            return new ExactNodeSelector("BlankNode", nominalValue);
        } else if (exactNamedRegex.test(s)) {
            const [, nominalValue] = exactNamedRegex.exec(s);
            return new ExactNodeSelector("NamedNode", nominalValue);
        } else {
            throw new Error(`Invalid selector: ${s}.`);
        }
    }

    /**
     *
     */
    constructor() {}

    /**
     * Returns a set of the affected nodes.
     *
     * @param {Graph} rdfGraph
     * The graph to filter.
     *
     * @return {Set}
     * The IDs of the affected nodes.
     */
    getAffectedNodes(rdfGraph) {
        throw new Error("Calling an abstract method.");
    }

    /**
     * Tests if the given node is affected by this selector.
     *
     * @param {Graph} rdfGraph
     * The graph to filter.
     *
     * @param {String} nodeId
     * The ID of the node to test.
     */
    isAffectedNode(rdfGraph, nodeId) {
        return this.getAffectedNodes(rdfGraph).has(nodeId);
    }
}

/**
 * Selects all nodes in the graph.
 */
class AnyNodeSelector extends NodeSelector {

    /**
     *
     */
    constructor() {
        super();
    }

    /**
     * @override
     */
    getAffectedNodes(rdfGraph) {
        const result = new Set();
        for (let node of rdfGraph.iterNodes()) {
            if (node.interfaceName !== "Literal") {
                result.add(hashNode(node));
            }
        }
        return result;
    }
}

/**
 * Selects or blank or named nodes in the graph depending on the interfaceName
 * passed to it.
 */
class InterfaceNodeSelector extends NodeSelector {

    /**
     * @param {String} interfaceName
     * The interfaceName of the nodes to keep. This is either "BlankNode" or
     * "NamedNode".
     */
    constructor(interfaceName) {
        super();

        /**
         * The interfaceName of the nodes to keep. This is either "BlankNode" or
         * "NamedNode".
         *
         * @type {String}
         * @private
         */
        this.interfaceName = interfaceName;
    }

    /**
     * @override
     */
    getAffectedNodes(rdfGraph) {
        const result = new Set();
        for (let node of rdfGraph.iterNodes()) {
            if (node.interfaceName === this.interfaceName) {
                result.add(hashNode(result));
            }
        }
        return result;
    }
}

/**
 * Selects blank or named nodes with the given value.
 */
class ValueNodeSelector extends NodeSelector {

    /**
     * @param {String} nominalValue
     * The value the nodes should have.
     */
    constructor(nominalValue) {
        super();

        /**
         * A blank node with the given value.
         *
         * @type {RDFNode}
         * @private
         */
        this.blank = new rdf.BlankNode(nominalValue);

        /**
         * A named node with the given value.
         *
         * @type {RDFNode}
         * @private
         */
        this.named = new rdf.NamedNode(nominalValue);
    }

    /**
     * @override
     */
    getAffectedNodes(rdfGraph) {
        const result = new Set();
        if (rdfGraph.hasNode(this.blank)) {
            result.add(hashNode(this.blank));
        }
        if (rdfGraph.hasNode(this.named)) {
            result.add(hashNode(this.named));
        }
        return result;
    }
}

/**
 * Selects the node with the given interfaceName and nominalValue.
 */
class ExactNodeSelector extends NodeSelector {

    /**
     * @param {String} interfaceName
     * The interfaceName of the node.
     *
     * @param {String} nominalValue
     * The nominalValue of the node.
     */
    constructor(interfaceName, nominalValue) {
        super();

        /**
         * The node to match.
         *
         * @type {RDFNode}
         * @private
         */
        this.node = makeRDFNode(interfaceName, nominalValue);
    }

    /**
     * @override
     */
    getAffectedNodes(rdfGraph) {
        const result = new Set();
        if (rdfGraph.hasNode(this.node)) {
            result.add(hashNode(this.node));
        }
        return result;
    }
}

/**
 * Creates an RDFNode with the given interfaceName and nominalValue.
 *
 * @param {String} interfaceName
 * The interfaceName of the node. This is either "BlankNode" or "NamedNode".
 *
 * @param {String} nominalValue
 * The nominalValue or the node.
 *
 * @return {RDFNode}
 * The created RDFNode.
 */
function makeRDFNode(interfaceName, nominalValue) {
    switch (interfaceName) {
    case "BlankNode":
        return new rdf.BlankNode(nominalValue);
    case "NamedNode":
        return new rdf.NamedNode(nominalValue);
    default:
        throw new Error(`Invalid interface name: ${interfaceName}`);
    }
}

/**
 * Hashes the given RDFNode to a string.
 *
 * @param {RDFNode} rdfNode
 * The node to hash.
 *
 * @return {String}
 * The created hash.
 */
function hashNode(rdfNode) {
    return `${rdfNode.interfaceName}#${rdfNode.nominalValue}`;
}