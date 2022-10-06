'use strict';

var Curry = require("rescript/lib/js/curry.js");
var LibUtils$Meta3d = require("../file/LibUtils.bs.js");

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "UIControlProtocolConfig");
}

function generateUIControlName(configLib) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlName"), undefined);
}

function generateUIControlDataStr(configLib, rect) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlDataStr"), rect);
}

function getUIControlSupportedEventNames(configLib) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "getUIControlSupportedEventNames"), undefined);
}

function generateHandleUIControlEventStr(configLib, actionNames) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "generateHandleUIControlEventStr"), actionNames);
}

exports.serializeLib = serializeLib;
exports.generateUIControlName = generateUIControlName;
exports.generateUIControlDataStr = generateUIControlDataStr;
exports.getUIControlSupportedEventNames = getUIControlSupportedEventNames;
exports.generateHandleUIControlEventStr = generateHandleUIControlEventStr;
/* No side effect */
