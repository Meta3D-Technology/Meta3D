

import * as LibUtils$Meta3d from "../file/LibUtils.bs.js";

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "UIControlProtocolConfig");
}

function generateUIControlName(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlName")();
}

function generateUIControlDataStr(configLib, rect) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlDataStr")(rect);
}

function getUIControlSupportedEventNames(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getUIControlSupportedEventNames")();
}

function generateHandleUIControlEventStr(configLib, actionNames) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateHandleUIControlEventStr")(actionNames);
}

export {
  serializeLib ,
  generateUIControlName ,
  generateUIControlDataStr ,
  getUIControlSupportedEventNames ,
  generateHandleUIControlEventStr ,
  
}
/* No side effect */
