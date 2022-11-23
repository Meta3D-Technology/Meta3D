

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as LibUtils$Meta3d from "../file/LibUtils.bs.js";

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "UIControlProtocolConfig");
}

function generateUIControlCommonDataStr(configLib, rect) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlCommonDataStr")(rect);
}

function getUIControlSpecificDataFields(configLib) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "getUIControlSpecificDataFields"), undefined);
}

function hasChildren(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "hasChildren")();
}

function getUIControlSupportedEventNames(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getUIControlSupportedEventNames")();
}

function generateHandleUIControlEventStr(configLib, actionNames) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateHandleUIControlEventStr")(actionNames);
}

export {
  serializeLib ,
  generateUIControlCommonDataStr ,
  getUIControlSpecificDataFields ,
  hasChildren ,
  getUIControlSupportedEventNames ,
  generateHandleUIControlEventStr ,
}
/* No side effect */
