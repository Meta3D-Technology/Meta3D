

import * as Most from "most";
import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_promise from "../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Main$Meta3d from "../../../../../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as IdUtils$Frontend from "./utils/IdUtils.bs.js";
import * as MostUtils$Frontend from "./MostUtils.bs.js";
import * as CacheUtils$Frontend from "./CacheUtils.bs.js";
import * as AppStoreType$Frontend from "./utils/assemble_space/AppStoreType.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function _getAllUIControlData(param) {
  return {
          hd: [
            "meta3d-ui-control-asset",
            "meta3d-ui-control-asset-protocol"
          ],
          tl: {
            hd: [
              "meta3d-ui-control-button",
              "meta3d-ui-control-button-protocol"
            ],
            tl: {
              hd: [
                "meta3d-ui-control-collapsing",
                "meta3d-ui-control-collapsing-protocol"
              ],
              tl: {
                hd: [
                  "meta3d-ui-control-game-view",
                  "meta3d-ui-control-game-view-protocol"
                ],
                tl: {
                  hd: [
                    "meta3d-ui-control-image-button",
                    "meta3d-ui-control-image-button-protocol"
                  ],
                  tl: {
                    hd: [
                      "meta3d-ui-control-input-float3",
                      "meta3d-ui-control-input-float3-protocol"
                    ],
                    tl: {
                      hd: [
                        "meta3d-ui-control-input-text",
                        "meta3d-ui-control-input-text-protocol"
                      ],
                      tl: {
                        hd: [
                          "meta3d-ui-control-menu",
                          "meta3d-ui-control-menu-protocol"
                        ],
                        tl: {
                          hd: [
                            "meta3d-ui-control-scene-view",
                            "meta3d-ui-control-scene-view-protocol"
                          ],
                          tl: {
                            hd: [
                              "meta3d-ui-control-switch-button",
                              "meta3d-ui-control-switch-button-protocol"
                            ],
                            tl: {
                              hd: [
                                "meta3d-ui-control-tree",
                                "meta3d-ui-control-tree-protocol"
                              ],
                              tl: {
                                hd: [
                                  "meta3d-ui-control-window",
                                  "meta3d-ui-control-window-protocol"
                                ],
                                tl: /* [] */0
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        };
}

function selectAllUIControls(service, dispatch, release) {
  var version = OptionSt$Meta3dCommonlib.map(release, (function (param) {
          return param.version;
        }));
  var __x = CacheUtils$Frontend.getAllUIControls(version);
  var __x$1 = Js_promise.then_((function (data) {
          var match = OptionSt$Meta3dCommonlib.fromNullable(data);
          if (match !== undefined) {
            return Promise.resolve([
                        match[0],
                        match[1]
                      ]);
          }
          var __x = ListSt$Meta3dCommonlib.traverseReducePromiseM(_getAllUIControlData(undefined), [
                /* [] */0,
                /* [] */0
              ], (function (param, param$1) {
                  var protocolName = param$1[1];
                  var files = param[1];
                  var jsons = param[0];
                  var __x = service.backend.findNewestPublishContribute((function (progress) {
                          
                        }), param$1[0], protocolName);
                  var __x$1 = MostUtils$Frontend.toPromise(Most.map((function (param) {
                              var match = param[1];
                              var match$1 = param[0];
                              return [
                                      JSON.stringify([
                                            [
                                              match$1[0],
                                              match$1[1],
                                              match$1[2],
                                              match$1[3],
                                              match$1[5]
                                            ],
                                            [
                                              protocolName,
                                              match[0],
                                              match[1]
                                            ],
                                            param[2]
                                          ]),
                                      match$1[4]
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
                        var __x = CacheUtils$Frontend.cacheAllUIControls(version, jsons, files);
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
          return Promise.resolve(ListSt$Meta3dCommonlib.fromArray(ArraySt$Meta3dCommonlib.reduceOneParami(param[0], (function (allUIControls, json, i) {
                                var file = ArraySt$Meta3dCommonlib.getExn(files, i);
                                var match = JSON.parse(json);
                                var match$1 = match[1];
                                var match$2 = match[0];
                                return ArraySt$Meta3dCommonlib.push(allUIControls, [
                                            {
                                              id: IdUtils$Frontend.generateId(function (prim) {
                                                    return Math.random();
                                                  }),
                                              protocolName: match$1[0],
                                              protocolVersion: match$1[1],
                                              protocolIconBase64: match$1[2],
                                              data: Main$Meta3d.loadContribute(file),
                                              version: match$2[3],
                                              account: match$2[4]
                                            },
                                            OptionSt$Meta3dCommonlib.fromNullable(match[2])
                                          ]);
                              }), [])));
        }), __x$1);
  return Js_promise.then_((function (allUIControls) {
                Curry._1(dispatch, {
                      RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                      _1: {
                        TAG: /* SelectAllUIControls */14,
                        _0: allUIControls
                      }
                    });
                return Promise.resolve(undefined);
              }), __x$2);
}

export {
  _getAllUIControlData ,
  selectAllUIControls ,
}
/* most Not a pure module */
