

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Utils$Meta3dWorkPluginRoot from "./Utils.bs.js";

function execFunc(meta3dState, param) {
  var match = Utils$Meta3dWorkPluginRoot.getState(Curry._1(param.getStatesFunc, meta3dState));
  return Curry._1(match.mostService.callFunc, (function (param) {
                console.log("render root job exec");
                return meta3dState;
              }));
}

export {
  execFunc ,
}
/* No side effect */
