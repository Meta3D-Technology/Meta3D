

import * as Caml_array from "./../../../../../rescript/lib/es6/caml_array.js";
import * as FileUtils$Meta3d from "../FileUtils.bs.js";
import * as BinaryFileOperator$Meta3d from "./BinaryFileOperator.bs.js";

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

export {
  _generate ,
  generateExtension ,
  loadExtension ,
  generateContribute ,
  loadContribute ,
  
}
/* No side effect */
