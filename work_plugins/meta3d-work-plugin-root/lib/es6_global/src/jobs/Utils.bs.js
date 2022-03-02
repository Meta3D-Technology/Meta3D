

import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Index$Meta3dWorkPluginRootProtocol from "../../../../../../node_modules/meta3d-work-plugin-root-protocol/lib/es6_global/src/Index.bs.js";

function getState(states) {
  return Caml_array.get(states, Index$Meta3dWorkPluginRootProtocol.workPluginName);
}

export {
  getState ,
  
}
/* No side effect */
