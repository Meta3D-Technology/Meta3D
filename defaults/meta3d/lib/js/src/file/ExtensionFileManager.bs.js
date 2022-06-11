'use strict';

var Curry = require("rescript/lib/js/curry.js");
var LibUtils$Meta3d = require("./LibUtils.bs.js");

function _compress(fileStr) {
  var encoder = new TextEncoder();
  return encoder.encode(fileStr).buffer;
}

var compressExtension = _compress;

function loadExtension(extensionBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(extensionBinaryFile), "Extension");
  return {
          extensionName: Curry._1(LibUtils$Meta3d.getFuncFromLib(lib, "getName"), undefined),
          getExtensionServiceFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionService"),
          createExtensionStateFunc: LibUtils$Meta3d.getFuncFromLib(lib, "createExtensionState"),
          getExtensionLifeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionLife")
        };
}

var compressContribute = _compress;

function loadContribute(contributeBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(contributeBinaryFile), "Contribute");
  return {
          contributeName: Curry._1(LibUtils$Meta3d.getFuncFromLib(lib, "getName"), undefined),
          getContributeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getContribute")
        };
}

exports._compress = _compress;
exports.compressExtension = compressExtension;
exports.loadExtension = loadExtension;
exports.compressContribute = compressContribute;
exports.loadContribute = loadContribute;
/* No side effect */
