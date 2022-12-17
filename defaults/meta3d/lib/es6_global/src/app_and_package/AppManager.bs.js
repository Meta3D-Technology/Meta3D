

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as FileUtils$Meta3d from "../FileUtils.bs.js";
import * as TextDecoder$Meta3d from "../file/TextDecoder.bs.js";
import * as TextEncoder$Meta3d from "../file/TextEncoder.bs.js";
import * as ManagerUtils$Meta3d from "./ManagerUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ExtensionManager$Meta3d from "../ExtensionManager.bs.js";
import * as BinaryFileOperator$Meta3d from "../file/BinaryFileOperator.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function convertAllFileData(allExtensionFileData, allContributeFileData, allPackageEntryExtensionProtocolData, param) {
  return ManagerUtils$Meta3d.convertAllFileData(allExtensionFileData, allContributeFileData, allPackageEntryExtensionProtocolData, [
              param[0],
              [
                param[1],
                []
              ],
              param[2]
            ]);
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
            60,
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
  ExtensionManager$Meta3d.startExtension(param[0], ManagerUtils$Meta3d.getSpecificExtensionName(param[1], /* Start */1), param[2]);
}

export {
  convertAllFileData ,
  generate ,
  execGetContributeFunc ,
  load ,
  start ,
}
/* ManagerUtils-Meta3d Not a pure module */
