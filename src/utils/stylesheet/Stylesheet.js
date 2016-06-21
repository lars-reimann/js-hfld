import _ from "lodash";

import * as rdf           from "@ignavia/rdf";
import {predefinedColors} from "@ignavia/util";

import * as actions from "../../actions/actions.js";
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
                            label: "$toShortString",
                        },
                    }
                },
                behaviors: [{
                    type: "interactive",
                    conf: {
                        handleMousedown(e) {
                            actions.toggleNodeSelection([e.target.earlID]);
                        },
                        handleMouseover(e) {console.log(e.target.earlID)
                            actions.moveNodeToTop(e.target.earlID);
                        }
                    }
                }]
            }
        },
        {
            selector: ".blank",
            properties: {
                style: {
                    conf: {
                        box: {
                            shape: "roundedRect"
                        },
                        text: {
                            font: {
                                style: "italic"
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
                            label: "$toShortString"
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
                },
                behaviors: [{
                    type: "interactive",
                    conf: {
                        handleMousedown(e) {
                            actions.toggleTripleSelection([e.target.earlID]);
                        },
                    }
                }]
            }
        },
        {
            selector: "* -> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> -> *",
            properties: {
                decalStyle: {
                    conf: {
                        box: {
                            backgroundColor: "$color(maroon)"
                        },
                        text: {
                            font: {
                                size: 18
                            },
                            fillColor: "$color(lightyellow)",
                            label: "is a"
                        }
                    }
                }
            }
        },
        {
            selector: "* -> <http://www.w3.org/2002/07/owl#sameAs> -> *",
            properties: {
                decalStyle: {
                    conf: {
                        box: {
                            backgroundColor: "$color(lightcyan)"
                        },
                        text: {
                            font: {
                                size: 20
                            },
                            fillColor: "$color(darkslategrey)",
                            label: "=",
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

    computeAllStyles(rdfGraph, profile) {
        return {
            graphConf: this.computeGraphStyle(),
            nodeConfs: this.computeNodeStyles(rdfGraph, profile),
            edgeConfs: this.computeEdgeStyles(rdfGraph, profile),
        };
    }

    /**
     * Computes the configuration of the graph visualizer.
     *
     * @return {Object}
     * The configuration of the graph visualizer.
     */
    computeGraphStyle() {
        return this.graphConf;
    }

    /**
     * Computes the configuration of the node visualizer.
     *
     * @param {Graph} rdfGraph
     * The RDF graph.
     *
     * @param {Profile} profile
     * The RDF profile.
     *
     * @return {Object}
     * The configuration of the node visualizer.
     */
    computeNodeStyles(rdfGraph, profile) {
        const result = new Map();

        for (let {selector, properties} of this.nodeRules) {
            for (let nodeId of selector.getAffectedNodes(rdfGraph)) {
                const conf = result.get(nodeId) || {};
                result.set(nodeId, _.merge(conf, properties));
            }
        }

        for (let [id, conf] of result) {
            conf = this.resolveNodeMacros(rdfGraph, profile, id, conf);
            result.set(id, conf);
        }

        return result;
    }

    /**
     * Computes the configuration of the edge visualizer.
     *
     * @param {Graph} rdfGraph
     * The RDF graph.
     *
     * @param {Profile} profile
     * The RDF profile.
     *
     * @return {Object}
     * The configuration of the edge visualizer.
     */
    computeEdgeStyles(rdfGraph, profile) {
        const result = new Map();

        for (let {selector, properties} of this.edgeRules) {
            for (let edgeId of selector.getAffectedEdges(rdfGraph)) {
                const conf = result.get(edgeId) || {};
                result.set(edgeId, _.merge(conf, properties));
            }
        }

        for (let [id, conf] of result) {
            conf = this.resolveEdgeMacros(rdfGraph, profile, id, conf);
            result.set(id, conf);
        }

        return result;
    }

    computeNodeStyle(rdfGraph, profile, nodeId) {
        let result = {};
        for (let {selector, properties} of this.nodeConfs) {
            if (selector.isAffectedNode(rdfGraph, nodeId)) {
                result = _.merge(result, properties);
            }
        }
        result = this.resolveNodeMacros(rdfGraph, profile, nodeId, result);
        return result;
    }

    computeEdgeStyle(rdfGraph, profile, edgeId) {
        let result = {};
        for (let {selector, properties} of this.edgeConfs) {
            if (selector.isAffectedEdge(rdfGraph, edgeId)) {
                result = _.merge(result, properties);
            }
        }
        result = this.resolveEdgeMacros(rdfGraph, profile, edgeId, result);
        return result;
    }

    resolveNodeMacros(rdfGraph, profile, nodeId, conf) {
        return deepMap(nodeReplacement(rdfGraph, profile, nodeId), conf);
    }

    resolveEdgeMacros(rdfGraph, profile, edgeId, conf) {
        return deepMap(edgeReplacement(rdfGraph, profile, edgeId), conf);
    }
}

const nodeReplacement = _.curry(function (rdfGraph, profile, nodeId, s) {
    const replacements = [
        colorReplacement,
        idReplacement(nodeId),
        nodeToNTReplacement(nodeId),
        nodeToStringReplacement(nodeId),
        nodeToShortStringReplacement(profile, nodeId)
    ];

    for (let replacement of replacements) {
        s = replacement(s);
        if (!_.isString(s)) {
            return s;
        }
    }

    return s;
});

const edgeReplacement = _.curry(function (rdfGraph, profile, edgeId, s) {
    const replacements = [
        colorReplacement,
        idReplacement(edgeId),
        edgeToNTReplacement(rdfGraph, edgeId),
        edgeToStringReplacement(rdfGraph, edgeId),
        edgeToShortStringReplacement(rdfGraph, profile, edgeId)
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
    const idRegex = /\$id/g;
    if (idRegex.test(s)) {
        return s.replace(idRegex, id);
    }
    return s;
});

const nodeToNTReplacement = _.curry(function (id, s) {
    const toNTRegex = /\$toNT/g;

    if (toNTRegex.test(s)) {
        const rdfNode = makeRDFNode(id);
        return s.replace(toNTRegex, rdfNode.toNT());
    }
    return s;
});

const nodeToStringReplacement = _.curry(function (id, s) {
    const toStringRegex = /\$toString/g;
    if (toStringRegex.test(s)) {
        const rdfNode = makeRDFNode(id);
        return s.replace(toStringRegex, rdfNode.toString());
    }
    return s;
});

const nodeToShortStringReplacement = _.curry(function (profile, id, s) {
    const toShortStringRegex = /\$toShortString/g;
    if (toShortStringRegex.test(s)) {
        const rdfNode = makeRDFNode(id);
        return s.replace(toShortStringRegex, profile.nodeToString(rdfNode));
    }
    return s;
});

const edgeToNTReplacement = _.curry(function (rdfGraph, id, s) {
    const toNTRegex = /\$toNT/g;

    if (toNTRegex.test(s)) {
        const {predicate} = rdfGraph.getTripleById(id);
        return s.replace(toNTRegex, predicate.toNT());
    }
    return s;
});

const edgeToStringReplacement = _.curry(function (rdfGraph, id, s) {
    const toStringRegex = /\$toString/g;
    if (toStringRegex.test(s)) {
        const {predicate} = rdfGraph.getTripleById(id);
        return s.replace(toStringRegex, predicate.toString());
    }
    return s;
});

const edgeToShortStringReplacement = _.curry(function (rdfGraph, profile, id, s) {
    const toShortStringRegex = /\$toShortString/g;
    if (toShortStringRegex.test(s)) {
        const {predicate} = rdfGraph.getTripleById(id);
        return s.replace(toShortStringRegex, profile.nodeToString(predicate));
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
            result.push(deepMap(f, v));
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