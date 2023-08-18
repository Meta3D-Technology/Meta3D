'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var FileUtils$Meta3d = require("../FileUtils.bs.js");
var TextDecoder$Meta3d = require("./TextDecoder.bs.js");
var TextEncoder$Meta3d = require("./TextEncoder.bs.js");
var BinaryFileOperator$Meta3d = require("./BinaryFileOperator.bs.js");

function _generate(packageData, fileStr) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate([
              TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(packageData), encoder),
              TextEncoder$Meta3d.encodeUint8Array(fileStr, encoder)
            ]);
}

function loadExtension(extensionBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var dataArr = BinaryFileOperator$Meta3d.load(extensionBinaryFile);
  return {
          extensionPackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(Caml_array.get(dataArr, 0), decoder))),
          extensionFuncData: Caml_array.get(dataArr, 1)
        };
}

function loadContribute(contributeBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var dataArr = BinaryFileOperator$Meta3d.load(contributeBinaryFile);
  return {
          contributePackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(Caml_array.get(dataArr, 0), decoder))),
          contributeFuncData: Caml_array.get(dataArr, 1)
        };
}

var generateExtension = _generate;

var generateContribute = _generate;

exports._generate = _generate;
exports.generateExtension = generateExtension;
exports.loadExtension = loadExtension;
exports.generateContribute = generateContribute;
exports.loadContribute = loadContribute;
/* No side effect */
