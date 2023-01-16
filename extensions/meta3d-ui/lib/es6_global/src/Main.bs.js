

import * as UIManager$Meta3dUi from "./UIManager.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionService(api, param) {
  var meta3dImguiRendererExtensionName = param[0].meta3dImguiRendererExtensionName;
  return {
          registerElement: UIManager$Meta3dUi.registerElement,
          registerSkin: UIManager$Meta3dUi.registerSkin,
          registerUIControl: UIManager$Meta3dUi.registerUIControl,
          render: (function (param, param$1, param$2) {
              return UIManager$Meta3dUi.render(api, param, param$1, param$2);
            }),
          show: UIManager$Meta3dUi.show,
          hide: UIManager$Meta3dUi.hide,
          isStateChange: UIManager$Meta3dUi.isStateChange,
          getElementState: UIManager$Meta3dUi.getElementState,
          dispatch: UIManager$Meta3dUi.dispatch,
          getSkin: UIManager$Meta3dUi.getSkin,
          getUIControlFunc: UIManager$Meta3dUi.getUIControlFuncExn,
          getUIControlState: UIManager$Meta3dUi.getUIControlState,
          setUIControlState: UIManager$Meta3dUi.setUIControlState,
          setStyle: (function (meta3dState, style) {
              return UIManager$Meta3dUi.setStyle(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], style);
            }),
          beginWindow: (function (meta3dState, label) {
              return UIManager$Meta3dUi.beginWindow(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], label);
            }),
          endWindow: (function (meta3dState) {
              return UIManager$Meta3dUi.endWindow(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ]);
            }),
          setNextWindowRect: (function (meta3dState, rect) {
              return UIManager$Meta3dUi.setNextWindowRect(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], rect);
            }),
          addFBOTexture: (function (meta3dState, texture, size) {
              return UIManager$Meta3dUi.addFBOTexture(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], texture, size);
            }),
          getFBOTexture: UIManager$Meta3dUi.getFBOTexture,
          setFBOTexture: UIManager$Meta3dUi.setFBOTexture,
          getContext: (function (meta3dState) {
              return UIManager$Meta3dUi.getContext(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ]);
            }),
          button: (function (meta3dState, label, size) {
              return UIManager$Meta3dUi.button(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], label, size);
            }),
          setCursorPos: (function (meta3dState, pos) {
              return UIManager$Meta3dUi.setCursorPos(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], pos);
            }),
          init: UIManager$Meta3dUi.init,
          clear: UIManager$Meta3dUi.clear
        };
}

function createExtensionState(param) {
  return {
          elementFuncMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          elementStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          elementExecOrderMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          isShowMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          skinContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          uiControlContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          uiControlStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          reducers: [],
          fboTextureMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
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
