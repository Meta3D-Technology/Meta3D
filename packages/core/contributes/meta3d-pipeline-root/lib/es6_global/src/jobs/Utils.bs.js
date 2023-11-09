

import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as StateType$Meta3dPipelineRootSceneviewProtocol from "../../../../../../node_modules/meta3d-pipeline-root-sceneview-protocol/lib/es6_global/src/StateType.bs.js";

function getState(states) {
  return Caml_array.get(states, StateType$Meta3dPipelineRootSceneviewProtocol.pipelineName);
}

export {
  getState ,
}
/* StateType-Meta3dPipelineRootSceneviewProtocol Not a pure module */
