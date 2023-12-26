

import * as Antd from "antd";
import * as React from "react";
import * as UserUtils$Frontend from "../../utils/UserUtils.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

import 'antd/dist/reset.css'
;

function Nav(Props) {
  var currentKeyOpt = Props.currentKey;
  var navTargetOpt = Props.navTarget;
  var account = Props.account;
  var currentKey = currentKeyOpt !== undefined ? currentKeyOpt : "1";
  var navTarget = navTargetOpt !== undefined ? navTargetOpt : NullableSt$Meta3dCommonlib.getEmpty(undefined);
  return React.createElement(Antd.Space, {
              direction: "horizontal",
              children: null
            }, React.createElement(Antd.Button, {
                  onClick: (function (param) {
                      RescriptReactRouter.push("/");
                    }),
                  children: React.createElement(Antd.Typography.Title, {
                        level: 3,
                        children: "Meta3D"
                      }),
                  type: "text"
                }), React.createElement("section", {
                  ref: navTarget
                }, React.createElement(Antd.Menu, {
                      theme: "light",
                      mode: "horizontal",
                      defaultSelectedKeys: ["1"],
                      selectedKeys: [currentKey],
                      items: UserUtils$Frontend.isAdmin(account) ? [
                          {
                            key: "1",
                            label: "用户中心"
                          },
                          {
                            key: "2",
                            label: "发布的编辑器"
                          },
                          {
                            key: "3",
                            label: "扩展市场"
                          },
                          {
                            key: "4",
                            label: "贡献市场"
                          },
                          {
                            key: "5",
                            label: "包市场"
                          }
                        ] : [
                          {
                            key: "1",
                            label: "用户中心"
                          },
                          {
                            key: "2",
                            label: "发布的编辑器"
                          }
                        ],
                      onClick: (function (param) {
                          switch (param.key) {
                            case "1" :
                                return RescriptReactRouter.push("/");
                            case "2" :
                                return RescriptReactRouter.push("/ShowPublishedApps");
                            case "3" :
                                return RescriptReactRouter.push("/ExtensionMarket");
                            case "4" :
                                return RescriptReactRouter.push("/ContributeMarket");
                            case "5" :
                                return RescriptReactRouter.push("/PackageMarket");
                            default:
                              return RescriptReactRouter.push("/");
                          }
                        })
                    })));
}

var make = Nav;

export {
  make ,
}
/*  Not a pure module */
