

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";

function init(meta3dState, param, isDebug, canvas) {
  var imguiRendererExtensionName = param[1];
  var api = param[0];
  var imguiRendererState = api.getExtensionState(meta3dState, imguiRendererExtensionName);
  var imguiRendererService = api.getExtensionService(meta3dState, imguiRendererExtensionName);
  var imguiRendererState$1 = Curry._4(imguiRendererService.init, imguiRendererState, meta3dState, isDebug, canvas);
  return api.setExtensionState(meta3dState, imguiRendererExtensionName, imguiRendererState$1);
}

function _createEmptyDrawData(param) {
  return {
          noTextureDrawData: {
            verticeArr: [],
            colorArr: [],
            indexArr: []
          }
        };
}

function createData(param) {
  return {
          drawData: {
            noTextureDrawData: {
              verticeArr: [],
              colorArr: [],
              indexArr: []
            }
          },
          ioData: {
            pointUp: false,
            pointDown: false,
            pointPosition: [
              0,
              0
            ],
            pointMovementDelta: [
              0,
              0
            ]
          }
        };
}

export {
  init ,
  _createEmptyDrawData ,
  createData ,
  
}
/* No side effect */
