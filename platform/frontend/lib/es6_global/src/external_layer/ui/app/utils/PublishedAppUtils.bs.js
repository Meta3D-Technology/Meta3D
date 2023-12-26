

import * as Most from "most";
import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_promise from "../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Main$Meta3d from "../../../../../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as ImportUtils$Frontend from "./ImportUtils.bs.js";
import * as AppStoreType$Frontend from "./utils/assemble_space/AppStoreType.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as UIControlUtils$Frontend from "./UIControlUtils.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

function buildKey(account, appName) {
  return "" + account + "_" + appName + "";
}

function buildURL(account, appName) {
  return "EnterApp?account=" + account + "&appName=" + appName + "";
}

function _generateAppId(account, appName) {
  return "" + account + "_" + appName + "";
}

function importApp(service, param, param$1, notUseCacheForFindApp, release, item) {
  var onFinish = param$1[1];
  var setDownloadProgress = param$1[0];
  var dispatchForElementAssembleStore = param[2];
  var dispatchForApAssembleStore = param[1];
  var dispatch = param[0];
  var __x = service.backend.findPublishApp((function (progress) {
          Curry._1(setDownloadProgress, (function (param) {
                  return progress;
                }));
        }), item.account, item.appName, notUseCacheForFindApp);
  var __x$1 = Most.flatMap((function (file) {
          Curry._1(dispatch, {
                RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                _1: /* MarkUseCacheForFindApp */7
              });
          if (NullableSt$Meta3dCommonlib.isNullable(file)) {
            Curry._1(onFinish, undefined);
            Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("account: " + item.account + " appName: " + item.appName + " has no published app", "", "", "", "")));
            return Most.empty();
          }
          var match = Main$Meta3d.getAllDataOfApp(NullableSt$Meta3dCommonlib.getExn(file));
          var configData = match[2];
          Curry._1(dispatchForApAssembleStore, {
                TAG: /* SetApInspectorData */13,
                _0: configData[1]
              });
          Curry._1(dispatch, {
                RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                _1: {
                  TAG: /* SelectAllElements */8,
                  _0: ListSt$Meta3dCommonlib.fromArray(match[3])
                }
              });
          Curry._1(dispatchForElementAssembleStore, {
                TAG: /* SetCanvasData */10,
                _0: configData[0]
              });
          return Most.just([
                      match[0],
                      match[1]
                    ]);
        }), __x);
  var __x$2 = ImportUtils$Frontend.importApp([
        service,
        [
          (function (param) {
              
            }),
          (function (selectedExtensions, selectedContributes, selectedPackages) {
              Curry._1(dispatch, {
                    RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                    _1: {
                      TAG: /* ImportApp */11,
                      _0: _generateAppId(item.account, item.appName),
                      _1: item.appName,
                      _2: selectedExtensions,
                      _3: selectedContributes,
                      _4: selectedPackages
                    }
                  });
            }),
          (function (packageIds) {
              Curry._1(dispatchForApAssembleStore, {
                    TAG: /* BatchStorePackagesInApp */21,
                    _0: packageIds
                  });
            })
        ]
      ], __x$1);
  var __x$3 = Js_promise.then_((function (param) {
          return UIControlUtils$Frontend.selectAllUIControls(service, dispatch, release);
        }), __x$2);
  var __x$4 = Js_promise.then_((function (param) {
          Curry._1(onFinish, undefined);
          RescriptReactRouter.push("/AssembleSpace");
          return Promise.resolve(undefined);
        }), __x$3);
  Js_promise.$$catch((function (e) {
          return service.console.errorWithExn(e, undefined);
        }), __x$4);
}

export {
  buildKey ,
  buildURL ,
  _generateAppId ,
  importApp ,
}
/* most Not a pure module */
