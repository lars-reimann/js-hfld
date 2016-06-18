import _ from "lodash";

import * as rdf           from "@ignavia/rdf";
import {predefinedColors} from "@ignavia/util";

import EdgeSelector from "./EdgeSelector.js";
import NodeSelector from "./NodeSelector.js";

const defaultConf = {
    node: [
        {
            selector: "*",
            properties: {
                style: {
                    type: "labelled",
                    conf: {
                        text: {
                            label: "$toNT",
                            fillColor: "$color(maroon)",
                            stroke: {
                                color: "$color(black)",
                                thickness: 1
                            }
                        },
                        box: {
                            backgroundColor: "$color(pink)",
                            shape: "roundedRect",
                            border: {
                                radius: 10
                            }
                        }
                    }
                }
            }
        }
    ],
    edge: [
        {
            selector: "*",
            properties: {
                decalStyle: {
                    type: "labelled",
                    conf: {
                        text: {
                            label: "$id"
                        }
                    }
                },
                lineStyle: {
                    type: "quadratic",
                    conf: {
                        controlPoint: {
                            perpendicular: 100
                        }
                    }
                }
            }
        }
    ]
};

export default class {

    constructor(conf = {}) {
        this.graphConf = conf.graph;
        this.nodeRules = this.computeNodeRules(conf.node);
        this.edgeRules = this.computeEdgeRules(conf.edge);
    }

    computeNodeRules(conf = []) {
        conf = defaultConf.node.concat(conf);

        const result = new Set();

        for (let {selector, properties} of conf) {
            result.add({
                selector: NodeSelector.makeSelector(selector),
                properties,
            });
        }

        return result;
    }

    computeEdgeRules(conf = []) {
        conf = defaultConf.edge.concat(conf);

        const result = new Set();

        for (let {selector, properties} of conf) {
            result.add({
                selector: EdgeSelector.makeSelector(selector),
                properties,
            });
        }

        return result;
    }

    computeAllStyles(rdfGraph) { // TODO: pass in profile
        return {
            graphConf: this.computeGraphStyle(),
            nodeConfs: this.computeNodeStyles(rdfGraph),
            edgeConfs: this.computeEdgeStyles(rdfGraph),
        };
    }

    computeGraphStyle() {
        return this.graphConf;
    }

    computeNodeStyles(rdfGraph) {
        const result = new Map();

        for (let {selector, properties} of this.nodeRules) {
            for (let nodeId of selector.getAffectedNodes(rdfGraph)) {
                const conf = result.get(nodeId) || {};
                result.set(nodeId, _.merge(conf, properties));
            }
        }

        for (let [id, conf] of result) {
            conf = this.resolveNodeMacros(rdfGraph, id, conf);
            result.set(id, conf);
        }

        return result;
    }

    computeEdgeStyles(rdfGraph) {
        const result = new Map();

        for (let {selector, properties} of this.edgeRules) {
            for (let edgeId of selector.getAffectedEdges(rdfGraph)) {
                const conf = result.get(edgeId) || {};
                result.set(edgeId, _.merge(conf, properties));
            }
        }

        for (let [id, conf] of result) {
            conf = this.resolveEdgeMacros(rdfGraph, id, conf);
            result.set(id, conf);
        }

        return result;
    }

    computeNodeStyle(rdfGraph, nodeId) {
        let result = {};
        for (let {selector, properties} of this.nodeConfs) {
            if (selector.isAffectedNode(rdfGraph, nodeId)) {
                result = _.merge(result, properties);
            }
        }
        result = this.resolveNodeMacros(rdfGraph, nodeId, result);
        return result;
    }

    computeEdgeStyle(rdfGraph, edgeId) {
        let result = {};
        for (let {selector, properties} of this.edgeConfs) {
            if (selector.isAffectedEdge(rdfGraph, edgeId)) {
                result = _.merge(result, properties);
            }
        }
        result = this.resolveEdgeMacros(rdfGraph, edgeId, result);
        return result;
    }

    resolveNodeMacros(rdfGraph, nodeId, conf) {
        return deepMap(nodeReplacement(rdfGraph, nodeId), conf);
    }

    resolveEdgeMacros(rdfGraph, edgeId, conf) {
        return deepMap(edgeReplacement(rdfGraph, edgeId), conf);
    }
}

const nodeReplacement = _.curry(function (rdfGraph, nodeId, s) {
    const replacements = [
        colorReplacement,
        idReplacement(nodeId),
        nodeToNTReplacement(nodeId),
        nodeToStringReplacement(nodeId)
    ];

    for (let replacement of replacements) {
        s = replacement(s);
        if (!_.isString(s)) {
            return s;
        }
    }

    return s;
});

const edgeReplacement = _.curry(function (rdfGraph, nodeId, s) {
    const replacements = [
        colorReplacement,
        idReplacement(nodeId)
    ];

    for (let replacement of replacements) {
        s = replacement(s);
        if (!_.isString(s)) {
            return s;
        }
    }

    return s;
});

function colorReplacement(s) {
    const colorRegex = /^\$color\((.*)\)$/;
    if (colorRegex.test(s)) {
        const [, color] = colorRegex.exec(s);
        return predefinedColors[color];
    }
    return s;
}

const idReplacement = _.curry(function (id, s) {
    const idRegex = /\$id/;
    if (idRegex.test(s)) {
        return s.replace(idRegex, id);
    }
    return s;
});

const nodeToStringReplacement = _.curry(function (id, s) {
    const toStringRegex = /\$toString/;
    if (toStringRegex.test(s)) {
        const rdfNode = makeRDFNode(id);
        return s.replace(toStringRegex, rdfNode.toString());
    }
    return s;
});

const nodeToNTReplacement = _.curry(function (id, s) {
    const toNTRegex = /\$toNT/;

    if (toNTRegex.test(s)) {
        const rdfNode = makeRDFNode(id);
        return s.replace(toNTRegex, rdfNode.toNT());
    }
    return s;
});

function makeRDFNode(hash) { // TODO find better name
    const regex = /^(BlankNode|NamedNode)#(.*)$/;
    const [, interfaceName, nominalValue] = regex.exec(hash);
    switch (interfaceName) {
    case "BlankNode":
        return new rdf.BlankNode(nominalValue);
    case "NamedNode":
        return new rdf.NamedNode(nominalValue);
    default:
        throw new Error(`Could not unhash ${earlNodeId}.`);
    }
}

function deepMap(f, p) {
    if (_.isString(p)) {
        return f(p);
    } else if (_.isArray(p)) {
        const result = [];
        for (let v of p) {
            result.append(deepMap(f, v));
        }
        return result;
    } else if (_.isPlainObject(p)) {
        const result = {};
        for (let [k, v] of Object.entries(p)) {
            result[k] = deepMap(f, v);
        }
        return result;
    } else {
        return p;
    }
}