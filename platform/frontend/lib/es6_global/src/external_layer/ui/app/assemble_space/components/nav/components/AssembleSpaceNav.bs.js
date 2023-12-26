

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as GuideUtils$Frontend from "../../../../utils/GuideUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../utils/utils/ReduxUtils.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as AppStoreType$Frontend from "../../../../utils/utils/assemble_space/AppStoreType.bs.js";

import 'antd/dist/reset.css'
;

function AssembleSpaceNav(Props) {
  var service = Props.service;
  var currentKeyOpt = Props.currentKey;
  var appName = Props.appName;
  var assembleSpaceNavTarget = Props.assembleSpaceNavTarget;
  var currentKey = currentKeyOpt !== undefined ? currentKeyOpt : "2";
  var dispatchForAppStore = Curry._1(service.app.useDispatch, undefined);
  var dispatchForElementAssembleStore = ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  return React.createElement("section", {
              ref: assembleSpaceNavTarget
            }, React.createElement(Antd.Menu, {
                  theme: "light",
                  mode: "horizontal",
                  defaultSelectedKeys: ["2"],
                  selectedKeys: [currentKey],
                  items: [
                    {
                      key: "1",
                      label: "返回用户中心"
                    },
                    {
                      key: "2",
                      label: "" + appName + ""
                    }
                  ],
                  onClick: (function (param) {
                      switch (param.key) {
                        case "1" :
                            if (!GuideUtils$Frontend.readIsFinishCreateFromScratchTour(undefined)) {
                              Curry._1(dispatchForElementAssembleStore, /* EndCreateFromScratchTourPhase2 */4);
                              Curry._1(dispatchForAppStore, {
                                    RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                    _1: /* StartCreateFromScratchTourPhase3 */4
                                  });
                            }
                            return RescriptReactRouter.push("/UserCenter");
                        case "2" :
                            return RescriptReactRouter.push("/AssembleSpace");
                        default:
                          return RescriptReactRouter.push("/AssembleSpace");
                      }
                    })
                }));
}

var make = AssembleSpaceNav;

export {
  make ,
}
/*  Not a pure module */
