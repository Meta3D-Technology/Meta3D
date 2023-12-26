

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";

import 'antd/dist/reset.css'
;

function StepContent(Props) {
  var onStartFunc = Props.onStartFunc;
  var title = Props.title;
  var description = Props.description;
  return React.createElement(Antd.Layout, {
              children: React.createElement(Antd.Space, {
                    direction: "horizontal",
                    children: null
                  }, React.createElement(Antd.Space, {
                        direction: "vertical",
                        children: null
                      }, React.createElement(Antd.Typography.Title, {
                            level: 3,
                            children: "" + title + ""
                          }), React.createElement(Antd.Typography.Text, {
                            children: "" + description + ""
                          })), onStartFunc !== undefined ? React.createElement(Antd.Badge, {
                          dot: true,
                          children: React.createElement(Antd.Button, {
                                onClick: (function (param) {
                                    Curry._1(onStartFunc, undefined);
                                  }),
                                children: "开始引导",
                                type: "primary"
                              })
                        }) : null)
            });
}

var make = StepContent;

export {
  make ,
}
/*  Not a pure module */
