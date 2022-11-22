

import * as UIManager$Meta3dUi2 from "./UIManager.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionService(api, param) {
  var meta3dImguiRendererExtensionName = param[0].meta3dImguiRendererExtensionName;
  return {
          registerElement: UIManager$Meta3dUi2.registerElement,
          registerSkin: UIManager$Meta3dUi2.registerSkin,
          registerUIControl: UIManager$Meta3dUi2.registerUIControl,
          render: (function (param, param$1, param$2) {
              return UIManager$Meta3dUi2.render(api, param, param$1, param$2);
            }),
          show: UIManager$Meta3dUi2.show,
          hide: UIManager$Meta3dUi2.hide,
          isStateChange: UIManager$Meta3dUi2.isStateChange,
          getElementState: UIManager$Meta3dUi2.getElementState,
          dispatch: UIManager$Meta3dUi2.dispatch,
          getSkin: UIManager$Meta3dUi2.getSkin,
          getUIControl: UIManager$Meta3dUi2.getUIControlExn,
          setStyle: (function (meta3dState, style) {
              return UIManager$Meta3dUi2.setStyle(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], style);
            }),
          beginWindow: (function (meta3dState, label) {
              return UIManager$Meta3dUi2.beginWindow(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], label);
            }),
          endWindow: (function (meta3dState) {
              return UIManager$Meta3dUi2.endWindow(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ]);
            }),
          setNextWindowRect: (function (meta3dState, rect) {
              return UIManager$Meta3dUi2.setNextWindowRect(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], rect);
            }),
          button: (function (meta3dState, label, size) {
              return UIManager$Meta3dUi2.button(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], label, size);
            }),
          setCursorPos: (function (meta3dState, pos) {
              return UIManager$Meta3dUi2.setCursorPos(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], pos);
            }),
          init: UIManager$Meta3dUi2.init,
          clear: UIManager$Meta3dUi2.clear
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
          reducers: []
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
