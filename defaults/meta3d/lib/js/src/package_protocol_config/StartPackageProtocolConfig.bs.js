'use strict';

var LibUtils$Meta3d = require("../file/LibUtils.bs.js");

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "StartPackageProtocolConfig");
}

function getNeedConfigData(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getNeedConfigData")();
}

exports.serializeLib = serializeLib;
exports.getNeedConfigData = getNeedConfigData;
/* No side effect */
