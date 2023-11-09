

import * as InitService$Meta3dImguiWebgl1Renderer from "./InitService.bs.js";
import * as ClearService$Meta3dImguiWebgl1Renderer from "./ClearService.bs.js";
import * as RenderService$Meta3dImguiWebgl1Renderer from "./RenderService.bs.js";
import * as DrawBoxIMGUIService$Meta3dImguiWebgl1Renderer from "./DrawBoxIMGUIService.bs.js";

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

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
  
}
/* No side effect */
