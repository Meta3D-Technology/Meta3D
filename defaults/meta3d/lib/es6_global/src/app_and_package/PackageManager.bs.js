

import * as ManagerUtils$Meta3d from "./ManagerUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as BinaryFileOperator$Meta3d from "../file/BinaryFileOperator.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function _convertDependentMap(dependentMap) {
  return ImmutableHashMap$Meta3dCommonlib.map(dependentMap, (function (dependentData) {
                return dependentData.protocolName;
              }));
}

function convertAllFileData(allExtensionFileData, allContributeFileData, entryExtensionNames) {
  return [
          ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
                  var extensionPackageData = param.extensionPackageData;
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: extensionPackageData.name,
                                protocolName: extensionPackageData.protocol.name,
                                type_: ArraySt$Meta3dCommonlib.includes(entryExtensionNames, extensionPackageData.name) ? /* Entry */2 : /* Default */0,
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
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: contributePackageData.name,
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

export {
  _convertDependentMap ,
  convertAllFileData ,
  generate ,
  load ,
}
/* No side effect */
