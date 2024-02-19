

import * as Curry from "../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as Js_array from "../../../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as Caml_option from "../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/PromiseSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

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
          inputContributeMap: state.inputContributeMap,
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
          inputContributeMap: state.inputContributeMap,
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
          inputContributeMap: state.inputContributeMap,
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
          inputContributeMap: state.inputContributeMap,
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
          inputContributeMap: state.inputContributeMap,
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
          inputContributeMap: state.inputContributeMap,
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
          inputContributeMap: state.inputContributeMap,
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
  var imguiRendererState$1 = invokeFunc(imguiRendererState, imguiRendererService);
  return api.setExtensionState(meta3dState, imguiRendererExtensionProtocolName, imguiRendererState$1);
}

function _invokeIMGUIRenderFuncWithParam(meta3dState, invokeFunc, param) {
  var imguiRendererExtensionProtocolName = param[1];
  var api = param[0];
  var imguiRendererState = api.getExtensionState(meta3dState, imguiRendererExtensionProtocolName);
  var imguiRendererService = api.getExtensionService(meta3dState, imguiRendererExtensionProtocolName);
  var match = invokeFunc(imguiRendererState, imguiRendererService);
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
  return invokeFunc(imguiRendererState, imguiRendererService);
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
          inputContributeMap: state.inputContributeMap,
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
          inputContributeMap: state.inputContributeMap,
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
          inputContributeMap: state.inputContributeMap,
          currentElementName: state.currentElementName,
          fboTextureMap: state.fboTextureMap
        };
}

function registerInput(state, inputContribute) {
  return {
          elementFuncMap: state.elementFuncMap,
          elementStateMap: state.elementStateMap,
          elementExecOrderMap: state.elementExecOrderMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          uiControlContributeMap: state.uiControlContributeMap,
          uiControlStateMap: state.uiControlStateMap,
          inputContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.inputContributeMap, inputContribute.inputName, inputContribute),
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

function getInputFunc(state, inputName) {
  return NullableSt$Meta3dCommonlib.map(ImmutableHashMap$Meta3dCommonlib.getNullable(state.inputContributeMap, inputName), (function (param) {
                return param.func;
              }));
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
          inputContributeMap: state.inputContributeMap,
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

function beginWindow(meta3dState, data, label, flags) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.beginWindow(label, flags);
                return imguiRendererState;
              }), data);
}

function endWindow(meta3dState, data) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                Curry._1(imguiRendererService.endWindow, undefined);
                return imguiRendererState;
              }), data);
}

function beginChild(meta3dState, data, label) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.beginChild(label);
                return imguiRendererState;
              }), data);
}

function endChild(meta3dState, data) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                Curry._1(imguiRendererService.endChild, undefined);
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
          inputContributeMap: state.inputContributeMap,
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

function loadImage(data, meta3dState, imageBase64Src) {
  return _invokeIMGUIRenderFuncReturnData(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return imguiRendererService.loadImage(imageBase64Src);
              }), data);
}

function asset(data, meta3dState, files, label, rect) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.asset(files, label, rect)
                      ];
              }), data);
}

function handleDragDropTarget(data, meta3dState, type_) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.handleDragDropTarget(type_)
                      ];
              }), data);
}

function menu(data, meta3dState, allLabels, windowName, rect) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.menu(allLabels, windowName, rect)
                      ];
              }), data);
}

function tree(data, meta3dState, treeData, treeNodeLabel, lastTreeSelectedData, windowName, rect) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.tree(treeData, treeNodeLabel, lastTreeSelectedData, windowName, rect)
                      ];
              }), data);
}

function switchButton(data, meta3dState, isRun, textures, size) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.switchButton(isRun, textures, size)
                      ];
              }), data);
}

function imageButton(data, meta3dState, texture, size) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.imageButton(texture, size)
                      ];
              }), data);
}

function image(data, meta3dState, texture, size) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.image(texture, size);
                return imguiRendererState;
              }), data);
}

function inputText(data, meta3dState, label, value, maxLength, width) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.inputText(label, value, maxLength, width)
                      ];
              }), data);
}

function inputFloat1(data, meta3dState, label, value, step, stepFast, width) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.inputFloat1(label, value, step, stepFast, width)
                      ];
              }), data);
}

function inputFloat3(data, meta3dState, label, value, step, stepFast, width) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.inputFloat3(label, value, step, stepFast, width)
                      ];
              }), data);
}

function checkbox(data, meta3dState, label, value) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.checkbox(label, value)
                      ];
              }), data);
}

function collapsing(data, meta3dState, label, isOpen, cond) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.collapsing(label, isOpen, cond)
                      ];
              }), data);
}

function openModal(data, meta3dState, label) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.openModal(label);
                return imguiRendererState;
              }), data);
}

function closeCurrentModal(data, meta3dState) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                Curry._1(imguiRendererService.closeCurrentModal, undefined);
                return imguiRendererState;
              }), data);
}

function beginModal(data, meta3dState, label) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.beginModal(label)
                      ];
              }), data);
}

function endModal(data, meta3dState) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                Curry._1(imguiRendererService.endModal, undefined);
                return imguiRendererState;
              }), data);
}

function popup(data, meta3dState, label, selectedValues, id) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.popup(label, selectedValues, id)
                      ];
              }), data);
}

function imagePopup(data, meta3dState, clickTexture, size, selectedValues, id) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.imagePopup(clickTexture, size, selectedValues, id)
                      ];
              }), data);
}

function dummy(data, meta3dState, width, height) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.dummy(width, height);
                return imguiRendererState;
              }), data);
}

function list(data, meta3dState, label, size, items, itemSize, isRemoveable, removeTexture) {
  return _invokeIMGUIRenderFuncWithParam(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return [
                        imguiRendererState,
                        imguiRendererService.list(label, size, items, itemSize, isRemoveable, removeTexture)
                      ];
              }), data);
}

function getItemRectMax(data, meta3dState) {
  return _invokeIMGUIRenderFuncReturnData(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return Curry._1(imguiRendererService.getItemRectMax, undefined);
              }), data);
}

function getItemRectSize(data, meta3dState) {
  return _invokeIMGUIRenderFuncReturnData(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return Curry._1(imguiRendererService.getItemRectSize, undefined);
              }), data);
}

function getWindowPos(data, meta3dState) {
  return _invokeIMGUIRenderFuncReturnData(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return Curry._1(imguiRendererService.getWindowPos, undefined);
              }), data);
}

function getWindowSize(data, meta3dState) {
  return _invokeIMGUIRenderFuncReturnData(meta3dState, (function (imguiRendererState, imguiRendererService) {
                return Curry._1(imguiRendererService.getWindowSize, undefined);
              }), data);
}

function clear(meta3dState, data, clearColor) {
  return _invokeIMGUIRenderFunc(meta3dState, (function (imguiRendererState, imguiRendererService) {
                imguiRendererService.clear(clearColor);
                return imguiRendererState;
              }), data);
}

function _getCurrentElementStateOption(state) {
  return OptionSt$Meta3dCommonlib.bind(state.currentElementName, (function (currentElementName) {
                return ImmutableHashMap$Meta3dCommonlib.get(state.elementStateMap, currentElementName);
              }));
}

function getCurrentElementState(state) {
  return getElementState(state, OptionSt$Meta3dCommonlib.getExn(state.currentElementName));
}

function setCurrentElementState(state, currentElementState) {
  return _setElementState(state, OptionSt$Meta3dCommonlib.getExn(state.currentElementName), currentElementState);
}

function init(meta3dState, param, isInitEvent, isDebug, canvas) {
  var imguiRendererExtensionProtocolName = param[1];
  var api = param[0];
  var uiExtensionProtocolName = "meta3d-ui-protocol";
  var uiState = api.getExtensionState(meta3dState, uiExtensionProtocolName);
  var elementState = _getCurrentElementStateOption(uiState);
  var meta3dState$1;
  if (elementState !== undefined) {
    var eventExtensionProtocolName = "meta3d-event-protocol";
    var eventService = api.getExtensionService(meta3dState, eventExtensionProtocolName);
    var eventState = api.getExtensionState(meta3dState, eventExtensionProtocolName);
    var elementState$1 = ArraySt$Meta3dCommonlib.reduceOneParam(Curry._1(eventService.getAllActionContributes, eventState), (function (elementState, param) {
            return ImmutableHashMap$Meta3dCommonlib.set(elementState, param[0], Curry._1(param[1].createState, meta3dState));
          }), Caml_option.valFromOption(elementState));
    var uiState$1 = setCurrentElementState(uiState, elementState$1);
    meta3dState$1 = api.setExtensionState(meta3dState, uiExtensionProtocolName, uiState$1);
  } else {
    meta3dState$1 = meta3dState;
  }
  var imguiRendererState = api.getExtensionState(meta3dState$1, imguiRendererExtensionProtocolName);
  var imguiRendererService = api.getExtensionService(meta3dState$1, imguiRendererExtensionProtocolName);
  return PromiseSt$Meta3dCommonlib.map(imguiRendererService.init(imguiRendererState, isInitEvent, isDebug, canvas), (function (imguiRendererState) {
                return api.setExtensionState(meta3dState$1, imguiRendererExtensionProtocolName, imguiRendererState);
              }));
}

function restore(api, currentMeta3dState, targetMeta3dState) {
  var eventExtensionProtocolName = "meta3d-event-protocol";
  var uiExtensionProtocolName = "meta3d-ui-protocol";
  var eventService = api.getExtensionService(targetMeta3dState, eventExtensionProtocolName);
  var eventState = api.getExtensionState(targetMeta3dState, eventExtensionProtocolName);
  var currentUIState = api.getExtensionState(currentMeta3dState, uiExtensionProtocolName);
  var currentElementState = NullableSt$Meta3dCommonlib.getExn(getElementState(currentUIState, OptionSt$Meta3dCommonlib.getExn(currentUIState.currentElementName)));
  var targetUIState = api.getExtensionState(targetMeta3dState, uiExtensionProtocolName);
  var targetElementState = ArraySt$Meta3dCommonlib.reduceOneParam(Curry._1(eventService.getAllActionContributes, eventState), (function (targetElementState, param) {
          var actionName = param[0];
          return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(param[1].restore, (function (restore) {
                            return ImmutableHashMap$Meta3dCommonlib.set(targetElementState, actionName, Curry._2(restore, ImmutableHashMap$Meta3dCommonlib.getExn(currentElementState, actionName), ImmutableHashMap$Meta3dCommonlib.getExn(targetElementState, actionName)));
                          })), targetElementState);
        }), NullableSt$Meta3dCommonlib.getExn(getElementState(targetUIState, OptionSt$Meta3dCommonlib.getExn(targetUIState.currentElementName))));
  var targetUIState$1 = setCurrentElementState(targetUIState, targetElementState);
  return api.setExtensionState(targetMeta3dState, uiExtensionProtocolName, targetUIState$1);
}

function deepCopy(api, meta3dState) {
  var eventExtensionProtocolName = "meta3d-event-protocol";
  var uiExtensionProtocolName = "meta3d-ui-protocol";
  var eventService = api.getExtensionService(meta3dState, eventExtensionProtocolName);
  var eventState = api.getExtensionState(meta3dState, eventExtensionProtocolName);
  var uiState = api.getExtensionState(meta3dState, uiExtensionProtocolName);
  var elementState = ArraySt$Meta3dCommonlib.reduceOneParam(Curry._1(eventService.getAllActionContributes, eventState), (function (elementState, param) {
          var actionName = param[0];
          return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(param[1].deepCopy, (function (deepCopy) {
                            return ImmutableHashMap$Meta3dCommonlib.set(elementState, actionName, Curry._1(deepCopy, ImmutableHashMap$Meta3dCommonlib.getExn(elementState, actionName)));
                          })), elementState);
        }), NullableSt$Meta3dCommonlib.getExn(getElementState(uiState, OptionSt$Meta3dCommonlib.getExn(uiState.currentElementName))));
  var uiState$1 = setCurrentElementState(uiState, elementState);
  return api.setExtensionState(meta3dState, uiExtensionProtocolName, uiState$1);
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
  registerInput ,
  getSkin ,
  _getUIControlExn ,
  getUIControlFuncExn ,
  getInputFunc ,
  getUIControlState ,
  setUIControlState ,
  isStateChange ,
  setStyle ,
  beginWindow ,
  endWindow ,
  beginChild ,
  endChild ,
  setNextWindowRect ,
  getFBOTexture ,
  setFBOTexture ,
  addFBOTexture ,
  getWindowBarHeight ,
  getContext ,
  button ,
  setCursorPos ,
  loadImage ,
  asset ,
  handleDragDropTarget ,
  menu ,
  tree ,
  switchButton ,
  imageButton ,
  image ,
  inputText ,
  inputFloat1 ,
  inputFloat3 ,
  checkbox ,
  collapsing ,
  openModal ,
  closeCurrentModal ,
  beginModal ,
  endModal ,
  popup ,
  imagePopup ,
  dummy ,
  list ,
  getItemRectMax ,
  getItemRectSize ,
  getWindowPos ,
  getWindowSize ,
  clear ,
  _getCurrentElementStateOption ,
  getCurrentElementState ,
  setCurrentElementState ,
  init ,
  restore ,
  deepCopy ,
}
/* No side effect */
