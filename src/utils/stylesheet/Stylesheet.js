import _    from "lodash";
import PIXI from "pixi.js";

import * as rdf           from "@ignavia/rdf";
import {predefinedColors} from "@ignavia/util";

import * as actions from "../../actions/actions.js";
import EdgeSelector from "./EdgeSelector.js";
import NodeSelector from "./NodeSelector.js";

/**
 * The default stylesheet that is prepended to the user styles.
 *
 * @type {Object}
 * @ignore
 */
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
                            actions.toggleNodeSelection([e.target.earlId]);
                        },
                        handleMouseover(e) {
                            actions.moveNodeToTop(e.target.earlId);
                        }
                    }
                }],
            }
        },
        {
            selector: "_:*",
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
                        },
                        rotateToLine: true
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
                            actions.toggleTripleSelection([e.target.earlId]);
                        },
                        handleMouseover(e) {
                            actions.moveEdgeToTop(e.target.earlId);
                        }
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

/**
 * A graph stylesheet.
 */
export default class {

    /**
     * @param {Object} conf
     * The configuration of the stylesheet.
     */
    constructor(conf = {}) {

        /**
         * Used to load images.
         *
         * @type {Loader}
         * @private
         */
        this.loader = new PIXI.loaders.Loader();

        /**
         * The graph configuration.
         *
         * @type {Object}
         * @private
         */
        this.graphConf = conf.graph;

        /**
         * The node rules.
         *
         * @type {Set}
         * @private
         */
        this.nodeRules = this.computeNodeRules(conf.node);

        /**
         * The edge rules.
         *
         * @type {Set}
         * @private
         */
        this.edgeRules = this.computeEdgeRules(conf.edge);

        this.loader.once("complete", actions.loadedStyle);
        this.loader.load();
    }

    /**
     * Computes the node rules using the given configuration.
     *
     * @param {Array} conf
     * The configuration.
     *
     * @return {Set}
     * The computed rules.
     */
    computeNodeRules(conf = []) {
        conf = defaultConf.node.concat(conf);

        const result = new Set();

        for (let {selector, properties} of conf) {
            result.add({
                selector:   NodeSelector.makeSelector(selector),
                properties: this.loadImages(properties),
            });
        }

        return result;
    }

    /**
     * Computes the edge rules using the given configuration.
     *
     * @param {Array} conf
     * The configuration.
     *
     * @return {Set}
     * The computed rules.
     */
    computeEdgeRules(conf = []) {
        conf = defaultConf.edge.concat(conf);

        const result = new Set();

        for (let {selector, properties} of conf) {
            result.add({
                selector: EdgeSelector.makeSelector(selector),
                properties: this.loadImages(properties),
            });
        }

        return result;
    }

    /**
     * Computes the configurations of the graph, node and edge visualizers.
     *
     * @param {Graph} rdfGraph
     * The graph to draw.
     *
     * @param {Profile} profile
     * The profile to use to shrink node values.
     *
     * @return {Object}
     * The configurations.
     */
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
     * Computes the configurations of the node visualizers.
     *
     * @param {Graph} rdfGraph
     * The RDF graph.
     *
     * @param {Profile} profile
     * The RDF profile.
     *
     * @return {Map}
     * The configurations of the node visualizers.
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
     * @return {Map}
     * The configurations of the edge visualizer.
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

    /**
     * Computes the configuration of the node visualizer for the given node.
     *
     * @param {Graph} rdfGraph
     * The RDF graph.
     *
     * @param {Profile} profile
     * The RDF profile.
     *
     * @param {String} nodeId
     * The ID of the node to display.
     *
     * @return {Object}
     * The configuration of the node visualizer.
     */
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

    /**
     * Computes the configuration of the edge visualizer for the given edge.
     *
     * @param {Graph} rdfGraph
     * The RDF graph.
     *
     * @param {Profile} profile
     * The RDF profile.
     *
     * @param {String} edgeId
     * The ID of the edge to display.
     *
     * @return {Object}
     * The configuration of the edge visualizer.
     */
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

    /**
     * Resolves the node macros in the given configuration object.
     *
     * @param {Graph} rdfGraph
     * The RDF graph.
     *
     * @param {Profile} profile
     * The RDF profile.
     *
     * @param {String} nodeId
     * The ID of the node to display.
     *
     * @param {Object} conf
     * The old configuration.
     *
     * @return {Object}
     * The updated configuration.
     */
    resolveNodeMacros(rdfGraph, profile, nodeId, conf) {
        return deepMap(nodeReplacement(rdfGraph, profile, nodeId), conf);
    }

    /**
     * Resolves the edge macros in the given configuration object.
     *
     * @param {Graph} rdfGraph
     * The RDF graph.
     *
     * @param {Profile} profile
     * The RDF profile.
     *
     * @param {String} edgeId
     * The ID of the edge to display.
     *
     * @param {Object} conf
     * The old configuration.
     *
     * @return {Object}
     * The updated configuration.
     */
    resolveEdgeMacros(rdfGraph, profile, edgeId, conf) {
        return deepMap(edgeReplacement(rdfGraph, profile, edgeId), conf);
    }

    /**
     * Loads the images in the given configuration.
     *
     * @param {Object} conf
     * The old configuration.
     *
     * @return {Object}
     * The updated configuration.
     */
    loadImages(conf) {
        return deepMap((s) => this.loadImage(s), conf);
    }

    /**
     * Checks if the given string contains any image paths and loads the image
     * if they do.
     *
     * @param {String} s
     * The string to check.
     *
     * @return {String}
     * The updated string.
     */
    loadImage(s) {
        const imgRegex = /^\$img\((.*)\)$/;
        if (imgRegex.test(s)) {
            const [, path] = imgRegex.exec(s);
            this.loader.add(path, path);
            return path;
        }
        return s;
    }
}

/**
 * Replaces all node macros in the given string.
 *
 * @param {Graph} rdfGraph
 * The graph to display.
 *
 * @param {Profile} profile
 * The profile to use to shrink node values.
 *
 * @param {String} nodeId
 * The ID of the node to display.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
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

/**
 * Replaces all edge macros in the given string.
 *
 * @param {Graph} rdfGraph
 * The graph to display.
 *
 * @param {Profile} profile
 * The profile to use to shrink edge values.
 *
 * @param {String} edgeId
 * The ID of the edge to display.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
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

/**
 * Replaces color macros in the given string.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
function colorReplacement(s) {
    const colorRegex = /^\$color\((.*)\)$/;
    if (colorRegex.test(s)) {
        const [, color] = colorRegex.exec(s);
        const result = predefinedColors[color];
        if (result) {
            return result;
        }
        throw new Error(`Invalid color: ${color}`);
    }
    return s;
}

/**
 * Replaces ID macros in the given string.
 *
 * @param {String} id
 * The ID to put in.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
const idReplacement = _.curry(function (id, s) {
    const idRegex = /\$id/g;
    if (idRegex.test(s)) {
        return s.replace(idRegex, id);
    }
    return s;
});

/**
 * Replaces nodeToNT macros in the given string.
 *
 * @param {String} id
 * The ID of the node.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
const nodeToNTReplacement = _.curry(function (id, s) {
    const toNTRegex = /\$toNT/g;

    if (toNTRegex.test(s)) {
        const rdfNode = makeRDFNode(id);
        return s.replace(toNTRegex, rdfNode.toNT());
    }
    return s;
});

/**
 * Replaces nodeToString macros in the given string.
 *
 * @param {String} id
 * The ID of the node.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
const nodeToStringReplacement = _.curry(function (id, s) {
    const toStringRegex = /\$toString/g;
    if (toStringRegex.test(s)) {
        const rdfNode = makeRDFNode(id);
        return s.replace(toStringRegex, rdfNode.toString());
    }
    return s;
});

/**
 * Replaces nodeToShortString macros in the given string.
 *
 * @param {Profile} profile
 * The profile to use to shrink node values.
 *
 * @param {String} id
 * The ID to put in.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
const nodeToShortStringReplacement = _.curry(function (profile, id, s) {
    const toShortStringRegex = /\$toShortString/g;
    if (toShortStringRegex.test(s)) {
        const rdfNode = makeRDFNode(id);
        return s.replace(toShortStringRegex, profile.nodeToString(rdfNode));
    }
    return s;
});

/**
 * Replaces edgeToNT macros in the given string.
 *
 * @param {Graph} rdfGraph
 * The graph to display.
 *
 * @param {String} id
 * The ID of the edge.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
const edgeToNTReplacement = _.curry(function (rdfGraph, id, s) {
    const toNTRegex = /\$toNT/g;

    if (toNTRegex.test(s)) {
        const {predicate} = rdfGraph.getTripleById(id);
        return s.replace(toNTRegex, predicate.toNT());
    }
    return s;
});

/**
 * Replaces edgeToString macros in the given string.
 *
 * @param {Graph} rdfGraph
 * The graph to display.
 *
 * @param {String} id
 * The ID of the edge.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
const edgeToStringReplacement = _.curry(function (rdfGraph, id, s) {
    const toStringRegex = /\$toString/g;
    if (toStringRegex.test(s)) {
        const {predicate} = rdfGraph.getTripleById(id);
        return s.replace(toStringRegex, predicate.toString());
    }
    return s;
});

/**
 * Replaces edgeToShortString macros in the given string.
 *
 * @param {Graph} rdfGraph
 * The graph to display.
 *
 * @param {Profile} profile
 * The profile to use to shrink the edge value.
 *
 * @param {String} id
 * The ID of the edge.
 *
 * @param {String} s
 * The string to parse.
 *
 * @return {String}
 * The updated string.
 */
const edgeToShortStringReplacement = _.curry(function (rdfGraph, profile, id, s) {
    const toShortStringRegex = /\$toShortString/g;
    if (toShortStringRegex.test(s)) {
        const {predicate} = rdfGraph.getTripleById(id);
        return s.replace(toShortStringRegex, profile.nodeToString(predicate));
    }
    return s;
});

/**
 * Creates an RDFNode from the given hash.
 *
 * @param {String} hash
 * The hashed node.
 *
 * @return {RDFNode}
 * The created RDFNode.
 */
function makeRDFNode(hash) {
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

/**
 * Traverses the given value and calls the given function on any string it
 * finds.
 *
 * @param {Function} f
 * The function to call.
 *
 * @param {*} p
 * The value to traverse.
 */
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
