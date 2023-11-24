'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_array = require("rescript/lib/js/js_array.js");
var FileUtils$Meta3d = require("../FileUtils.bs.js");
var TextDecoder$Meta3d = require("../file/TextDecoder.bs.js");
var TextEncoder$Meta3d = require("../file/TextEncoder.bs.js");
var ManagerUtils$Meta3d = require("./ManagerUtils.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var ExtensionManager$Meta3d = require("../ExtensionManager.bs.js");
var BinaryFileOperator$Meta3d = require("../file/BinaryFileOperator.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function convertAllFileData(allContributeFileData) {
  return ArraySt$Meta3dCommonlib.reduceOneParami(allContributeFileData, (function (result, param, i) {
                var contributePackageData = param.contributePackageData;
                return ArraySt$Meta3dCommonlib.push(result, [
                            {
                              name: contributePackageData.name,
                              version: contributePackageData.version,
                              account: contributePackageData.account,
                              protocol: contributePackageData.protocol,
                              displayName: contributePackageData.displayName,
                              repoLink: contributePackageData.repoLink,
                              description: contributePackageData.description,
                              dependentPackageStoredInAppProtocolNameMap: contributePackageData.dependentPackageStoredInAppProtocolNameMap,
                              dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap
                            },
                            param.contributeFuncData
                          ]);
              }), []);
}

function _flatten(arr) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(arr, Js_array.concat, []);
}

function generate(allContributeFileData, allPackageBinaryFiles, allPackageBinaryFileDataStoredInApp, selectedElements, customData, configData, startPackageProtocolName) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ManagerUtils$Meta3d.mergeAllPackageBinaryFiles(ManagerUtils$Meta3d.generate([
                                            [],
                                            allContributeFileData
                                          ]))(allPackageBinaryFiles), new Uint8Array(BinaryFileOperator$Meta3d.generate(_flatten(ArraySt$Meta3dCommonlib.map(allPackageBinaryFileDataStoredInApp, (function (param) {
                                                    return [
                                                            TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(param[0]), encoder),
                                                            new Uint8Array(param[1])
                                                          ];
                                                  })))))), TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(selectedElements), encoder)), TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(customData), encoder)), TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(NullableSt$Meta3dCommonlib.getWithDefault(configData, [])), encoder)), TextEncoder$Meta3d.encodeUint8Array(startPackageProtocolName, encoder)));
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
                          182,
                          32
                        ],
                        Error: new Error()
                      };
                }
                var packageData = param[0];
                var packageUint8 = param[1];
                var packageBinaryFile = packageUint8.buffer;
                return [
                        ManagerUtils$Meta3d.decodePackageData(packageData, decoder),
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
                        contributeExceptInputMap: state.contributeExceptInputMap,
                        inputMap: state.inputMap,
                        packageStoreInAppMap: ImmutableHashMap$Meta3dCommonlib.set(state.packageStoreInAppMap, param[0][0].name, param[1])
                      };
              }), state);
}

function _decodeConfigData(configData) {
  var decoder = new TextDecoder("utf-8");
  return JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(configData, decoder)));
}

function _decode(data) {
  var decoder = new TextDecoder("utf-8");
  return TextDecoder$Meta3d.decodeUint8Array(data, decoder);
}

function load(addGeneratedContributeFunc, appBinaryFile) {
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 8) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            231,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8 = match[0];
  var allContributeUint8 = match[1];
  var allPackageUint8NotStoredInApp = match[2];
  var allPackageUint8StoredInApp = match[3];
  var customDataUint8 = match[5];
  var configData = match[6];
  var startPackageProtocolName = match[7];
  var match$1 = ManagerUtils$Meta3d.loadApp(addGeneratedContributeFunc, JSON.parse(_decode(customDataUint8)), [
        allExtensionUint8,
        allContributeUint8,
        allPackageUint8NotStoredInApp,
        1
      ]);
  var state = _loadAllPackageUint8StoredInApp(match$1[0], allPackageUint8StoredInApp);
  return [
          state,
          _decode(startPackageProtocolName),
          _decodeConfigData(configData)
        ];
}

function start(param) {
  ExtensionManager$Meta3d.startExtension(param[0], param[1], param[2]);
}

function getAllDataOfApp(appBinaryFile) {
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 8) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            297,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8 = match[0];
  var allContributeUint8 = match[1];
  var allPackageUint8NotStoredInApp = match[2];
  var allPackageUint8StoredInApp = match[3];
  var selectedElementsUint8 = match[4];
  var customDataUint8 = match[5];
  var configData = match[6];
  return [
          _parseAllPackageUint8StoredInApp(allPackageUint8StoredInApp),
          ManagerUtils$Meta3d.parse3([
                allExtensionUint8,
                allContributeUint8,
                allPackageUint8NotStoredInApp
              ]),
          _decodeConfigData(configData),
          JSON.parse(_decode(selectedElementsUint8)),
          JSON.parse(_decode(customDataUint8))
        ];
}

exports.convertAllFileData = convertAllFileData;
exports._flatten = _flatten;
exports.generate = generate;
exports.getExtensionFuncDataStr = getExtensionFuncDataStr;
exports.getExtensionFuncData = getExtensionFuncData;
exports.getContributeFuncDataStr = getContributeFuncDataStr;
exports.getContributeFuncData = getContributeFuncData;
exports.execGetContributeFunc = execGetContributeFunc;
exports._parseAllPackageUint8StoredInApp = _parseAllPackageUint8StoredInApp;
exports._loadAllPackageUint8StoredInApp = _loadAllPackageUint8StoredInApp;
exports._decodeConfigData = _decodeConfigData;
exports._decode = _decode;
exports.load = load;
exports.start = start;
exports.getAllDataOfApp = getAllDataOfApp;
/* ManagerUtils-Meta3d Not a pure module */
