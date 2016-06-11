import {TurtleReader} from "@ignavia/rdf";

import {enqueueAlert} from "./alertActions.js";
import dispatcher     from "../dispatcher/dispatcher.js";

// General --------------------------------------------------------------------

/**
 * Opens the given file and calls the resolve function on success. If there is
 * an error, an alert message is shown.
 *
 * @param {File} file
 * The file to open.
 *
 * @param {Function} resolve
 * The function to call on success.
 */
function openFile(file, resolve) {
    const reader   = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = () => enqueueAlert("danger", reader.error.message);
    reader.readAsText(file);
}

/**
 * Loads data from the given URL and calls the resolve function on success. If
 * there is an error, an alert message is shown.
 *
 * @param {String} url
 * The URL to open.
 *
 * @param {Function} resolve
 * The function to call on success.
 */
function openURL(url, resolve) {
    fetch(url, {mode: "cors"})
        .then(res => res.text())
        .then(resolve)
        .catch(err => enqueueAlert("danger", err.message));
}

/**
 * Offers the user to download the given text as a file with the given name.
 *
 * @param {String} content
 * The content of the file.
 *
 * @param {String} filename
 * The name the file should have.
 */
function download(content, filename) {
    const element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Config ---------------------------------------------------------------------

/**
 * Parses the configuration and dispatches the appropriate action.
 *
 * @param {String} s
 * The stringified configuration.
 */
function parseConfig(s) {
    try {
        const config = JSON.parse(s);
        dispatcher.dispatch({ type: "OPEN_CONFIG", config });
    } catch (err) {
        enqueueAlert("danger", err.message);
    }
}

/**
 * Stringifies the given configuration.
 *
 * @param {Object} config
 * The config to stringify.
 */
function writeConfig(config) {
    return JSON.stringify(config);
}

/**
 * Sets the given string as new configuration.
 *
 * @param {String} s
 * The stringified configuration.
 */
export function openConfigDirect(s) {
    parseConfig(s);
}

/**
 * Sets the content of the given file as new configuration.
 *
 * @param {File} file
 * The file containing the configuration.
 */
export function openConfigFile(file) {
    openFile(file, parseConfig);
}

/**
 * Sets the content of the response from the given URL as new configuration.
 *
 * @param {String} url
 * The URL to open.
 */
export function openConfigURL(url) {
    openURL(url, parseConfig);
}

/**
 * Saves the given configuration to a file with the given name.
 *
 * @param {Object} config
 * The configuration to save.
 *
 * @param {String} filename
 * The name of the file.
 */
export function saveConfig(config, filename) {
    const text = writeConfig(config);
    download(text, filename);
}

// Layout ---------------------------------------------------------------------

// Style ----------------------------------------------------------------------

// Turtle ---------------------------------------------------------------------

const parser = new TurtleReader();

/**
 * Parses the given Turtle data and dispatches the appropriate action.
 *
 * @param {String} s
 * The Turtle data.
 */
export function parseTurtle(s) {
    parser.parse(s)
        .then(result => dispatcher.dispatch({ type: "OPEN_TURTLE", result }))
        .catch(err   => enqueueAlert("danger", err.message));
}

/**
 * Sets the graph and profile to the result of parsing the given string.
 *
 * @param {String} s
 * The string to parse.
 */
export function openTurtleDirect(s) {
    parseTurtle(s);
}

/**
 * Sets the graph and profile to the result of parsing the content of the given
 * file.
 *
 * @param {File} file
 * The file to parse.
 */
export function openTurtleFile(file) {
    openFile(file, parseTurtle);
}

/**
 * Sets the graph and profile to the result of parsing the content of the
 * response from the given URL.
 *
 * @param {String} url
 * The URL to get data from.
 */
export function openTurtleURL(url) {
    openURL(url, parseTurtle);
}

/**
 * Stringifies the current graph and save it in a file with the given name.
 *
 * @param {*} rdf
 * The RDF store.
 *
 * @param {String} filename
 * The name of the file.
 */
export function saveTurtle(rdf, filename) {
    const text = rdf.toString();
    download(text, filename);
}

// Close ----------------------------------------------------------------------

/**
 * Clears the data currently in the stores of this app.
 */
export function close() {
    dispatcher.dispatch({ type: "CLOSE" });
}