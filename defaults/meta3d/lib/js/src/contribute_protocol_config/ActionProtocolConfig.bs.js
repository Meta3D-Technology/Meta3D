'use strict';

var LibUtils$Meta3d = require("../file/LibUtils.bs.js");

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "ActionProtocolConfig");
}

function getActions(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getActions")();
}

exports.serializeLib = serializeLib;
exports.getActions = getActions;
/* No side effect */
