'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var Index$Meta3dWorkPluginRootProtocol = require("meta3d-work-plugin-root-protocol/lib/js/src/Index.bs.js");

function getState(states) {
  return Caml_array.get(states, Index$Meta3dWorkPluginRootProtocol.workPluginName);
}

exports.getState = getState;
/* No side effect */
