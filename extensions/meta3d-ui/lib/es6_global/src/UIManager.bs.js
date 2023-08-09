

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_obj from "../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as Js_array from "../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/PromiseSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function hide(state, elementName) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, elementName, false),
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function show(state, elementName) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, elementName, true),
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function _markStateChange(state, elementName) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, elementName, true),
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function _markStateNotChange(state, elementName) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, elementName, false),
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function _markAllStateNotChange(state, needMarkStateNotChangeIds) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(needMarkStateNotChangeIds, _markStateNotChange, state);
}

function _getElementStateExn(param, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(param.elementStateMap, elementName);
}

function getElementState(param, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(param.elementStateMap, elementName);
}

function _setElementState(state, elementName, elementState) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.elementStateMap, elementName, elementState),
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function _getElementExecOrderExn(state, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.elementExecOrderMap, elementName);
}

function _setElementExecOrder(state, elementName, execOrder) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: ImmutableHashMap$Meta3dCommonlib.set(state.elementExecOrderMap, elementName, execOrder),
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function _getCurrentElementName(state) {
  return OptionSt$Meta3dCommonlib.getExn(state.currentElementName);
}

function _setCurrentElementName(state, elementName) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: elementName,
          fboTextureMap: state.fboTextureMap
        };
}

function updateElementState(state, updateElementStateFunc) {
  var elementName = OptionSt$Meta3dCommonlib.getExn(state.currentElementName);
  var oldElementState = _getElementStateExn(state, elementName);
  var newElementState = Curry._1(updateElementStateFunc, oldElementState);
  if (Caml_obj.notequal(oldElementState, newElementState)) {
    return _setElementState(_markStateChange(state, elementName), elementName, newElementState);
  } else {
    return _markStateNotChange(state, elementName);
  }
}

function _exec(meta3dState, state) {
  var elementFuncMap = state.elementFuncMap;
  var __x = ImmutableHashMap$Meta3dCommonlib.entries(state.isShowMap);
  return ArraySt$Meta3dCommonlib.traverseReducePromiseM(Js_array.sortInPlaceWith((function (param, param$1) {
                    return ImmutableHashMap$Meta3dCommonlib.getExn(state.elementExecOrderMap, param[0]) - ImmutableHashMap$Meta3dCommonlib.getExn(state.elementExecOrderMap, param$1[0]) | 0;
                  }), __x), (function (param, param$1) {
                var needMarkStateNotChangeIds = param[1];
                var meta3dState = param[0];
                if (!param$1[1]) {
                  return Promise.resolve([
                              meta3dState,
                              needMarkStateNotChangeIds
                            ]);
                }
                var elementName = param$1[0];
                var elementFunc = ImmutableHashMap$Meta3dCommonlib.getExn(elementFuncMap, elementName);
                return PromiseSt$Meta3dCommonlib.map(elementFunc(meta3dState, _getElementStateExn(state, elementName)), (function (meta3dState) {
                              return [
                                      meta3dState,
                                      ArraySt$Meta3dCommonlib.push(needMarkStateNotChangeIds, elementName)
                                    ];
                            }));
              }), [
              meta3dState,
              []
            ]);
}

function _invokeIMGUIRenderFunc(meta3dState, invokeFunc, param) {
  var imguiRendererExtensionProtocolName = param[1];
  var api = param[0];
  var imguiRendererState = api.getExtensionState(meta3dState, imguiRendererExtensionProtocolName);
  var imguiRendererService = api.getExtensionService(meta3dState, imguiRendererExtensionProtocolName);
  var imguiRendererState$1 = Curry._2(invokeFunc, imguiRendererState, imguiRendererService);
  return api.setExtensionState(meta3dState, imguiRendererExtensionProtocolName, imguiRendererState$1);
}

function _invokeIMGUIRenderFuncWithParam(meta3dState, invokeFunc, param) {
  var imguiRendererExtensionProtocolName = param[1];
  var api = param[0];
  var imguiRendererState = api.getExtensionState(meta3dState, imguiRendererExtensionProtocolName);
  var imguiRendererService = api.getExtensionService(meta3dState, imguiRendererExtensionProtocolName);
  var match = Curry._2(invokeFunc, imguiRendererState, imguiRendererService);
  var meta3dState$1 = api.setExtensionState(meta3dState, imguiRendererExtensionProtocolName, match[0]);
  return [
          meta3dState$1,
          match[1]
        ];
}

function _invokeIMGUIRenderFuncReturnData(meta3dState, invokeFunc, param) {
  var imguiRendererExtensionProtocolName = param[1];
  var api = param[0];
  var imguiRendererState = api.getExtensionState(meta3dState, imguiRendererExtensionProtocolName);
  var imguiRendererService = api.getExtensionService(meta3dState, imguiRendererExtensionProtocolName);
  return Curry._2(invokeFunc, imguiRendererState, imguiRendererService);
}

function render(api, meta3dState, param, time) {
  var imguiRendererExtensionProtocolName = param[1];
  var uiExtensionProtocolName = param[0];
  var state = api.getExtensionState(meta3dState, uiExtensionProtocolName);
  var meta3dState$1 = api.setExtensionState(meta3dState, uiExtensionProtocolName, state);
  var meta3dState$2 = _invokeIMGUIRenderFunc(meta3dState$1, (function (imguiRendererState, imguiRendererService) {
          return imguiRendererService.beforeExec(imguiRendererState, time);
        }), [
        api,
        imguiRendererExtensionProtocolName
      ]);
  return PromiseSt$Meta3dCommonlib.map(PromiseSt$Meta3dCommonlib.map(_exec(meta3dState$2, state), (function (param) {
                    var meta3dState = param[0];
                    var state = api.getExtensionState(meta3dState, uiExtensionProtocolName);
                    var state$1 = _markAllStateNotChange(state, param[1]);
                    return api.setExtensionState(meta3dState, uiExtensionProtocolName, state$1);
                  })), (function (meta3dState) {
                return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                              Curry._1(imguiRendererService.afterExec, undefined);
                              Curry._1(imguiRendererService.render, undefined);
                              return imguiRendererState;
                            }), [
                            api,
                            imguiRendererExtensionProtocolName
                          ]);
              }));
}

function _setElementFunc(state, elementName, elementFunc) {
  return {
          elementFuncMap: ImmutableHashMap$Meta3dCommonlib.set(state.elementFuncMap, elementName, elementFunc),
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function registerElement(state, param) {
  var elementName = param.elementName;
  return _markStateChange(show(_setElementExecOrder(_setElementState(_setElementFunc(_setCurrentElementName(state, elementName), elementName, param.elementFunc), elementName, param.elementState), elementName, param.execOrder), elementName), elementName);
}

function registerSkin(state, skinContribute) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.skinContributeMap, skinContribute.skinName, skinContribute),
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function registerUIControl(state, uiControlContribute) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.uiControlContributeMap, uiControlContribute.uiControlName, uiControlContribute),
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function getSkin(state, skinName) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(state.skinContributeMap, skinName);
}

function _getUIControlExn(state, uiControlName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.uiControlContributeMap, uiControlName);
}

function getUIControlFuncExn(state, uiControlName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.uiControlContributeMap, uiControlName).func;
}

function getUIControlState(state, uiControlName) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(state.uiControlStateMap, uiControlName);
}

function setUIControlState(state, uiControlName, uiControlState) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.uiControlStateMap, uiControlName, uiControlState),
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function isStateChange(state, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.isStateChangeMap, elementName);
}

function setStyle(meta3dState, data, style) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return imguiRendererService.setStyle(imguiRendererState, style);
              }), data);
}

function beginWindow(meta3dState, data, label) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.beginWindow(label);
                return imguiRendererState;
              }), data);
}

function endWindow(meta3dState, data) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                Curry._1(imguiRendererService.endWindow, undefined);
                return imguiRendererState;
              }), data);
}

function setNextWindowRect(meta3dState, data, rect) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.setNextWindowRect(rect);
                return imguiRendererState;
              }), data);
}

function getFBOTexture(state, textureID) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(state.fboTextureMap, textureID);
}

function setFBOTexture(state, textureID, texture) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          currentElementName: state.currentElementName,
          fboTextureMap: ImmutableHashMap$Meta3dCommonlib.set(state.fboTextureMap, textureID, texture)
        };
}

function addFBOTexture(meta3dState, data, texture, rect) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.addFBOTexture(texture, rect);
                return imguiRendererState;
              }), data);
}

function getWindowBarHeight(meta3dState, data) {
  return _invokeIMGUIRenderFuncReturnData(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return Curry._1(imguiRendererService.getWindowBarHeight, undefined);
              }), data);
}

function getContext(meta3dState, data) {
  return _invokeIMGUIRenderFuncReturnData(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return Curry._1(imguiRendererService.getContext, undefined);
              }), data);
}

function button(meta3dState, data, label, size) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.button(label, size)
                      ];
              }), data);
}

function setCursorPos(meta3dState, data, pos) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.setCursorPos(pos);
                return imguiRendererState;
              }), data);
}

function clear(meta3dState, data, clearColor) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.clear(clearColor);
                return imguiRendererState;
              }), data);
}

function init(meta3dState, param, isInitEvent, isDebug, canvas) {
  var imguiRendererExtensionProtocolName = param[1];
  var api = param[0];
  var imguiRendererState = api.getExtensionState(meta3dState, imguiRendererExtensionProtocolName);
  var imguiRendererService = api.getExtensionService(meta3dState, imguiRendererExtensionProtocolName);
  return PromiseSt$Meta3dCommonlib.map(imguiRendererService.init(imguiRendererState, isInitEvent, isDebug, canvas), (function (imguiRendererState) {
                return api.setExtensionState(meta3dState, imguiRendererExtensionProtocolName, imguiRendererState);
              }));
}

function getCurrentElementState(state) {
  return _getElementStateExn(state, OptionSt$Meta3dCommonlib.getExn(state.currentElementName));
}

export {
  hide ,
  show ,
  _markStateChange ,
  _markStateNotChange ,
  _markAllStateNotChange ,
  _getElementStateExn ,
  getElementState ,
  _setElementState ,
  _getElementExecOrderExn ,
  _setElementExecOrder ,
  _getCurrentElementName ,
  _setCurrentElementName ,
  updateElementState ,
  _exec ,
  _invokeIMGUIRenderFunc ,
  _invokeIMGUIRenderFuncWithParam ,
  _invokeIMGUIRenderFuncReturnData ,
  render ,
  _setElementFunc ,
  registerElement ,
  registerSkin ,
  registerUIControl ,
  getSkin ,
  _getUIControlExn ,
  getUIControlFuncExn ,
  getUIControlState ,
  setUIControlState ,
  isStateChange ,
  setStyle ,
  beginWindow ,
  endWindow ,
  setNextWindowRect ,
  getFBOTexture ,
  setFBOTexture ,
  addFBOTexture ,
  getWindowBarHeight ,
  getContext ,
  button ,
  setCursorPos ,
  clear ,
  init ,
  getCurrentElementState ,
}
/* No side effect */
