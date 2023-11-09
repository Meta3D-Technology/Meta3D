'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");
var StateType$Meta3dPipelineRootSceneviewProtocol = require("meta3d-pipeline-root-sceneview-protocol/lib/js/src/StateType.bs.js");

function getState(states) {
  return Caml_array.get(states, StateType$Meta3dPipelineRootSceneviewProtocol.pipelineName);
}

exports.getState = getState;
/* StateType-Meta3dPipelineRootSceneviewProtocol Not a pure module */
