

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_array from "../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as FileUtils$Meta3d from "../FileUtils.bs.js";
import * as TextDecoder$Meta3d from "../file/TextDecoder.bs.js";
import * as TextEncoder$Meta3d from "../file/TextEncoder.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ManagerUtils$Meta3d from "./ManagerUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ExtensionManager$Meta3d from "../ExtensionManager.bs.js";
import * as BinaryFileOperator$Meta3d from "../file/BinaryFileOperator.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function convertAllFileData(allExtensionFileData, allContributeFileData, startExtensionNames) {
  return [
          ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
                  var extensionPackageData = param.extensionPackageData;
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: extensionPackageData.name,
                                version: extensionPackageData.version,
                                account: extensionPackageData.account,
                                displayName: extensionPackageData.displayName,
                                repoLink: extensionPackageData.repoLink,
                                description: extensionPackageData.description,
                                type_: ArraySt$Meta3dCommonlib.includes(startExtensionNames, extensionPackageData.name) ? /* Start */1 : /* Default */0,
                                protocol: extensionPackageData.protocol,
                                dependentPackageStoredInAppProtocolNameMap: extensionPackageData.dependentPackageStoredInAppProtocolNameMap,
                                dependentBlockProtocolNameMap: extensionPackageData.dependentBlockProtocolNameMap
                              },
                              param.extensionFuncData
                            ]);
                }), []),
          ArraySt$Meta3dCommonlib.reduceOneParami(allContributeFileData, (function (result, param, i) {
                  var contributePackageData = param.contributePackageData;
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: contributePackageData.name,
                                version: contributePackageData.version,
                                account: contributePackageData.account,
                                displayName: contributePackageData.displayName,
                                repoLink: contributePackageData.repoLink,
                                description: contributePackageData.description,
                                protocol: contributePackageData.protocol,
                                dependentPackageStoredInAppProtocolNameMap: contributePackageData.dependentPackageStoredInAppProtocolNameMap,
                                dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap
                              },
                              param.contributeFuncData
                            ]);
                }), [])
        ];
}

function _flatten(arr) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(arr, Js_array.concat, []);
}

function generate(param, allPackageBinaryFiles, allPackageBinaryFileDataStoredInApp, configData) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ManagerUtils$Meta3d.mergeAllPackageBinaryFiles(ManagerUtils$Meta3d.generate([
                                param[0],
                                param[1]
                              ]))(allPackageBinaryFiles), new Uint8Array(BinaryFileOperator$Meta3d.generate(_flatten(ArraySt$Meta3dCommonlib.map(allPackageBinaryFileDataStoredInApp, (function (param) {
                                        return [
                                                TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(param[0]), encoder),
                                                new Uint8Array(param[1])
                                              ];
                                      })))))), TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(NullableSt$Meta3dCommonlib.getWithDefault(configData, [])), encoder)));
}

function getExtensionFuncDataStr(extensionFuncData) {
  return ManagerUtils$Meta3d.getExtensionFuncDataStr(new TextDecoder("utf-8"), extensionFuncData);
}

function getExtensionFuncData(extensionFuncDataStr) {
  return ManagerUtils$Meta3d.getExtensionFuncData(new TextEncoder(), extensionFuncDataStr);
}

function getContributeFuncDataStr(contributeFuncData) {
  return ManagerUtils$Meta3d.getContributeFuncDataStr(new TextDecoder("utf-8"), contributeFuncData);
}

function getContributeFuncData(contributeFuncDataStr) {
  return ManagerUtils$Meta3d.getContributeFuncData(new TextEncoder(), contributeFuncDataStr);
}

function execGetContributeFunc(contributeFuncData, param) {
  return Curry._1(ManagerUtils$Meta3d.getContributeFunc(contributeFuncData, new TextDecoder("utf-8")), ExtensionManager$Meta3d.buildAPI(undefined));
}

function _parseAllPackageUint8StoredInApp(allPackageUint8StoredInApp) {
  var decoder = new TextDecoder("utf-8");
  return ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allPackageUint8StoredInApp.buffer), 2), (function (param) {
                if (param.length !== 2) {
                  throw {
                        RE_EXN_ID: "Match_failure",
                        _1: [
                          "AppManager.res",
                          147,
                          32
                        ],
                        Error: new Error()
                      };
                }
                var packageData = param[0];
                var packageUint8 = param[1];
                var packageBinaryFile = packageUint8.buffer;
                return [
                        JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(packageData, decoder))),
                        packageBinaryFile
                      ];
              }));
}

function _loadAllPackageUint8StoredInApp(state, allPackageUint8StoredInApp) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(_parseAllPackageUint8StoredInApp(allPackageUint8StoredInApp), (function (state, param) {
                return {
                        extensionServiceMap: state.extensionServiceMap,
                        extensionStateMap: state.extensionStateMap,
                        extensionLifeMap: state.extensionLifeMap,
                        contributeExceptActionMap: state.contributeExceptActionMap,
                        actionMap: state.actionMap,
                        packageStoreInAppMap: ImmutableHashMap$Meta3dCommonlib.set(state.packageStoreInAppMap, param[0][0].name, param[1])
                      };
              }), state);
}

function load(appBinaryFile) {
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 4) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            185,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8 = match[0];
  var allContributeUint8 = match[1];
  var allPackageUint8StoredInApp = match[2];
  var configData = match[3];
  var decoder = new TextDecoder("utf-8");
  var match$1 = ManagerUtils$Meta3d.load([
        allExtensionUint8,
        allContributeUint8
      ]);
  var state = _loadAllPackageUint8StoredInApp(match$1[0], allPackageUint8StoredInApp);
  return [
          state,
          match$1[1],
          JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(configData, decoder)))
        ];
}

function _getStartExtensionProtocolName(allExtensionDataArr) {
  var startExtensions = ArraySt$Meta3dCommonlib.filter(allExtensionDataArr, (function (param) {
          return param.extensionPackageData.type_ === /* Start */1;
        }));
  if (ArraySt$Meta3dCommonlib.length(startExtensions) !== 1) {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("should only has one type extension", "", "", "", "")));
  } else {
    return Caml_array.get(startExtensions, 0).extensionPackageData.protocol.name;
  }
}

function start(param) {
  ExtensionManager$Meta3d.startExtension(param[0], _getStartExtensionProtocolName(param[1]), param[2]);
}

function getAllPackageAndExtensionAndContributeFileDataOfApp(appBinaryFile) {
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 4) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            246,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8 = match[0];
  var allContributeUint8 = match[1];
  var allPackageUint8StoredInApp = match[2];
  return [
          _parseAllPackageUint8StoredInApp(allPackageUint8StoredInApp),
          ManagerUtils$Meta3d.parse2([
                allExtensionUint8,
                allContributeUint8
              ])
        ];
}

export {
  convertAllFileData ,
  _flatten ,
  generate ,
  getExtensionFuncDataStr ,
  getExtensionFuncData ,
  getContributeFuncDataStr ,
  getContributeFuncData ,
  execGetContributeFunc ,
  _parseAllPackageUint8StoredInApp ,
  _loadAllPackageUint8StoredInApp ,
  load ,
  _getStartExtensionProtocolName ,
  start ,
  getAllPackageAndExtensionAndContributeFileDataOfApp ,
}
/* ManagerUtils-Meta3d Not a pure module */
