

import * as React from "react";
import * as ReactDom from "react-dom";
import * as Caml_option from "../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Editor$Monaco from "./Editor.bs.js";

ReactDom.render(React.createElement(React.StrictMode, {
          children: React.createElement(Editor$Monaco.make, {})
        }), Caml_option.nullable_to_opt(document.querySelector("#root")));

export {
  
}
/*  Not a pure module */
