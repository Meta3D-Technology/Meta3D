'use strict';

var LibUtils$Meta3d = require("../file/LibUtils.bs.js");

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "UIControlProtocolConfig");
}

function generateUIControlName(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlName")();
}

function generateUIControlDataStr(configLib, rect) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlDataStr")(rect);
}

function getUIControlSupportedEventNames(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getUIControlSupportedEventNames")();
}

function generateHandleUIControlEventStr(configLib, actionNames) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateHandleUIControlEventStr")(actionNames);
}

exports.serializeLib = serializeLib;
exports.generateUIControlName = generateUIControlName;
exports.generateUIControlDataStr = generateUIControlDataStr;
exports.getUIControlSupportedEventNames = getUIControlSupportedEventNames;
exports.generateHandleUIControlEventStr = generateHandleUIControlEventStr;
/* No side effect */
