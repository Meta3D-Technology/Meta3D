

import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Main$Meta3dImguiWebgl1Renderer from "../../src/Main.bs.js";
import * as InitService$Meta3dImguiWebgl1Renderer from "../../src/InitService.bs.js";
import * as ClearService$Meta3dImguiWebgl1Renderer from "../../src/ClearService.bs.js";
import * as WebGL1ServiceTool$Meta3dImguiWebgl1Renderer from "./WebGL1ServiceTool.bs.js";

function createState(param) {
  return Main$Meta3dImguiWebgl1Renderer.createExtensionState(undefined);
}

function init(sandbox, webgl1ServiceOpt, stateOpt, isDebugOpt, canvasOpt, param) {
  var webgl1Service = webgl1ServiceOpt !== undefined ? webgl1ServiceOpt : WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  var state = stateOpt !== undefined ? stateOpt : Main$Meta3dImguiWebgl1Renderer.createExtensionState(undefined);
  var isDebug = isDebugOpt !== undefined ? isDebugOpt : false;
  var canvas = canvasOpt !== undefined ? Caml_option.valFromOption(canvasOpt) : 10;
  return InitService$Meta3dImguiWebgl1Renderer.init(state, webgl1Service, isDebug, canvas);
}

function clear(sandbox, clearColor, webgl1ServiceOpt, stateOpt, param) {
  var webgl1Service = webgl1ServiceOpt !== undefined ? webgl1ServiceOpt : WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  var state = stateOpt !== undefined ? stateOpt : Main$Meta3dImguiWebgl1Renderer.createExtensionState(undefined);
  return ClearService$Meta3dImguiWebgl1Renderer.clear(state, webgl1Service, clearColor);
}

export {
  createState ,
  init ,
  clear ,
  
}
/* WebGL1ServiceTool-Meta3dImguiWebgl1Renderer Not a pure module */
