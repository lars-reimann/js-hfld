import * as rdf from "@ignavia/rdf";

export default class NodeSelector {

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
            const [, nominalValue] = exactRegex.exec(s);
            return new ExactNodeSelector("BlankNode", nominalValue);
        } else if (exactNamedRegex.test(s)) {
            const [, nominalValue] = exactRegex.exec(s);
            return new ExactNodeSelector("NamedNode", nominalValue);
        } else {
            throw new Error(`Invalid selector: ${s}.`);
        }
    }

    constructor() {}

    getAffectedNodes(rdfGraph) {
        throw new Error("Calling an abstract method.");
    }

    isAffectedNode(rdfGraph, nodeId) {
        return this.getAffectedNodes(rdfGraph).has(nodeId);
    }
}

class AnyNodeSelector extends NodeSelector {
    constructor() {
        super();
    }

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

class InterfaceNodeSelector extends NodeSelector {
    constructor(interfaceName) {
        super();

        this.interfaceName = interfaceName;
    }

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

class ValueNodeSelector extends NodeSelector {
    constructor(nominalValue) {
        super();

        this.blank = new rdf.BlankNode(nominalValue);
        this.named = new rdf.NamedNode(nominalValue);
    }

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

class ExactNodeSelector extends NodeSelector {
    constructor(interfaceName, nominalValue) {
        super();

        this.node = makeRDFNode(interfaceName, nominalValue);
    }

    getAffectedNodes(rdfGraph) {
        const result = new Set();
        if (rdfGraph.hasNode(this.node)) {
            result.add(hashNode(this.node));
        }
        return result;
    }
}

function makeRDFNode(interfaceName, nominalValue) { // TODO find better name
    switch (interfaceName) { // TODO make function in utils
    case "BlankNode":
        return new rdf.BlankNode(nominalValue);
    case "NamedNode":
        return new rdf.NamedNode(nominalValue);
    default:
        throw new Error(`Invalid interface name: ${interfaceName}`);
    }
}

function hashNode(rdfNode) { // move this to utils?
    return `${rdfNode.interfaceName}#${rdfNode.nominalValue}`;
}