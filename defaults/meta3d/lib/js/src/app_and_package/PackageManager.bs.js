'use strict';

var ManagerUtils$Meta3d = require("./ManagerUtils.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var BinaryFileOperator$Meta3d = require("../file/BinaryFileOperator.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function _convertDependentMap(dependentMap) {
  return ImmutableHashMap$Meta3dCommonlib.map(dependentMap, (function (dependentData) {
                return dependentData.protocolName;
              }));
}

function convertAllFileData(allExtensionFileData, allContributeFileData, param) {
  var allContributeNewNames = param[2];
  var entryExtensionNames = param[1];
  var allExtensionNewNames = param[0];
  return [
          ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
                  var extensionPackageData = param.extensionPackageData;
                  var newName = ArraySt$Meta3dCommonlib.getExn(allExtensionNewNames, i);
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: newName,
                                protocolName: extensionPackageData.protocol.name,
                                type_: ArraySt$Meta3dCommonlib.includes(entryExtensionNames, newName) ? /* Entry */2 : /* Default */0,
                                dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.map(extensionPackageData.dependentExtensionNameMap, (function (dependentData) {
                                        return dependentData.protocolName;
                                      })),
                                dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.map(extensionPackageData.dependentContributeNameMap, (function (dependentData) {
                                        return dependentData.protocolName;
                                      }))
                              },
                              param.extensionFuncData
                            ]);
                }), []),
          ArraySt$Meta3dCommonlib.reduceOneParami(allContributeFileData, (function (result, param, i) {
                  var contributePackageData = param.contributePackageData;
                  var newName = ArraySt$Meta3dCommonlib.getExn(allContributeNewNames, i);
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: newName,
                                protocolName: contributePackageData.protocol.name,
                                dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.map(contributePackageData.dependentExtensionNameMap, (function (dependentData) {
                                        return dependentData.protocolName;
                                      })),
                                dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.map(contributePackageData.dependentContributeNameMap, (function (dependentData) {
                                        return dependentData.protocolName;
                                      }))
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

function load(packageBinaryFile) {
  var match = ManagerUtils$Meta3d.load(BinaryFileOperator$Meta3d.load(packageBinaryFile));
  var allExtensionDataArr = match[1];
  return [
          match[0],
          allExtensionDataArr,
          ManagerUtils$Meta3d.getSpecificExtensionProtocolName(allExtensionDataArr, /* Entry */2)
        ];
}

exports._convertDependentMap = _convertDependentMap;
exports.convertAllFileData = convertAllFileData;
exports.generate = generate;
exports.load = load;
/* No side effect */
