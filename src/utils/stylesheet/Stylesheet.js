import {adjustConf} from "@ignavia/draph";

import EdgeSelector from "./EdgeSelector.js";
import NodeSelector from "./NodeSelector.js";

const defaultConf = {
  "node": [
    {
      "selector": "*",
      "properties": {
        "style": {
          "type": "labelled",
          "conf": {
            "text": {
              "label": "$toShortString",
              "fillColor": "$color(maroon)",
              "stroke": {
                "color": "$color(black)",
                "thickness": 1
              }
            },
            "box": {
              "backgroundColor": "$color(pink)",
              "shape": "roundedRect",
              "border": {
                "radius": 10
              }
            }
          }
        }
      }
    }
  ],
  "edge": [
    {
      "selector": "*",
      "properties": {}
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

    computeAllStyles(rdfGraph) {
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
                result.set(nodeId, adjustConf(conf, properties));
            }
        }

        // TODO: resolve macros

        return result;
    }

    computeEdgeStyles(rdfGraph) {
        const result = new Map();

        for (let {selector, properties} of this.edgeRules) {
            for (let edgeId of selector.getAffectedEdges(rdfGraph)) {
                const conf = result.get(edgeId) || {};
                result.set(edgeId, adjustConf(conf, properties));
            }
        }

        // TODO: resolve macros

        return result;
    }

    computeNodeStyle(rdfGraph, nodeId) {
        let result = {};

        for (let {selector, properties} of this.nodeConfs) {
            if (selector.isAffectedNode(rdfGraph, nodeId)) {
                result = adjustConf(result, properties);
            }
        }

        return result;
    }

    computeEdgeStyle(rdfGraph, edgeId) {
        let result = {};

        for (let {selector, properties} of this.edgeConfs) {
            if (selector.isAffectedEdge(rdfGraph, edgeId)) {
                result = adjustConf(result, properties);
            }
        }

        return result;
    }
}
