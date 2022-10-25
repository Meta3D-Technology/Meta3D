'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var Main$Meta3dImguiWebgl1Renderer = require("../../src/Main.bs.js");
var InitService$Meta3dImguiWebgl1Renderer = require("../../src/InitService.bs.js");
var ClearService$Meta3dImguiWebgl1Renderer = require("../../src/ClearService.bs.js");
var WebGL1ServiceTool$Meta3dImguiWebgl1Renderer = require("./WebGL1ServiceTool.bs.js");

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

exports.createState = createState;
exports.init = init;
exports.clear = clear;
/* WebGL1ServiceTool-Meta3dImguiWebgl1Renderer Not a pure module */
