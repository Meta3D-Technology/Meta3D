

import * as UIManager$Meta3dUi from "./UIManager.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionService(api) {
  var partial_arg = [
    api,
    "meta3d-imgui-renderer-protocol"
  ];
  var partial_arg$1 = [
    api,
    "meta3d-imgui-renderer-protocol"
  ];
  var partial_arg$2 = [
    api,
    "meta3d-imgui-renderer-protocol"
  ];
  var partial_arg$3 = [
    api,
    "meta3d-imgui-renderer-protocol"
  ];
  var partial_arg$4 = [
    api,
    "meta3d-imgui-renderer-protocol"
  ];
  var partial_arg$5 = [
    api,
    "meta3d-imgui-renderer-protocol"
  ];
  var partial_arg$6 = [
    api,
    "meta3d-imgui-renderer-protocol"
  ];
  return {
          registerElement: (function (meta3dState, elementContribute) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.registerElement(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), elementContribute));
            }),
          registerSkin: (function (meta3dState, skinContribute) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.registerSkin(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), skinContribute));
            }),
          registerUIControl: (function (meta3dState, uiControlContribute) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.registerUIControl(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), uiControlContribute));
            }),
          registerInput: (function (meta3dState, inputContribute) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.registerInput(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), inputContribute));
            }),
          render: (function (param, param$1, param$2) {
              return UIManager$Meta3dUi.render(api, param, param$1, param$2);
            }),
          show: (function (meta3dState, elementName) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.show(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), elementName));
            }),
          hide: (function (meta3dState, elementName) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.hide(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), elementName));
            }),
          isStateChange: (function (meta3dState, elementName) {
              return UIManager$Meta3dUi.isStateChange(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), elementName);
            }),
          getElementState: (function (meta3dState, elementName) {
              return UIManager$Meta3dUi.getElementState(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), elementName);
            }),
          updateElementState: (function (meta3dState, updateElementStateFunc) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.updateElementState(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), updateElementStateFunc));
            }),
          getSkin: (function (meta3dState, skinName) {
              return UIManager$Meta3dUi.getSkin(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), skinName);
            }),
          getUIControlFunc: (function (meta3dState, uiControlName) {
              return UIManager$Meta3dUi.getUIControlFuncExn(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), uiControlName);
            }),
          getInputFunc: (function (meta3dState, inputName) {
              return UIManager$Meta3dUi.getInputFunc(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), inputName);
            }),
          getUIControlState: (function (meta3dState, uiControlName) {
              return UIManager$Meta3dUi.getUIControlState(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), uiControlName);
            }),
          setUIControlState: (function (meta3dState, uiControlName, uiControlState) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.setUIControlState(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), uiControlName, uiControlState));
            }),
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
          beginChild: (function (meta3dState, label) {
              return UIManager$Meta3dUi.beginChild(meta3dState, [
                          api,
                          "meta3d-imgui-renderer-protocol"
                        ], label);
            }),
          endChild: (function (meta3dState) {
              return UIManager$Meta3dUi.endChild(meta3dState, [
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
          getFBOTexture: (function (meta3dState, textureID) {
              return UIManager$Meta3dUi.getFBOTexture(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), textureID);
            }),
          setFBOTexture: (function (meta3dState, textureID, texture) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.setFBOTexture(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), textureID, texture));
            }),
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
          loadImage: (function (param, param$1) {
              return UIManager$Meta3dUi.loadImage(partial_arg, param, param$1);
            }),
          asset: (function (param, param$1, param$2, param$3, param$4) {
              return UIManager$Meta3dUi.asset(partial_arg$1, param, param$1, param$2, param$3, param$4);
            }),
          handleDragDropTarget: (function (param, param$1) {
              return UIManager$Meta3dUi.handleDragDropTarget(partial_arg$2, param, param$1);
            }),
          menu: (function (param, param$1, param$2, param$3) {
              return UIManager$Meta3dUi.menu(partial_arg$3, param, param$1, param$2, param$3);
            }),
          sceneTree: (function (param, param$1, param$2, param$3, param$4, param$5) {
              return UIManager$Meta3dUi.sceneTree(partial_arg$4, param, param$1, param$2, param$3, param$4, param$5);
            }),
          inspector: (function (param, param$1, param$2, param$3, param$4, param$5, param$6) {
              return UIManager$Meta3dUi.inspector(partial_arg$5, param, param$1, param$2, param$3, param$4, param$5, param$6);
            }),
          switchButton: (function (param, param$1, param$2, param$3) {
              return UIManager$Meta3dUi.switchButton(partial_arg$6, param, param$1, param$2, param$3);
            }),
          init: UIManager$Meta3dUi.init,
          clear: UIManager$Meta3dUi.clear,
          getCurrentElementState: (function (meta3dState) {
              return UIManager$Meta3dUi.getCurrentElementState(api.getExtensionState(meta3dState, "meta3d-ui-protocol"));
            }),
          setCurrentElementState: (function (meta3dState, currentElementState) {
              return api.setExtensionState(meta3dState, "meta3d-ui-protocol", UIManager$Meta3dUi.setCurrentElementState(api.getExtensionState(meta3dState, "meta3d-ui-protocol"), currentElementState));
            })
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
          inputContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
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
