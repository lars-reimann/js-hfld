import {enqueueAlert}             from "./alertActions.js";
import {parseTurtle, writeTurtle} from "./rdfActions.js";
import dispatcher                 from "../dispatcher/dispatcher.js";

export function close() {
    dispatcher.dispatch({ type: "CLOSE" });
}

export function openDirect(s) {console.log(s);
    parseTurtle(s);
}

export function openFile(file) {
    const reader   = new FileReader();
    reader.onload  = () => parseTurtle(reader.result);
    reader.onerror = () => enqueueAlert(reader.error.message);

    reader.readAsText(file);
}

export function openURL(url) {
    fetch(url, {mode: "cors"})
        .then(res  => res.text())
        .then(s    => parseTurtle(s))
        .catch(err => enqueueAlert("danger", err.message));
}

export function save(graph, profile, filename) {
    const text    = writeTurtle(graph, profile);
    const element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export function setPermanentLeftSidebar(enabled) {
    dispatcher.dispatch({ type: "SET_PERMANENT_LEFT_SIDEBAR", enabled });
}

export function setPermanentMenubar(enabled) {
    dispatcher.dispatch({ type: "SET_PERMANENT_MENUBAR", enabled });
}

export function setPermanentRightSidebar(enabled) {
    dispatcher.dispatch({ type: "SET_PERMANENT_RIGHT_SIDEBAR", enabled });
}

export function setShrinkNodeValuesInTable(enabled) {
    dispatcher.dispatch({ type: "SET_SHRINK_NODE_VALUES_IN_TABLE", enabled });
}

export function setTableSorting(sorting) {
    dispatcher.dispatch({ type: "SET_TABLE_SORTING", sorting });
}

export function setViewport(viewport) {
    dispatcher.dispatch({ type: "SET_VIEWPORT", viewport });
}