

import * as LibUtils$Meta3d from "../file/LibUtils.bs.js";

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "UIControlProtocolConfig");
}

function getSkinProtocolData(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getSkinProtocolData")();
}

function generateUIControlDataStr(configLib, rect, skin) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlDataStr")(rect, skin);
}

function getUIControlSupportedEventNames(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getUIControlSupportedEventNames")();
}

function generateHandleUIControlEventStr(configLib, actionNames) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateHandleUIControlEventStr")(actionNames);
}

export {
  serializeLib ,
  getSkinProtocolData ,
  generateUIControlDataStr ,
  getUIControlSupportedEventNames ,
  generateHandleUIControlEventStr ,
  
}
/* No side effect */
