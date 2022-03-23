

import * as Curry from "./../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Utils$Meta3dWorkPluginRoot from "./Utils.bs.js";

function execFunc(state, param) {
  var match = Utils$Meta3dWorkPluginRoot.getState(Curry._1(param.getStatesFunc, state));
  return Curry._1(match.mostService.callFunc, (function (param) {
                console.log("init root job exec");
                return state;
              }));
}

export {
  execFunc ,
  
}
/* No side effect */
