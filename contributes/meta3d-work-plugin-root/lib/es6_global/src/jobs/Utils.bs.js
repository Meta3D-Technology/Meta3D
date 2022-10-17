

import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as StateType$Meta3dWorkPluginRootProtocol from "../../../../../../node_modules/meta3d-work-plugin-root-protocol/lib/es6_global/src/StateType.bs.js";

function getState(states) {
  return Caml_array.get(states, StateType$Meta3dWorkPluginRootProtocol.workPluginName);
}

export {
  getState ,
  
}
/* No side effect */
