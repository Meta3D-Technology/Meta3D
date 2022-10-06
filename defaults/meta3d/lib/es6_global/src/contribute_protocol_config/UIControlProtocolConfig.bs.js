

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as LibUtils$Meta3d from "../file/LibUtils.bs.js";

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "UIControlProtocolConfig");
}

function generateUIControlName(configLib) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlName"), undefined);
}

function generateUIControlDataStr(configLib, rect) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "generateUIControlDataStr"), rect);
}

function getUIControlSupportedEventNames(configLib) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "getUIControlSupportedEventNames"), undefined);
}

function generateHandleUIControlEventStr(configLib, actionNames) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "generateHandleUIControlEventStr"), actionNames);
}

export {
  serializeLib ,
  generateUIControlName ,
  generateUIControlDataStr ,
  getUIControlSupportedEventNames ,
  generateHandleUIControlEventStr ,
  
}
/* No side effect */
