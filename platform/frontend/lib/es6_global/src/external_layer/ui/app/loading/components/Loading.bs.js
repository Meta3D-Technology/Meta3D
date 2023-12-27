

import * as Antd from "antd";
import * as React from "react";

import 'antd/dist/reset.css'
;

var Method = {};

function Loading(Props) {
  var textOpt = Props.text;
  var text = textOpt !== undefined ? textOpt : "";
  return React.createElement(Antd.Row, {
              align: "middle",
              children: null
            }, React.createElement("img", {
                  height: "64px",
                  src: "/static/image/png/logo.png",
                  width: "64px"
                }), React.createElement("img", {
                  height: "100ps",
                  src: "/static/image/gif/loading.gif",
                  width: "100px"
                }), text);
}

var make = Loading;

export {
  Method ,
  make ,
}
/*  Not a pure module */
