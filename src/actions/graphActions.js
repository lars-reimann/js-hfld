import dispatcher from "../dispatcher/dispatcher.js";

// Layout ---------------------------------------------------------------------

export function eadesLayout(conf) {
    dispatcher.dispatch({ type: "EADES_LAYOUT", conf});
}

export function fruchtermannLayout(conf) {
    dispatcher.dispatch({ type: "FRUCHTERMANN_LAYOUT", conf});
}

export function randomLayout(conf) {
    dispatcher.dispatch({ type: "RANDOM_LAYOUT", conf});
}

/**
 * Rotates the layout aorund the given point by the angle.
 *
 * @param {Number} angle
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
 * @param {Number} factor
 * The scalar to multiply the vector by.
 *
 * @param {Vec2} center
 * Where to start the scaling.
 */
export function scaleLayout(factor, center) {
    dispatcher.dispatch({ type: "SCALE", factor, center });
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