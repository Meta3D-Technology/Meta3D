

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
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

function convertAllFileData(allExtensionFileData, allContributeFileData, startExtensionNames) {
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
                                type_: ArraySt$Meta3dCommonlib.includes(startExtensionNames, extensionPackageData.name) ? /* Start */1 : /* Default */0,
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

function generate(param, allPackageBinaryFiles, configData) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.push(ManagerUtils$Meta3d.mergeAllPackageBinaryFiles(ManagerUtils$Meta3d.generate([
                            param[0],
                            param[1]
                          ]))(allPackageBinaryFiles), TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(NullableSt$Meta3dCommonlib.getWithDefault(configData, [])), encoder)));
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

function load(appBinaryFile) {
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 3) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            126,
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

function _getStartExtensionProtocolName(allExtensionDataArr) {
  var startExtensions = ArraySt$Meta3dCommonlib.filter(allExtensionDataArr, (function (param) {
          return param.extensionPackageData.type_ === /* Start */1;
        }));
  if (ArraySt$Meta3dCommonlib.length(startExtensions) !== 1) {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("should only has one type extension", "", "", "", "")));
  } else {
    return Caml_array.get(startExtensions, 0).extensionPackageData.protocol.name;
  }
}

function start(param) {
  ExtensionManager$Meta3d.startExtension(param[0], _getStartExtensionProtocolName(param[1]), param[2]);
}

function getAllExtensionAndContributeFileDataOfApp(appBinaryFile) {
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 3) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            184,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionBinaryUint8File = match[0];
  var allContributeBinaryUint8File = match[1];
  return ManagerUtils$Meta3d.parse2([
              allExtensionBinaryUint8File,
              allContributeBinaryUint8File
            ]);
}

export {
  convertAllFileData ,
  generate ,
  getExtensionFuncDataStr ,
  getExtensionFuncData ,
  getContributeFuncDataStr ,
  getContributeFuncData ,
  execGetContributeFunc ,
  load ,
  _getStartExtensionProtocolName ,
  start ,
  getAllExtensionAndContributeFileDataOfApp ,
}
/* No side effect */
