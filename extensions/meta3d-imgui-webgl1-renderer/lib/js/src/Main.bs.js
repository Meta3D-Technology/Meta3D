'use strict';

var InitService$Meta3dImguiWebgl1Renderer = require("./InitService.bs.js");
var ClearService$Meta3dImguiWebgl1Renderer = require("./ClearService.bs.js");
var RenderService$Meta3dImguiWebgl1Renderer = require("./RenderService.bs.js");
var DrawBoxIMGUIService$Meta3dImguiWebgl1Renderer = require("./DrawBoxIMGUIService.bs.js");

function getExtensionService(api, param) {
  var meta3dWebGL1ExtensionName = param[0].meta3dWebGL1ExtensionName;
  return {
          init: (function (state, meta3dState, isDebug, canvas) {
              var webgl1Service = api.getExtensionService(meta3dState, meta3dWebGL1ExtensionName);
              return InitService$Meta3dImguiWebgl1Renderer.init(state, webgl1Service, isDebug, canvas);
            }),
          render: (function (state, meta3dState) {
              var webgl1Service = api.getExtensionService(meta3dState, meta3dWebGL1ExtensionName);
              return RenderService$Meta3dImguiWebgl1Renderer.render(state, meta3dState, webgl1Service);
            }),
          clear: (function (state, meta3dState, clearColor) {
              var webgl1Service = api.getExtensionService(meta3dState, meta3dWebGL1ExtensionName);
              return ClearService$Meta3dImguiWebgl1Renderer.clear(state, webgl1Service, clearColor);
            }),
          drawBox: DrawBoxIMGUIService$Meta3dImguiWebgl1Renderer.draw
        };
}

function createExtensionState(param) {
  return {
          isDebug: false,
          drawData: RenderService$Meta3dImguiWebgl1Renderer.createEmptyDrawData(undefined),
          gl: undefined,
          noTextureShaderData: undefined,
          lastWebglData: undefined
        };
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

exports.getExtensionService = getExtensionService;
exports.createExtensionState = createExtensionState;
exports.getExtensionLife = getExtensionLife;
/* No side effect */
