

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as LibUtils$Meta3d from "./LibUtils.bs.js";
import * as BinaryFileOperator$Meta3d from "./BinaryFileOperator.bs.js";

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

export {
  _generate ,
  generateExtension ,
  _removeAlignedEmptyChars ,
  loadExtension ,
  generateContribute ,
  loadContribute ,
  
}
/* No side effect */
