

import * as Caml_array from "./../../../../../rescript/lib/es6/caml_array.js";
import * as FileUtils$Meta3d from "../FileUtils.bs.js";
import * as TextDecoder$Meta3d from "./TextDecoder.bs.js";
import * as TextEncoder$Meta3d from "./TextEncoder.bs.js";
import * as BinaryFileOperator$Meta3d from "./BinaryFileOperator.bs.js";

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

export {
  _generate ,
  generateExtension ,
  loadExtension ,
  generateContribute ,
  loadContribute ,
}
/* No side effect */
