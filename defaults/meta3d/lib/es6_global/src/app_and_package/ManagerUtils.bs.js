

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_array from "../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as LibUtils$Meta3d from "../file/LibUtils.bs.js";
import * as FileUtils$Meta3d from "../FileUtils.bs.js";
import * as TextDecoder$Meta3d from "../file/TextDecoder.bs.js";
import * as TextEncoder$Meta3d from "../file/TextEncoder.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ExtensionManager$Meta3d from "../ExtensionManager.bs.js";
import * as BinaryFileOperator$Meta3d from "../file/BinaryFileOperator.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function generate(param) {
  var encoder = new TextEncoder();
  return [
          new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.reduceOneParam(param[0], (function (result, param) {
                          return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(param[0]), encoder)), param[1]);
                        }), []))),
          new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.reduceOneParam(param[1], (function (result, param) {
                          return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(param[0]), encoder)), param[1]);
                        }), [])))
        ];
}

function mergeAllPackageBinaryFiles(param) {
  if (param.length !== 2) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            44,
            33
          ],
          Error: new Error()
        };
  }
  var allExtensionBinaryUint8File = param[0];
  var allContributeBinaryUint8File = param[1];
  return function (allPackageBinaryFiles) {
    return ArraySt$Meta3dCommonlib.reduceOneParam(allPackageBinaryFiles, (function (param, param$1) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            66,
                            4
                          ],
                          Error: new Error()
                        };
                  }
                  var allExtensionBinaryUint8File = param[0];
                  var allContributeBinaryUint8File = param[1];
                  var match = BinaryFileOperator$Meta3d.load(param$1);
                  if (match.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            67,
                            10
                          ],
                          Error: new Error()
                        };
                  }
                  var allExtensionBinaryUint8FileInPackage = match[0];
                  var allContributeBinaryUint8FileInPackage = match[1];
                  return [
                          new Uint8Array(BinaryFileOperator$Meta3d.generate(Js_array.concat(BinaryFileOperator$Meta3d.load(allExtensionBinaryUint8FileInPackage.buffer), BinaryFileOperator$Meta3d.load(allExtensionBinaryUint8File.buffer)))),
                          new Uint8Array(BinaryFileOperator$Meta3d.generate(Js_array.concat(BinaryFileOperator$Meta3d.load(allContributeBinaryUint8FileInPackage.buffer), BinaryFileOperator$Meta3d.load(allContributeBinaryUint8File.buffer))))
                        ];
                }), [
                allExtensionBinaryUint8File,
                allContributeBinaryUint8File
              ]);
  };
}

function getContributeFunc(contributeFuncData, decoder) {
  var lib = LibUtils$Meta3d.serializeLib(TextDecoder$Meta3d.decodeUint8Array(contributeFuncData, decoder), "Contribute");
  return LibUtils$Meta3d.getFuncFromLib(lib, "getContribute");
}

function _parse(param) {
  if (param.length !== 2) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            114,
            13
          ],
          Error: new Error()
        };
  }
  var allExtensionBinaryUint8File = param[0];
  var allContributeBinaryUint8File = param[1];
  var decoder = new TextDecoder("utf-8");
  return [
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allExtensionBinaryUint8File.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            126,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var extensionPackageData = param[0];
                  var extensionFuncData = param[1];
                  var lib = LibUtils$Meta3d.serializeLib(TextDecoder$Meta3d.decodeUint8Array(extensionFuncData, decoder), "Extension");
                  return {
                          extensionPackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(extensionPackageData, decoder))),
                          extensionFuncData: {
                            getExtensionServiceFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionService"),
                            createExtensionStateFunc: LibUtils$Meta3d.getFuncFromLib(lib, "createExtensionState"),
                            getExtensionLifeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionLife")
                          }
                        };
                })),
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allContributeBinaryUint8File.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            144,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var contributePackageData = param[0];
                  var contributeFuncData = param[1];
                  return {
                          contributePackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(contributePackageData, decoder))),
                          contributeFuncData: {
                            getContributeFunc: getContributeFunc(contributeFuncData, decoder)
                          }
                        };
                }))
        ];
}

function _prepare(param) {
  return {
          extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionLifeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          contributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

function _run(param) {
  var allExtensionDataArr = param[0];
  var state = ArraySt$Meta3dCommonlib.reduceOneParam(allExtensionDataArr, (function (state, param) {
          var extensionFuncData = param.extensionFuncData;
          var extensionPackageData = param.extensionPackageData;
          return ExtensionManager$Meta3d.registerExtension(state, extensionPackageData.protocolName, extensionFuncData.getExtensionServiceFunc, extensionFuncData.getExtensionLifeFunc, [
                      extensionPackageData.dependentExtensionNameMap,
                      extensionPackageData.dependentContributeNameMap
                    ], Curry._1(extensionFuncData.createExtensionStateFunc, undefined));
        }), _prepare(undefined));
  var state$1 = ArraySt$Meta3dCommonlib.reduceOneParam(param[1], (function (state, param) {
          var contributePackageData = param.contributePackageData;
          return ExtensionManager$Meta3d.registerContribute(state, contributePackageData.protocolName, param.contributeFuncData.getContributeFunc, [
                      contributePackageData.dependentExtensionNameMap,
                      contributePackageData.dependentContributeNameMap
                    ]);
        }), state);
  return [
          state$1,
          allExtensionDataArr
        ];
}

function load(data) {
  return _run(_parse(data));
}

function getSpecificExtensionProtocolName(allExtensionDataArr, extensionType) {
  var startExtensions = ArraySt$Meta3dCommonlib.filter(allExtensionDataArr, (function (param) {
          return param.extensionPackageData.type_ === extensionType;
        }));
  if (ArraySt$Meta3dCommonlib.length(startExtensions) !== 1) {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("should only has one type extension", "", "", "", "")));
  } else {
    return Caml_array.get(startExtensions, 0).extensionPackageData.protocolName;
  }
}

export {
  generate ,
  mergeAllPackageBinaryFiles ,
  getContributeFunc ,
  _parse ,
  _prepare ,
  _run ,
  load ,
  getSpecificExtensionProtocolName ,
}
/* No side effect */
