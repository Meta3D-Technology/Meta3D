

import * as LibUtils$Meta3d from "../file/LibUtils.bs.js";

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "ActionProtocolConfig");
}

function getActions(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getActions")();
}

export {
  serializeLib ,
  getActions ,
}
/* No side effect */
