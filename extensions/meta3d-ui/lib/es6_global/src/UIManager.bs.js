

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/PromiseSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function hide(state, elementName) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, elementName, false),
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          customControlContributeMap: state.customControlContributeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function show(state, elementName) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, elementName, true),
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          customControlContributeMap: state.customControlContributeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function _markStateChange(state, elementName) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, elementName, true),
          skinContributeMap: state.skinContributeMap,
          customControlContributeMap: state.customControlContributeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function _markStateNotChange(state, elementName) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, elementName, false),
          skinContributeMap: state.skinContributeMap,
          customControlContributeMap: state.customControlContributeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function _markAllStateNotChange(state, needMarkStateNotChangeIds) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(needMarkStateNotChangeIds, _markStateNotChange, state);
}

function combineReducers(state, reducerData) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          customControlContributeMap: state.customControlContributeMap,
          ioData: state.ioData,
          reducers: ArraySt$Meta3dCommonlib.push(state.reducers, reducerData)
        };
}

function _getElementStateExn(param, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(param.execStateMap, elementName);
}

function getElementState(param, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(param.execStateMap, elementName);
}

function _setElementState(state, elementName, elementState) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.execStateMap, elementName, elementState),
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          customControlContributeMap: state.customControlContributeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function dispatch(state, action) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(state.reducers, (function (state, param) {
                var elementName = param[0];
                var oldElementState = _getElementStateExn(state, elementName);
                var newElementState = Curry._2(param[1], oldElementState, action);
                if (oldElementState !== newElementState) {
                  return _setElementState(_markStateChange(state, elementName), elementName, newElementState);
                } else {
                  return _markStateNotChange(state, elementName);
                }
              }), state);
}

function getIODataExn(param) {
  return OptionSt$Meta3dCommonlib.getExn(param.ioData);
}

function _setIOData(state, ioData) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          customControlContributeMap: state.customControlContributeMap,
          ioData: ioData,
          reducers: state.reducers
        };
}

function render(api, meta3dState, uiExtensionName, ioData) {
  var meta3dState$1 = api.setExtensionState(meta3dState, uiExtensionName, _setIOData(api.getExtensionState(meta3dState, uiExtensionName), ioData));
  var state = api.getExtensionState(meta3dState$1, uiExtensionName);
  var execFuncMap = state.execFuncMap;
  return PromiseSt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.traverseReducePromiseM(ImmutableHashMap$Meta3dCommonlib.entries(state.isShowMap), (function (param, param$1) {
                    var needMarkStateNotChangeIds = param[1];
                    var meta3dState = param[0];
                    if (!param$1[1]) {
                      return Promise.resolve([
                                  meta3dState,
                                  needMarkStateNotChangeIds
                                ]);
                    }
                    var elementName = param$1[0];
                    var elementFunc = ImmutableHashMap$Meta3dCommonlib.getExn(execFuncMap, elementName);
                    return PromiseSt$Meta3dCommonlib.map(Curry._2(elementFunc, meta3dState, elementName), (function (meta3dState) {
                                  return [
                                          meta3dState,
                                          ArraySt$Meta3dCommonlib.push(needMarkStateNotChangeIds, elementName)
                                        ];
                                }));
                  }), [
                  meta3dState$1,
                  []
                ]), (function (param) {
                var meta3dState = param[0];
                var state = api.getExtensionState(meta3dState, uiExtensionName);
                var state$1 = _markAllStateNotChange(state, param[1]);
                return api.setExtensionState(meta3dState, uiExtensionName, state$1);
              }));
}

function _setElementFunc(state, elementName, elementFunc) {
  return {
          execFuncMap: ImmutableHashMap$Meta3dCommonlib.set(state.execFuncMap, elementName, elementFunc),
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          customControlContributeMap: state.customControlContributeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function registerElement(state, param) {
  var elementName = param.elementName;
  return _markStateChange(show(_setElementState(_setElementFunc(state, elementName, param.elementFunc), elementName, param.elementState), elementName), elementName);
}

function registerSkin(state, skinContribute) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.skinContributeMap, skinContribute.skinName, skinContribute),
          customControlContributeMap: state.customControlContributeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function registerCustomControl(state, customControlContribute) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          skinContributeMap: state.skinContributeMap,
          customControlContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.customControlContributeMap, customControlContribute.customControlName, customControlContribute),
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function getSkinExn(state, skinName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.skinContributeMap, skinName);
}

function getCustomControlExn(state, customControlName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.customControlContributeMap, customControlName).func;
}

function isStateChange(state, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.isStateChangeMap, elementName);
}

var _clearBox = (function({x,y}) {
  let elementName = "_box" + ( x+y ).toString()

  if(document.querySelector("#" + elementName) !== null){
document.querySelector("#" + elementName).remove()
  }
});

var _renderBox = (function(backgroundColor, {x,y,width,height}) {
  let dom = document.createElement("div")

  let elementName = "_box" + ( x+y ).toString()

  dom.elementName = elementName

  dom.style.position = "absolute"
  dom.style.left = x + "px"
  dom.style.top = y + "px"
  dom.style.width = width + "px"
  dom.style.height = height + "px"
  dom.style["background-color"] = backgroundColor

  document.body.appendChild(
    dom
  )
});

function drawBox(meta3dState, param, rect, backgroundColor) {
  param[0].getExtensionState(meta3dState, param[1]);
  _clearBox(rect);
  _renderBox(backgroundColor, rect);
  return meta3dState;
}

var _clearText = (function({x,y}) {
  let elementName = "_text" + ( x+y ).toString()

  if(document.querySelector("#" + elementName) !== null){
document.querySelector("#" + elementName).remove()
  }
});

var _renderText = (function(text, {x,y,width,height}) {
  let dom = document.createElement("span")

  let elementName = "_text" + ( x+y ).toString()

  dom.elementName = elementName

  dom.style.position = "absolute"
  dom.style.left = x + "px"
  dom.style.top = y + "px"
  dom.style.width = width + "px"
  dom.style.height = height + "px"
  dom.innerHTML = text

  document.body.appendChild(
    dom
  )
});

function drawText(meta3dState, param, rect, text) {
  param[0].getExtensionState(meta3dState, param[1]);
  _clearText(rect);
  _renderText(text, rect);
  return meta3dState;
}

export {
  hide ,
  show ,
  _markStateChange ,
  _markStateNotChange ,
  _markAllStateNotChange ,
  combineReducers ,
  _getElementStateExn ,
  getElementState ,
  _setElementState ,
  dispatch ,
  getIODataExn ,
  _setIOData ,
  render ,
  _setElementFunc ,
  registerElement ,
  registerSkin ,
  registerCustomControl ,
  getSkinExn ,
  getCustomControlExn ,
  isStateChange ,
  _clearBox ,
  _renderBox ,
  drawBox ,
  _clearText ,
  _renderText ,
  drawText ,
  
}
/* No side effect */
