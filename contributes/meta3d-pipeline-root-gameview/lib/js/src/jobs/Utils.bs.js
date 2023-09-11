'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var StateType$Meta3dPipelineRootGameviewProtocol = require("meta3d-pipeline-root-gameview-protocol/lib/js/src/StateType.bs.js");

function getState(states) {
  return Caml_array.get(states, StateType$Meta3dPipelineRootGameviewProtocol.pipelineName);
}

exports.getState = getState;
/* StateType-Meta3dPipelineRootGameviewProtocol Not a pure module */
