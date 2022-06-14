

import * as Curry from "./../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as LibUtils$Meta3d from "../file/LibUtils.bs.js";
import * as FileUtils$Meta3d from "../FileUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ExtensionManager$Meta3d from "../ExtensionManager.bs.js";
import * as BinaryFileOperator$Meta3d from "../file/BinaryFileOperator.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function generate(allExtensionFileData, allContributeFileData) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate([
              new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.reduceOneParam(allExtensionFileData, (function (result, param) {
                              return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, encoder.encode(JSON.stringify(param[0]))), param[1]);
                            }), []))),
              new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.reduceOneParam(allContributeFileData, (function (result, param) {
                              return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, encoder.encode(JSON.stringify(param[0]))), param[1]);
                            }), [])))
            ]);
}

function _parse(appBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 2) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            47,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionBinaryTypeFile = match[0];
  var allContributeBinaryTypeFile = match[1];
  return [
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allExtensionBinaryTypeFile.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "AppManager.res",
                            54,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var extensionPackageData = param[0];
                  var extensionFuncData = param[1];
                  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(extensionFuncData), "Extension");
                  return {
                          extensionPackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(decoder.decode(extensionPackageData))),
                          extensionFuncData: {
                            getExtensionServiceFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionService"),
                            createExtensionStateFunc: LibUtils$Meta3d.getFuncFromLib(lib, "createExtensionState"),
                            getExtensionLifeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionLife")
                          }
                        };
                })),
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allContributeBinaryTypeFile.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "AppManager.res",
                            72,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var contributePackageData = param[0];
                  var contributeFuncData = param[1];
                  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(contributeFuncData), "Contribute");
                  return {
                          contributePackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(decoder.decode(contributePackageData))),
                          contributeFuncData: {
                            getContributeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getContribute")
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

function _getStartExtensionNames(allExtensionDataArr) {
  return ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.filter(allExtensionDataArr, (function (param) {
                    return param.extensionPackageData.isStart;
                  })), (function (param) {
                return param.extensionPackageData.name;
              }));
}

function _run(param) {
  var allExtensionDataArr = param[0];
  var state = ArraySt$Meta3dCommonlib.reduceOneParam(allExtensionDataArr, (function (state, param) {
          var extensionFuncData = param.extensionFuncData;
          var extensionPackageData = param.extensionPackageData;
          return ExtensionManager$Meta3d.registerExtension(state, extensionPackageData.name, extensionFuncData.getExtensionServiceFunc, extensionFuncData.getExtensionLifeFunc, [
                      extensionPackageData.dependentExtensionNameMap,
                      extensionPackageData.dependentContributeNameMap
                    ], Curry._1(extensionFuncData.createExtensionStateFunc, undefined));
        }), _prepare(undefined));
  return ExtensionManager$Meta3d.startExtensions(ArraySt$Meta3dCommonlib.reduceOneParam(param[1], (function (state, param) {
                    var contributePackageData = param.contributePackageData;
                    return ExtensionManager$Meta3d.registerContribute(state, contributePackageData.name, param.contributeFuncData.getContributeFunc, [
                                contributePackageData.dependentExtensionNameMap,
                                contributePackageData.dependentContributeNameMap
                              ]);
                  }), state), _getStartExtensionNames(allExtensionDataArr));
}

function load(appBinaryFile) {
  return _run(_parse(appBinaryFile));
}

export {
  generate ,
  _parse ,
  _prepare ,
  _getStartExtensionNames ,
  _run ,
  load ,
  
}
/* No side effect */
