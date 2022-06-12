'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var LibUtils$Meta3d = require("./LibUtils.bs.js");
var BinaryFileOperator$Meta3d = require("./BinaryFileOperator.bs.js");

function _generate(packageData, fileStr) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate([
              encoder.encode(JSON.stringify(packageData)),
              encoder.encode(fileStr)
            ]);
}

function _removeAlignedEmptyChars(decodedStr) {
  return decodedStr.trim();
}

function loadExtension(extensionBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var dataArr = BinaryFileOperator$Meta3d.load(extensionBinaryFile);
  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(Caml_array.get(dataArr, 1)), "Extension");
  return {
          extensionPackageData: JSON.parse(decoder.decode(Caml_array.get(dataArr, 0)).trim()),
          extensionFuncData: {
            getExtensionServiceFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionService"),
            createExtensionStateFunc: LibUtils$Meta3d.getFuncFromLib(lib, "createExtensionState"),
            getExtensionLifeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionLife")
          }
        };
}

function loadContribute(contributeBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var dataArr = BinaryFileOperator$Meta3d.load(contributeBinaryFile);
  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(Caml_array.get(dataArr, 1)), "Contribute");
  return {
          contributePackageData: JSON.parse(decoder.decode(Caml_array.get(dataArr, 0)).trim()),
          contributeFuncData: {
            getContributeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getContribute")
          }
        };
}

var generateExtension = _generate;

var generateContribute = _generate;

exports._generate = _generate;
exports.generateExtension = generateExtension;
exports._removeAlignedEmptyChars = _removeAlignedEmptyChars;
exports.loadExtension = loadExtension;
exports.generateContribute = generateContribute;
exports.loadContribute = loadContribute;
/* No side effect */
