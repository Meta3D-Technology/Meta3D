'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var LibUtils$Meta3d = require("./LibUtils.bs.js");
var BinaryFileOperator$Meta3d = require("./BinaryFileOperator.bs.js");

function _generate(fileStr) {
  var encoder = new TextEncoder();
  return encoder.encode(fileStr).buffer;
}

function generateExtension(extensionPackageData, extensionFileStr) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate([
              encoder.encode(JSON.stringify(extensionPackageData)),
              encoder.encode(extensionFileStr)
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

var generateContribute = _generate;

function loadContribute(contributeBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(contributeBinaryFile), "Contribute");
  return {
          contributeName: Curry._1(LibUtils$Meta3d.getFuncFromLib(lib, "getName"), undefined),
          getContributeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getContribute")
        };
}

exports._generate = _generate;
exports.generateExtension = generateExtension;
exports._removeAlignedEmptyChars = _removeAlignedEmptyChars;
exports.loadExtension = loadExtension;
exports.generateContribute = generateContribute;
exports.loadContribute = loadContribute;
/* No side effect */
