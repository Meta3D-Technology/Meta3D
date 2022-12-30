'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Semver = require("semver");
var Caml_option = require("rescript/lib/js/caml_option.js");
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

function _checkVersion(protocolVersion, dependentProtocolVersion, dependentProtocolName) {
  if (Semver.satisfies(Semver.minVersion(protocolVersion), dependentProtocolVersion)) {
    return ;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("version not match", "" + dependentProtocolName + "\n              " + protocolVersion + " not match dependentProtocolVersion: " + dependentProtocolVersion + "", "", "", "")));
  }
}

function _convertDependentMap(dependentMap, allDataMap) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(ImmutableHashMap$Meta3dCommonlib.entries(dependentMap), (function (map, param) {
                var dependentData = param[1];
                var data = ImmutableHashMap$Meta3dCommonlib.get(allDataMap, dependentData.protocolName);
                var protocolVersion = data !== undefined ? data : Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("not find dependent protocol: " + dependentData.protocolName + "", "", "", "", "")));
                _checkVersion(protocolVersion, dependentData.protocolVersion, dependentData.protocolName);
                return ImmutableHashMap$Meta3dCommonlib.set(map, param[0], dependentData.protocolName);
              }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

function convertAllFileData(allExtensionFileData, allContributeFileData, allPackageEntryExtensionProtocolData, startExtensionNames) {
  var allExtensionDataMap = ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
          var extensionPackageData = param.extensionPackageData;
          return ImmutableHashMap$Meta3dCommonlib.set(result, extensionPackageData.protocol.name, extensionPackageData.protocol.version);
        }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
  var allExtensionDataMap$1 = ArraySt$Meta3dCommonlib.reduceOneParam(allPackageEntryExtensionProtocolData, (function (allExtensionDataMap, param) {
          return ImmutableHashMap$Meta3dCommonlib.set(allExtensionDataMap, param.name, param.version);
        }), allExtensionDataMap);
  var allContributeDataMap = ArraySt$Meta3dCommonlib.reduceOneParami(allContributeFileData, (function (result, param, i) {
          var contributePackageData = param.contributePackageData;
          return ImmutableHashMap$Meta3dCommonlib.set(result, contributePackageData.protocol.name, contributePackageData.protocol.version);
        }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
  return [
          ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
                  var extensionPackageData = param.extensionPackageData;
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: extensionPackageData.name,
                                protocolName: extensionPackageData.protocol.name,
                                type_: ArraySt$Meta3dCommonlib.includes(startExtensionNames, extensionPackageData.name) ? /* Start */1 : /* Default */0,
                                dependentExtensionNameMap: _convertDependentMap(extensionPackageData.dependentExtensionNameMap, allExtensionDataMap$1),
                                dependentContributeNameMap: _convertDependentMap(extensionPackageData.dependentContributeNameMap, allContributeDataMap)
                              },
                              param.extensionFuncData
                            ]);
                }), []),
          ArraySt$Meta3dCommonlib.reduceOneParami(allContributeFileData, (function (result, param, i) {
                  var contributePackageData = param.contributePackageData;
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: contributePackageData.name,
                                protocolName: contributePackageData.protocol.name,
                                dependentExtensionNameMap: _convertDependentMap(contributePackageData.dependentExtensionNameMap, allExtensionDataMap$1),
                                dependentContributeNameMap: _convertDependentMap(contributePackageData.dependentContributeNameMap, allContributeDataMap)
                              },
                              param.contributeFuncData
                            ]);
                }), [])
        ];
}

function generate(param, allPackageBinaryFiles, configData) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.push(ManagerUtils$Meta3d.mergeAllPackageBinaryFiles(ManagerUtils$Meta3d.generate([
                            param[0],
                            param[1]
                          ]))(allPackageBinaryFiles), TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(NullableSt$Meta3dCommonlib.getWithDefault(configData, [])), encoder)));
}

function execGetContributeFunc(contributeFuncData, dependentExtensionNameMapOpt, dependentContributeNameMapOpt, param) {
  var dependentExtensionNameMap = dependentExtensionNameMapOpt !== undefined ? Caml_option.valFromOption(dependentExtensionNameMapOpt) : ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  var dependentContributeNameMap = dependentContributeNameMapOpt !== undefined ? Caml_option.valFromOption(dependentContributeNameMapOpt) : ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  return Curry._2(ManagerUtils$Meta3d.getContributeFunc(contributeFuncData, new TextDecoder("utf-8")), ExtensionManager$Meta3d.buildAPI(undefined), [
              dependentExtensionNameMap,
              dependentContributeNameMap
            ]);
}

function load(appBinaryFile) {
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 3) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            202,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionBinaryUint8File = match[0];
  var allContributeBinaryUint8File = match[1];
  var configData = match[2];
  var decoder = new TextDecoder("utf-8");
  var match$1 = ManagerUtils$Meta3d.load([
        allExtensionBinaryUint8File,
        allContributeBinaryUint8File
      ]);
  return [
          match$1[0],
          match$1[1],
          JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(configData, decoder)))
        ];
}

function start(param) {
  ExtensionManager$Meta3d.startExtension(param[0], ManagerUtils$Meta3d.getSpecificExtensionProtocolName(param[1], /* Start */1), param[2]);
}

exports._checkVersion = _checkVersion;
exports._convertDependentMap = _convertDependentMap;
exports.convertAllFileData = convertAllFileData;
exports.generate = generate;
exports.execGetContributeFunc = execGetContributeFunc;
exports.load = load;
exports.start = start;
/* semver Not a pure module */
