'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var FileUtils$Meta3d = require("../FileUtils.bs.js");
var BinaryFileOperator$Meta3d = require("./BinaryFileOperator.bs.js");

function _generate(packageData, fileStr) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate([
              encoder.encode(JSON.stringify(packageData)),
              encoder.encode(fileStr)
            ]);
}

function loadExtension(extensionBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var dataArr = BinaryFileOperator$Meta3d.load(extensionBinaryFile);
  return {
          extensionPackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(decoder.decode(Caml_array.get(dataArr, 0)))),
          extensionFuncData: Caml_array.get(dataArr, 1)
        };
}

function loadContribute(contributeBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var dataArr = BinaryFileOperator$Meta3d.load(contributeBinaryFile);
  return {
          contributePackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(decoder.decode(Caml_array.get(dataArr, 0)))),
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
