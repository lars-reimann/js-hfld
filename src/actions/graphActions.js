import dispatcher from "../dispatcher/dispatcher.js";

// Layout ---------------------------------------------------------------------

/**
 * Uses the Eades layout algorithm to position the nodes of the graph.
 *
 * @param {Object} conf
 * The configuration of the algorithm.
 */
export function eadesLayout(conf) {
    dispatcher.dispatch({ type: "EADES_LAYOUT", conf});
}

/**
 * Uses the Fruchterman-Reingold layout algorithm to position the nodes of the
 * graph.
 *
 * @param {Object} conf
 * The configuration of the algorithm.
 */
export function fruchtermanLayout(conf) {
    dispatcher.dispatch({ type: "FRUCHTERMAN_LAYOUT", conf});
}

/**
 * Randomly positions the nodes of the graph.
 *
 * @param {Object} conf
 * The configuration of the algorithm.
 */
export function randomLayout(conf) {
    dispatcher.dispatch({ type: "RANDOM_LAYOUT", conf});
}

/**
 * Rotates the layout around the given point by the angle.
 *
 * @param {number} angle
 * How far to rotate.
 *
 * @param {Vec2} center
 * The point to rotate around.
 */
export function rotateLayout(angle, center) {
    dispatcher.dispatch({ type: "ROTATE", angle, center });
}

/**
 * Scales the layout from the given center by the factor.
 *
 * @param {number} factorX
 * The scalar to multiply the x-component of the vector by.
 *
 * @param {number} factorY
 * The scalar to multiply the y-component of the vector by.
 *
 * @param {Vec2} center
 * Where to start the scaling.
 */
export function scaleLayout(factorX, factorY, center) {
    dispatcher.dispatch({ type: "SCALE", factorX, factorY, center });
}

/**
 * Moves the layout by the given vector.
 *
 * @param {Vec2} vec
 * The vector to add to the current positions.
 */
export function translateLayout(vec) {
    dispatcher.dispatch({ type: "TRANSLATE", vec });
}