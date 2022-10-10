'use strict';

var LibUtils$Meta3d = require("../file/LibUtils.bs.js");

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "ActionProtocolConfig");
}

function getActionName(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getActionName")();
}

function getActions(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getActions")();
}

exports.serializeLib = serializeLib;
exports.getActionName = getActionName;
exports.getActions = getActions;
/* No side effect */
