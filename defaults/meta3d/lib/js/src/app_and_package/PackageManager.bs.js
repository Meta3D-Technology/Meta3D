'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ManagerUtils$Meta3d = require("./ManagerUtils.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var BinaryFileOperator$Meta3d = require("../file/BinaryFileOperator.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");

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

function generate(param, allPackageBinaryFiles) {
  return BinaryFileOperator$Meta3d.generate(ManagerUtils$Meta3d.mergeAllPackageBinaryFiles(ManagerUtils$Meta3d.generate([
                        param[0],
                        param[1]
                      ]))(allPackageBinaryFiles));
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

function getAllExtensionAndContributeFileDataOfPackage(packageBinaryFile) {
  return ManagerUtils$Meta3d.parse2(BinaryFileOperator$Meta3d.load(packageBinaryFile));
}

exports.convertAllFileData = convertAllFileData;
exports.generate = generate;
exports._getEntryExtensionProtocolName = _getEntryExtensionProtocolName;
exports.load = load;
exports.getAllExtensionAndContributeFileDataOfPackage = getAllExtensionAndContributeFileDataOfPackage;
/* No side effect */
