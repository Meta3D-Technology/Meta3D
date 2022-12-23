

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Semver from "semver";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
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
                var match = data !== undefined ? data : Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("not find dependent protocol: " + dependentData.protocolName + "", "", "", "", "")));
                _checkVersion(match[1], dependentData.protocolVersion, dependentData.protocolName);
                return ImmutableHashMap$Meta3dCommonlib.set(map, param[0], dependentData.protocolName);
              }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

function convertAllFileData(allExtensionFileData, allContributeFileData, allPackageEntryExtensionProtocolData, param) {
  var allContributeNewNames = param[2];
  var startExtensionNames = param[1];
  var allExtensionNewNames = param[0];
  var allExtensionDataMap = ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
          var extensionPackageData = param.extensionPackageData;
          return ImmutableHashMap$Meta3dCommonlib.set(result, extensionPackageData.protocol.name, [
                      ArraySt$Meta3dCommonlib.getExn(allExtensionNewNames, i),
                      extensionPackageData.protocol.version
                    ]);
        }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
  var allExtensionDataMap$1 = ArraySt$Meta3dCommonlib.reduceOneParam(allPackageEntryExtensionProtocolData, (function (allExtensionDataMap, param) {
          var match = param[0];
          return ImmutableHashMap$Meta3dCommonlib.set(allExtensionDataMap, match.name, [
                      param[1],
                      match.version
                    ]);
        }), allExtensionDataMap);
  var allContributeDataMap = ArraySt$Meta3dCommonlib.reduceOneParami(allContributeFileData, (function (result, param, i) {
          var contributePackageData = param.contributePackageData;
          return ImmutableHashMap$Meta3dCommonlib.set(result, contributePackageData.protocol.name, [
                      ArraySt$Meta3dCommonlib.getExn(allContributeNewNames, i),
                      contributePackageData.protocol.version
                    ]);
        }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
  return [
          ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
                  var extensionPackageData = param.extensionPackageData;
                  var newName = ArraySt$Meta3dCommonlib.getExn(allExtensionNewNames, i);
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: newName,
                                protocolName: extensionPackageData.protocol.name,
                                type_: ArraySt$Meta3dCommonlib.includes(startExtensionNames, newName) ? /* Start */1 : /* Default */0,
                                dependentExtensionNameMap: _convertDependentMap(extensionPackageData.dependentExtensionNameMap, allExtensionDataMap$1),
                                dependentContributeNameMap: _convertDependentMap(extensionPackageData.dependentContributeNameMap, allContributeDataMap)
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
            216,
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

export {
  _checkVersion ,
  _convertDependentMap ,
  convertAllFileData ,
  generate ,
  execGetContributeFunc ,
  load ,
  start ,
}
/* semver Not a pure module */
