

import * as TextDecoder$Meta3d from "../../../../../../../node_modules/meta3d/lib/es6_global/src/file/TextDecoder.bs.js";
import * as TextEncoder$Meta3d from "../../../../../../../node_modules/meta3d/lib/es6_global/src/file/TextEncoder.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as BinaryFileOperator$Meta3d from "../../../../../../../node_modules/meta3d/lib/es6_global/src/file/BinaryFileOperator.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";

function _checkSizeEqual(glbIds, glbNames, glbs) {
  if (ArraySt$Meta3dCommonlib.length(glbIds) === ArraySt$Meta3dCommonlib.length(glbs) && ArraySt$Meta3dCommonlib.length(glbIds) === ArraySt$Meta3dCommonlib.length(glbNames)) {
    return ;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("size not equal", "", "", "", "")));
  }
}

function getExtensionService(api) {
  return {
          loadGlb: (function (meta3dState, glb){
      return api.getExtensionService(
        meta3dState,
        "meta3d-load-glb-protocol",
      ).loadGlb(meta3dState, glb)
  }),
          addGLBAsset: (function (meta3dState, glb, glbId, glbName) {
              var state = api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              return api.setExtensionState(meta3dState, "meta3d-asset-protocol", {
                          allGLBAssets: ListSt$Meta3dCommonlib.push(state.allGLBAssets, [
                                glbId,
                                glbName,
                                glb
                              ])
                        });
            }),
          removeGLBAsset: (function (meta3dState, glbId) {
              var state = api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              return api.setExtensionState(meta3dState, "meta3d-asset-protocol", {
                          allGLBAssets: ListSt$Meta3dCommonlib.filter(state.allGLBAssets, (function (param) {
                                  return param[0] !== glbId;
                                }))
                        });
            }),
          getAllGLBAssets: (function (meta3dState) {
              var state = api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              return ListSt$Meta3dCommonlib.toArray(state.allGLBAssets);
            }),
          exportAsset: (function (meta3dState) {
              var match = api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              var encoder = new TextEncoder();
              var match$1 = ListSt$Meta3dCommonlib.reduce(match.allGLBAssets, [
                    [],
                    [],
                    []
                  ], (function (param, param$1) {
                      return [
                              ArraySt$Meta3dCommonlib.push(param[0], param$1[0]),
                              ArraySt$Meta3dCommonlib.push(param[1], param$1[1]),
                              ArraySt$Meta3dCommonlib.push(param[2], param$1[2])
                            ];
                    }));
              return BinaryFileOperator$Meta3d.generate([
                          TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(match$1[0]), encoder),
                          TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(match$1[1]), encoder),
                          new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.map(match$1[2], (function (data) {
                                          return new Uint8Array(data);
                                        }))))
                        ]);
            }),
          importAsset: (function (meta3dState, assetFile) {
              api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              var decoder = new TextDecoder("utf-8");
              var match = BinaryFileOperator$Meta3d.load(assetFile);
              if (match.length !== 3) {
                throw {
                      RE_EXN_ID: "Match_failure",
                      _1: [
                        "Main.res",
                        109,
                        8
                      ],
                      Error: new Error()
                    };
              }
              var glbIdsUint8 = match[0];
              var glbNamesUint8 = match[1];
              var glbsUint8 = match[2];
              var glbIds = JSON.parse(TextDecoder$Meta3d.decodeUint8Array(glbIdsUint8, decoder));
              var glbNames = JSON.parse(TextDecoder$Meta3d.decodeUint8Array(glbNamesUint8, decoder));
              var glbs = ArraySt$Meta3dCommonlib.map(BinaryFileOperator$Meta3d.load(glbsUint8.buffer), (function (data) {
                      return data.buffer;
                    }));
              _checkSizeEqual(glbIds, glbNames, glbs);
              return api.setExtensionState(meta3dState, "meta3d-asset-protocol", {
                          allGLBAssets: ArraySt$Meta3dCommonlib.reduceOneParami(glbIds, (function (allGLBAssets, glbId, index) {
                                  return ListSt$Meta3dCommonlib.push(allGLBAssets, [
                                              glbId,
                                              ArraySt$Meta3dCommonlib.getExn(glbNames, index),
                                              ArraySt$Meta3dCommonlib.getExn(glbs, index)
                                            ]);
                                }), /* [] */0)
                        });
            })
        };
}

function createExtensionState(param) {
  return {
          allGLBAssets: /* [] */0
        };
}

function getExtensionLife(api, extensionProtocolName) {
  return {
          onRegister: null,
          onRestore: null,
          onDeepCopy: null,
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

export {
  _checkSizeEqual ,
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
}
/* No side effect */
