

import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Main$Meta3d from "../../../../../../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as EnvUtils$Frontend from "../../utils/EnvUtils.bs.js";
import * as InitUtils$Frontend from "../../utils/InitUtils.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as AppStoreType$Frontend from "../../utils/utils/assemble_space/AppStoreType.bs.js";
import * as ElementUtils$Frontend from "../../utils/utils/ElementUtils.bs.js";
import * as MessageUtils$Frontend from "../../utils/utils/MessageUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as UrlSearchUtils$Frontend from "../../utils/utils/url/UrlSearchUtils.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

import 'antd/dist/reset.css'
;

function EnterApp(Props) {
  var service = Props.service;
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  var url = RescriptReactRouter.useUrl(undefined, undefined);
  var match = Curry._1(AppStore$Frontend.useSelector, (function (param) {
          var enterAppState = param.enterAppState;
          return [
                  param.userCenterState.notUseCacheForFindApp,
                  [
                    enterAppState.account,
                    enterAppState.appName
                  ]
                ];
        }));
  var notUseCacheForFindApp = match[0];
  var match$1 = React.useState(function () {
        return 0;
      });
  var setDownloadProgress = match$1[1];
  var match$2 = React.useState(function () {
        return false;
      });
  var setIsDownloadFinish = match$2[1];
  React.useEffect((function () {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  var account = UrlSearchUtils$Frontend.get(url.search, "account");
                  var appName = UrlSearchUtils$Frontend.get(url.search, "appName");
                  var __x = Most.drain(Curry._1(service.backend.init, InitUtils$Frontend.getBackendEnv(EnvUtils$Frontend.getEnv(undefined))));
                  var __x$1 = Js_promise.then_((function (param) {
                          var __x = service.backend.findPublishApp((function (progress) {
                                  Curry._1(setDownloadProgress, (function (param) {
                                          return progress;
                                        }));
                                }), account, appName, notUseCacheForFindApp);
                          return Most.observe((function (appBinaryFile) {
                                        Curry._1(dispatch, {
                                              RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                              _1: /* MarkUseCacheForFindApp */7
                                            });
                                        Curry._1(setIsDownloadFinish, (function (param) {
                                                return true;
                                              }));
                                        if (appBinaryFile == null) {
                                          return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("account: " + account + " appName: " + appName + " has no published app", "", "", "", "")));
                                        }
                                        var __x = NullableSt$Meta3dCommonlib.getExn(appBinaryFile);
                                        Main$Meta3d.startApp(Main$Meta3d.loadApp((function (allContributeDataArr, selectedElements) {
                                                    var selectedElement = ArraySt$Meta3dCommonlib.getExn(selectedElements, 0);
                                                    var customInputs = selectedElement.customInputs;
                                                    var customActions = selectedElement.customActions;
                                                    var funcs = [
                                                      Main$Meta3d.generateContribute,
                                                      Main$Meta3d.loadContribute,
                                                      Main$Meta3d.convertContributeFuncData
                                                    ];
                                                    var __x = ListSt$Meta3dCommonlib.fromArray(allContributeDataArr);
                                                    var __x$1 = ElementUtils$Frontend.addGeneratedInputContributesForRunApp(funcs, __x, account, ListSt$Meta3dCommonlib.fromArray(customInputs));
                                                    return ListSt$Meta3dCommonlib.toArray(ElementUtils$Frontend.addGeneratedActionContributesForRunApp(funcs, __x$1, account, ListSt$Meta3dCommonlib.fromArray(customActions)));
                                                  }), __x));
                                      }), __x);
                        }), __x);
                  Js_promise.$$catch((function (e) {
                          return service.console.errorWithExn(e, undefined);
                        }), __x$1);
                }), 5);
        }), []);
  return React.createElement(React.Fragment, undefined, match$2[0] ? null : React.createElement("p", undefined, "" + match$1[0].toString() + "% downloading..."));
}

var make = EnterApp;

export {
  make ,
}
/*  Not a pure module */
