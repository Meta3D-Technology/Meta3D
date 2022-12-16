'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var FileUtils$Meta3d = require("../FileUtils.bs.js");
var TextDecoder$Meta3d = require("../file/TextDecoder.bs.js");
var TextEncoder$Meta3d = require("../file/TextEncoder.bs.js");
var ManagerUtils$Meta3d = require("./ManagerUtils.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var ExtensionManager$Meta3d = require("../ExtensionManager.bs.js");
var BinaryFileOperator$Meta3d = require("../file/BinaryFileOperator.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function convertAllFileData(allExtensionFileData, allContributeFileData, param) {
  return ManagerUtils$Meta3d.convertAllFileData(allExtensionFileData, allContributeFileData, [
              param[0],
              [
                param[1],
                []
              ],
              param[2]
            ]);
}

function generate(param, configData) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.push(ManagerUtils$Meta3d.generate([
                      param[0],
                      param[1]
                    ]), TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(NullableSt$Meta3dCommonlib.getWithDefault(configData, [])), encoder)));
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
            56,
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

exports.convertAllFileData = convertAllFileData;
exports.generate = generate;
exports.execGetContributeFunc = execGetContributeFunc;
exports.load = load;
exports.start = start;
/* ManagerUtils-Meta3d Not a pure module */
