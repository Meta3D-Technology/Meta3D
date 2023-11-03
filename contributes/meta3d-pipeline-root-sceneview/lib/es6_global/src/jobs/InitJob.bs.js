

import * as Utils$Meta3dPipelineRootSceneview from "./Utils.bs.js";

function execFunc(meta3dState, param) {
  var match = Utils$Meta3dPipelineRootSceneview.getState(param.getStatesFunc(meta3dState));
  return match.mostService.callFunc(function (param) {
              console.log("init root job exec");
              return meta3dState;
            });
}

export {
  execFunc ,
}
/* Utils-Meta3dPipelineRootSceneview Not a pure module */
