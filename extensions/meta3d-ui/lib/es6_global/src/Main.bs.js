

import * as UIManager$Meta3dUi from "./UIManager.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionService(api) {
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
          updateElementState: UIManager$Meta3dUi.updateElementState,
          getSkin: UIManager$Meta3dUi.getSkin,
          getUIControlFunc: UIManager$Meta3dUi.getUIControlFuncExn,
          getUIControlState: UIManager$Meta3dUi.getUIControlState,
          setUIControlState: UIManager$Meta3dUi.setUIControlState,
          setStyle: (function (meta3dState, style) {
              return UIManager$Meta3dUi.setStyle(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ], style);
            }),
          beginWindow: (function (meta3dState, label) {
              return UIManager$Meta3dUi.beginWindow(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ], label);
            }),
          endWindow: (function (meta3dState) {
              return UIManager$Meta3dUi.endWindow(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ]);
            }),
          setNextWindowRect: (function (meta3dState, rect) {
              return UIManager$Meta3dUi.setNextWindowRect(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ], rect);
            }),
          addFBOTexture: (function (meta3dState, texture, rect) {
              return UIManager$Meta3dUi.addFBOTexture(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ], texture, rect);
            }),
          getFBOTexture: UIManager$Meta3dUi.getFBOTexture,
          setFBOTexture: UIManager$Meta3dUi.setFBOTexture,
          getWindowBarHeight: (function (meta3dState) {
              return UIManager$Meta3dUi.getWindowBarHeight(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ]);
            }),
          getContext: (function (meta3dState) {
              return UIManager$Meta3dUi.getContext(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ]);
            }),
          button: (function (meta3dState, label, size) {
              return UIManager$Meta3dUi.button(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ], label, size);
            }),
          setCursorPos: (function (meta3dState, pos) {
              return UIManager$Meta3dUi.setCursorPos(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ], pos);
            }),
          init: UIManager$Meta3dUi.init,
          clear: UIManager$Meta3dUi.clear,
          getCurrentElementState: UIManager$Meta3dUi.getCurrentElementState,
          setCurrentElementState: UIManager$Meta3dUi.setCurrentElementState
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
          currentElementName: undefined,
          fboTextureMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

function getExtensionLife(api, param) {
  return {
          onRegister: null,
          onRestore: NullableSt$Meta3dCommonlib.$$return(function (param, param$1) {
                return UIManager$Meta3dUi.restore(api, param, param$1);
              }),
          onDeepCopy: NullableSt$Meta3dCommonlib.$$return(function (param) {
                return UIManager$Meta3dUi.deepCopy(api, param);
              }),
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
