'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Editor$Monaco = require("./Editor.bs.js");

ReactDom.render(React.createElement(React.StrictMode, {
          children: React.createElement(Editor$Monaco.make, {})
        }), Caml_option.nullable_to_opt(document.querySelector("#root")));

/*  Not a pure module */
