

import * as Caml_array from "../../../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as StateType$Meta3dPipelineRootProtocol from "../../../../../../../../node_modules/meta3d-pipeline-root-protocol/lib/es6_global/src/StateType.bs.js";

function getState(states) {
  return Caml_array.get(states, StateType$Meta3dPipelineRootProtocol.pipelineName);
}

export {
  getState ,
}
/* StateType-Meta3dPipelineRootProtocol Not a pure module */
