import {enqueueAlert}             from "./alertActions.js";
import {parseTurtle, writeTurtle} from "./rdfActions.js";
import dispatcher                 from "../dispatcher/dispatcher.js";

function download(text, filename) {
    const element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export function close() {
    dispatcher.dispatch({ type: "CLOSE" });
}

// Config ---------------------------------------------------------------------

// Layout ---------------------------------------------------------------------

// Style ----------------------------------------------------------------------

// Turtle ---------------------------------------------------------------------

export function openTurtleDirect(s) {
    parseTurtle(s);
}

export function openTurtleFile(file) {
    const reader   = new FileReader();
    reader.onload  = () => parseTurtle(reader.result);
    reader.onerror = () => enqueueAlert(reader.error.message);

    reader.readAsText(file);
}

export function openTurleURL(url) {
    fetch(url, {mode: "cors"})
        .then(res  => res.text())
        .then(s    => parseTurtle(s))
        .catch(err => enqueueAlert("danger", err.message));
}

export function saveTurtle(graph, profile, filename) {
    const text = writeTurtle(graph, profile);
    download(text, filename);
}