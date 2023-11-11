

import * as Utils$Meta3dPipelineRoot from "./Utils.bs.js";

function execFunc(meta3dState, param) {
  var match = Utils$Meta3dPipelineRoot.getState(param.getStatesFunc(meta3dState));
  return match.mostService.callFunc(function (param) {
              console.log("update root job exec");
              return meta3dState;
            });
}

export {
  execFunc ,
}
/* Utils-Meta3dPipelineRoot Not a pure module */
