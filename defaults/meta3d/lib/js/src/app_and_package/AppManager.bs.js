'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_array = require("rescript/lib/js/js_array.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var FileUtils$Meta3d = require("../FileUtils.bs.js");
var TextDecoder$Meta3d = require("../file/TextDecoder.bs.js");
var TextEncoder$Meta3d = require("../file/TextEncoder.bs.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ManagerUtils$Meta3d = require("./ManagerUtils.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var ExtensionManager$Meta3d = require("../ExtensionManager.bs.js");
var BinaryFileOperator$Meta3d = require("../file/BinaryFileOperator.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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
                                                TextEncoder$Meta3d.encodeUint8Array(param[0], encoder),
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

function _loadAllPackageUint8StoredInApp(state, allPackageUint8StoredInApp) {
  var decoder = new TextDecoder("utf-8");
  return ArraySt$Meta3dCommonlib.reduceOneParam(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allPackageUint8StoredInApp.buffer), 2), (function (state, param) {
                if (param.length !== 2) {
                  throw {
                        RE_EXN_ID: "Match_failure",
                        _1: [
                          "AppManager.res",
                          151,
                          43
                        ],
                        Error: new Error()
                      };
                }
                var packageProtocolName = param[0];
                var packageUint8 = param[1];
                var packageProtocolName$1 = TextDecoder$Meta3d.decodeUint8Array(packageProtocolName, decoder);
                var packageBinaryFile = packageUint8.buffer;
                return {
                        extensionServiceMap: state.extensionServiceMap,
                        extensionStateMap: state.extensionStateMap,
                        extensionLifeMap: state.extensionLifeMap,
                        contributeExceptActionMap: state.contributeExceptActionMap,
                        actionMap: state.actionMap,
                        packageStoreInAppMap: ImmutableHashMap$Meta3dCommonlib.set(state.packageStoreInAppMap, packageProtocolName$1, packageBinaryFile)
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
            170,
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

function getAllExtensionAndContributeFileDataOfApp(appBinaryFile) {
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 3) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            228,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8 = match[0];
  var allContributeUint8 = match[1];
  return ManagerUtils$Meta3d.parse2([
              allExtensionUint8,
              allContributeUint8
            ]);
}

exports.convertAllFileData = convertAllFileData;
exports._flatten = _flatten;
exports.generate = generate;
exports.getExtensionFuncDataStr = getExtensionFuncDataStr;
exports.getExtensionFuncData = getExtensionFuncData;
exports.getContributeFuncDataStr = getContributeFuncDataStr;
exports.getContributeFuncData = getContributeFuncData;
exports.execGetContributeFunc = execGetContributeFunc;
exports._loadAllPackageUint8StoredInApp = _loadAllPackageUint8StoredInApp;
exports.load = load;
exports._getStartExtensionProtocolName = _getStartExtensionProtocolName;
exports.start = start;
exports.getAllExtensionAndContributeFileDataOfApp = getAllExtensionAndContributeFileDataOfApp;
/* ManagerUtils-Meta3d Not a pure module */
