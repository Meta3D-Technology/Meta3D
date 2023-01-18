

import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ManagerUtils$Meta3d from "./ManagerUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as BinaryFileOperator$Meta3d from "../file/BinaryFileOperator.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
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
                                dependentExtensionProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.map(extensionPackageData.dependentExtensionProtocolNameMap, (function (dependentData) {
                                        return dependentData.protocolName;
                                      })),
                                dependentContributeProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.map(extensionPackageData.dependentContributeProtocolNameMap, (function (dependentData) {
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
                                dependentExtensionProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.map(contributePackageData.dependentExtensionProtocolNameMap, (function (dependentData) {
                                        return dependentData.protocolName;
                                      })),
                                dependentContributeProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.map(contributePackageData.dependentContributeProtocolNameMap, (function (dependentData) {
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

function _getEntryExtensionProtocolName(allExtensionDataArr) {
  var entryExtensions = ArraySt$Meta3dCommonlib.filter(allExtensionDataArr, (function (param) {
          return param.extensionPackageData.type_ === /* Entry */2;
        }));
  if (ArraySt$Meta3dCommonlib.length(entryExtensions) === 0) {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("should has one type extension at least", "", "", "", "")));
  } else {
    return Caml_array.get(entryExtensions, 0).extensionPackageData.protocolName;
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

export {
  _convertDependentMap ,
  convertAllFileData ,
  generate ,
  _getEntryExtensionProtocolName ,
  load ,
}
/* No side effect */
