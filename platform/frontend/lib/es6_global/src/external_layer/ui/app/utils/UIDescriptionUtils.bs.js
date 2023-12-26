

import * as Antd from "antd";
import * as React from "react";

import 'antd/dist/reset.css'
;

function build(account, repoLink, description) {
  return React.createElement(Antd.Space, {
              direction: "vertical",
              size: "middle",
              children: null
            }, React.createElement(Antd.Space, {
                  direction: "horizontal",
                  size: "small",
                  children: null
                }, repoLink === "" ? null : React.createElement(Antd.Typography.Link, {
                        href: repoLink,
                        target: "_blank",
                        children: "Repo|"
                      }), React.createElement(Antd.Typography.Text, {
                      children: "发布者：" + account + ""
                    })), React.createElement(Antd.Typography.Text, {
                  children: "" + description + ""
                }));
}

function buildWithoutRepoLink(account, description) {
  return React.createElement(Antd.Space, {
              direction: "vertical",
              size: "middle",
              children: null
            }, React.createElement(Antd.Typography.Text, {
                  children: "发布者：" + account + ""
                }), React.createElement(Antd.Typography.Text, {
                  children: "" + description + ""
                }));
}

export {
  build ,
  buildWithoutRepoLink ,
}
/*  Not a pure module */
