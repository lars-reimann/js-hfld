// import 'systemjs-hot-reloader/default-listener.js';

// export function __reload(m) {
//   if (m.component.state)
//     component.setState(m.component.state);
// }

import "bootstrap/dist/css/bootstrap.css!";
import "bootstrap/dist/css/bootstrap-theme.css!";

import React    from "react";
import ReactDOM from "react-dom";

import {AppWrapper} from "./containers/containers.js";

ReactDOM.render(
    <AppWrapper />,
    document.getElementById("container")
);