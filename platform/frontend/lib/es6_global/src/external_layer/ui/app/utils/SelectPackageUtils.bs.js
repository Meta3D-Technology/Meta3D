

import * as Most from "most";
import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_promise from "../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as IdUtils$Frontend from "./utils/IdUtils.bs.js";
import * as MostUtils$Frontend from "./MostUtils.bs.js";
import * as CacheUtils$Frontend from "./CacheUtils.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as AppStoreType$Frontend from "./utils/assemble_space/AppStoreType.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as InitPackageUtils$Frontend from "./InitPackageUtils.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

function selectEditorWholeAndEngineWholePackages(service, dispatch, release) {
  var version = OptionSt$Meta3dCommonlib.map(release, (function (param) {
          return param.version;
        }));
  var __x = CacheUtils$Frontend.getPackages(version);
  var __x$1 = Js_promise.then_((function (data) {
          var match = OptionSt$Meta3dCommonlib.fromNullable(data);
          if (match !== undefined) {
            return Promise.resolve([
                        match[0],
                        match[1]
                      ]);
          }
          var __x = ListSt$Meta3dCommonlib.traverseReducePromiseM(InitPackageUtils$Frontend.getEditorWholeAndEngineWholePackageData(undefined), [
                /* [] */0,
                /* [] */0
              ], (function (param, param$1) {
                  var protocolName = param$1[2];
                  var entryExtensionName = param$1[1];
                  var name = param$1[0];
                  var files = param[1];
                  var jsons = param[0];
                  var __x = service.backend.findNewestPublishPackage((function (progress) {
                          
                        }), protocolName, name);
                  var __x$1 = MostUtils$Frontend.toPromise(Most.map((function (data) {
                              if (NullableSt$Meta3dCommonlib.isNullable(data)) {
                                Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("package not exist", "", "", "", "protocolName: " + protocolName + ", name: " + name + "")));
                              }
                              var match = NullableSt$Meta3dCommonlib.getExn(data);
                              return [
                                      JSON.stringify([
                                            name,
                                            entryExtensionName,
                                            protocolName,
                                            match[1],
                                            match[2],
                                            match[3],
                                            match[4]
                                          ]),
                                      match[0]
                                    ];
                            }), __x));
                  return Js_promise.then_((function (param) {
                                return Promise.resolve([
                                            ListSt$Meta3dCommonlib.push(jsons, param[0]),
                                            ListSt$Meta3dCommonlib.push(files, param[1])
                                          ]);
                              }), __x$1);
                }));
          return Js_promise.then_((function (param) {
                        var jsons = ListSt$Meta3dCommonlib.toArray(param[0]);
                        var files = ListSt$Meta3dCommonlib.toArray(param[1]);
                        var __x = CacheUtils$Frontend.cachePackages(version, jsons, files);
                        return Js_promise.then_((function (param) {
                                      return Promise.resolve([
                                                  jsons,
                                                  files
                                                ]);
                                    }), __x);
                      }), __x);
        }), __x);
  var __x$2 = Js_promise.then_((function (param) {
          var files = param[1];
          return Promise.resolve(ListSt$Meta3dCommonlib.fromArray(ArraySt$Meta3dCommonlib.reduceOneParami(param[0], (function (packages, json, i) {
                                var file = ArraySt$Meta3dCommonlib.getExn(files, i);
                                var match = JSON.parse(json);
                                return ArraySt$Meta3dCommonlib.push(packages, {
                                            id: IdUtils$Frontend.generateId(function (prim) {
                                                  return Math.random();
                                                }),
                                            protocol: {
                                              version: match[3],
                                              name: match[2],
                                              iconBase64: match[5]
                                            },
                                            entryExtensionName: match[1],
                                            version: match[4],
                                            name: match[0],
                                            binaryFile: file,
                                            isStart: false,
                                            protocolConfigStr: match[6]
                                          });
                              }), [])));
        }), __x$1);
  return Js_promise.then_((function (editorWholeAndEngineWholePackages) {
                Curry._1(dispatch, {
                      RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                      _1: {
                        TAG: /* SetPackages */15,
                        _0: editorWholeAndEngineWholePackages
                      }
                    });
                return Promise.resolve(undefined);
              }), __x$2);
}

export {
  selectEditorWholeAndEngineWholePackages ,
}
/* most Not a pure module */
