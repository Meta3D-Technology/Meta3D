

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Utils$Meta3dWorkPluginRoot from "./Utils.bs.js";

function exec(states) {
  var match = Utils$Meta3dWorkPluginRoot.getState(states);
  return Curry._1(match.mostService.callFunc, (function (param) {
                console.log("init root job exec");
                return states;
              }));
}

export {
  exec ,
  
}
/* No side effect */
