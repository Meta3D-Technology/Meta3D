'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var TextEncoder$Meta3d = require("../file/TextEncoder.bs.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ManagerUtils$Meta3d = require("./ManagerUtils.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var BinaryFileOperator$Meta3d = require("../file/BinaryFileOperator.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function convertAllFileData(allExtensionFileData, allContributeFileData, entryExtensionNames) {
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
                                type_: ArraySt$Meta3dCommonlib.includes(entryExtensionNames, extensionPackageData.name) ? /* Entry */2 : /* Default */0,
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

function _encodePackageData(packageData) {
  var encoder = new TextEncoder();
  return TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(packageData), encoder);
}

function generate(param, allPackageBinaryFiles, packageData) {
  return BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.push(ManagerUtils$Meta3d.mergeAllPackageBinaryFiles(ManagerUtils$Meta3d.generate([
                            param[0],
                            param[1]
                          ]))(allPackageBinaryFiles), _encodePackageData(packageData)));
}

function _getEntryExtensionProtocolName(allExtensionDataArr) {
  var entryExtensions = ArraySt$Meta3dCommonlib.filter(allExtensionDataArr, (function (param) {
          return param.extensionPackageData.type_ === /* Entry */2;
        }));
  if (ArraySt$Meta3dCommonlib.length(entryExtensions) === 0) {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("should has one type extension at least", "", "", "", "")));
  } else {
    return Caml_array.get(entryExtensions, 0).extensionPackageData.protocol.name;
  }
}

function load(packageBinaryFile) {
  var match = ManagerUtils$Meta3d.load(BinaryFileOperator$Meta3d.load(packageBinaryFile));
  var allExtensionDataArr = match[1];
  return [
          match[0],
          allExtensionDataArr,
          _getEntryExtensionProtocolName(allExtensionDataArr)
        ];
}

function getAllDataOfPackage(packageBinaryFile) {
  return ManagerUtils$Meta3d.parse2(BinaryFileOperator$Meta3d.load(packageBinaryFile));
}

function getPackageService(state, protocolName) {
  return OptionSt$Meta3dCommonlib.toNullable(ImmutableHashMap$Meta3dCommonlib.get(state.extensionServiceMap, protocolName));
}

exports.convertAllFileData = convertAllFileData;
exports._encodePackageData = _encodePackageData;
exports.generate = generate;
exports._getEntryExtensionProtocolName = _getEntryExtensionProtocolName;
exports.load = load;
exports.getAllDataOfPackage = getAllDataOfPackage;
exports.getPackageService = getPackageService;
/* ManagerUtils-Meta3d Not a pure module */
