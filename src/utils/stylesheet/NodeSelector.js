import * as rdf from "@ignavia/rdf";

export default class NodeSelector {

    static makeSelector(s) {
        const anyRegex       = /^\*$/;
        const interfaceRegex = /^\.(blank|named)$/;
        const valueRegex     = /^"(.*)"$/;
        const exactRegex     = /^"(.*)"\.(blank|named)$/;

        if (anyRegex.test(s)) {
            return new AnyNodeSelector();
        } else if (interfaceRegex.test(s)) {
            const [, shortInterfaceName] = interfaceRegex.exec(s);
            const interfaceName = NodeSelector.toOfficialInterfaceName(shortInterfaceName);
            return new InterfaceNodeSelector(interfaceName);
        } else if (valueRegex.test(s)) {
            const [, nominalValue] = valueRegex.exec(s);
            return new ValueNodeSelector(nominalValue);
        } else if (exactRegex.test(s)) {
            const [, nominalValue, shortInterfaceName] = exactRegex.exec(s);
            const interfaceName = NodeSelector.toOfficialInterfaceName(shortInterfaceName);
            return new ExactNodeSelector(interfaceName, nominalValue);
        }
    }

    static toOfficialInterfaceName(shortInterfaceName) {
        switch (shortInterfaceName) {
        case "blank":
            return "BlankNode";
        case "named":
            return "NamedNode";
        default:
            throw new Error(`Could not translate short interface name: ${shortInterfaceName}.`);
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
            result.add(hashNode(node));
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