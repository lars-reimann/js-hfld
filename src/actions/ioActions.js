import {TurtleReader} from "@ignavia/rdf";

import {enqueueAlert} from "./alertActions.js";
import dispatcher     from "../dispatcher/dispatcher.js";

// General --------------------------------------------------------------------

function openFile(file, resolve) {
    const reader   = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = () => enqueueAlert("danger", reader.error.message);
    reader.readAsText(file);
}

function openURL(url, resolve) {
    fetch(url, {mode: "cors"})
        .then(res => res.text())
        .then(resolve)
        .catch(err => enqueueAlert("danger", err.message));
}

function download(text, filename) {
    const element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Config ---------------------------------------------------------------------

function parseConfig(s) {
    try {
        const config = JSON.parse(s);
        dispatcher.dispatch({ type: "OPEN_CONFIG", config });
    } catch (err) {
        enqueueAlert("danger", err.message);
    }
}

function writeConfig(config) {
    return JSON.stringify(config);
}

export function openConfigDirect(s) {
    parseConfig(s);
}

export function openConfigFile(file) {
    openFile(file, parseConfig);
}

export function openConfigURL(url) {
    openURL(url, parseConfig);
}

export function saveConfig(config, filename) {
    const text = writeConfig(config);
    download(text, filename);
}

// Layout ---------------------------------------------------------------------

// Style ----------------------------------------------------------------------

// Turtle ---------------------------------------------------------------------

const parser = new TurtleReader();

export function parseTurtle(s) {
    parser.parse(s)
        .then(result => dispatcher.dispatch({ type: "OPEN_TURTLE", result }))
        .catch(err   => enqueueAlert("danger", err.message));
}

export function openTurtleDirect(s) {
    parseTurtle(s);
}

export function openTurtleFile(file) {
    openFile(file, parseTurtle);
}

export function openTurtleURL(url) {
    openURL(url, parseTurtle);
}

export function saveTurtle(rdf, filename) {
    const text = rdf.toString();
    download(text, filename);
}

// Close ----------------------------------------------------------------------

export function close() {
    dispatcher.dispatch({ type: "CLOSE" });
}