

import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as TextEncoder$Meta3d from "../file/TextEncoder.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ManagerUtils$Meta3d from "./ManagerUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as BinaryFileOperator$Meta3d from "../file/BinaryFileOperator.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

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
  var match = ManagerUtils$Meta3d.loadPackage(BinaryFileOperator$Meta3d.load(packageBinaryFile));
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

export {
  convertAllFileData ,
  _encodePackageData ,
  generate ,
  _getEntryExtensionProtocolName ,
  load ,
  getAllDataOfPackage ,
  getPackageService ,
}
/* ManagerUtils-Meta3d Not a pure module */
