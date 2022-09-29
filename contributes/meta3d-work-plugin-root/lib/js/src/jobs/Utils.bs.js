'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var StateType$Meta3dWorkPluginRootProtocol = require("meta3d-work-plugin-root-protocol/lib/js/src/StateType.bs.js");

function getState(states) {
  return Caml_array.get(states, StateType$Meta3dWorkPluginRootProtocol.workPluginName);
}

exports.getState = getState;
/* No side effect */
