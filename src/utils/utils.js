export * as validators from "./validators.js";

export function getValidationStyle(valid) {
    return valid ? "success" : "error";
}

export function shrinkNodeValue(profile, enabled, node) {
    return (enabled ? profile.nodeToString(node) : node.toString());
}

// export function writeTurtle(graph, profile) {
//     return writer.serialize(graph, profile);
// }