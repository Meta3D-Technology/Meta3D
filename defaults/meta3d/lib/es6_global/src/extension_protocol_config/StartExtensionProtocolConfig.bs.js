

import * as LibUtils$Meta3d from "../file/LibUtils.bs.js";

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "StartExtensionProtocolConfig");
}

function getNeedConfigData(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getNeedConfigData")();
}

export {
  serializeLib ,
  getNeedConfigData ,
  
}
/* No side effect */
