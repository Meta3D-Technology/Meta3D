'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var StateType$Meta3dPipelineRootProtocol = require("meta3d-pipeline-root-protocol/lib/js/src/StateType.bs.js");

function getState(states) {
  return Caml_array.get(states, StateType$Meta3dPipelineRootProtocol.pipelineName);
}

exports.getState = getState;
/* StateType-Meta3dPipelineRootProtocol Not a pure module */
