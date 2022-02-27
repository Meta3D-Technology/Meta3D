

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/PromiseSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function hide(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, id, false),
          isStateChangeMap: state.isStateChangeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function show(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, id, true),
          isStateChangeMap: state.isStateChangeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function _markStateChange(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, id, true),
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function _markStateNotChange(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, id, false),
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
          ioData: state.ioData,
          reducers: ArraySt$Meta3dCommonlib.push(state.reducers, reducerData)
        };
}

function _getExecStateExn(param, id) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(param.execStateMap, id);
}

function getExecState(param, id) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(param.execStateMap, id);
}

function _setExecState(state, id, execState) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.execStateMap, id, execState),
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function dispatch(state, action) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(state.reducers, (function (state, param) {
                var id = param[0];
                var oldExecState = _getExecStateExn(state, id);
                var newExecState = Curry._2(param[1], oldExecState, action);
                if (oldExecState !== newExecState) {
                  return _setExecState(_markStateChange(state, id), id, newExecState);
                } else {
                  return _markStateNotChange(state, id);
                }
              }), state);
}

function _getIODataExn(param) {
  return OptionSt$Meta3dCommonlib.getExn(param.ioData);
}

function _setIOData(state, ioData) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          ioData: ioData,
          reducers: state.reducers
        };
}

function render(api, meta3dState, uiExtensionName, ioData) {
  var meta3dState$1 = api.setExtensionState(meta3dState, uiExtensionName, _setIOData(api.getExtensionStateExn(meta3dState, uiExtensionName), ioData));
  var state = api.getExtensionStateExn(meta3dState$1, uiExtensionName);
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
                    var id = param$1[0];
                    var execFunc = ImmutableHashMap$Meta3dCommonlib.getExn(execFuncMap, id);
                    return PromiseSt$Meta3dCommonlib.map(Curry._2(execFunc, meta3dState, id), (function (meta3dState) {
                                  return [
                                          meta3dState,
                                          ArraySt$Meta3dCommonlib.push(needMarkStateNotChangeIds, id)
                                        ];
                                }));
                  }), [
                  meta3dState$1,
                  []
                ]), (function (param) {
                var meta3dState = param[0];
                var state = api.getExtensionStateExn(meta3dState, uiExtensionName);
                var state$1 = _markAllStateNotChange(state, param[1]);
                return api.setExtensionState(meta3dState, uiExtensionName, state$1);
              }));
}

function _setExecFunc(state, id, execFunc) {
  return {
          execFuncMap: ImmutableHashMap$Meta3dCommonlib.set(state.execFuncMap, id, execFunc),
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: state.isStateChangeMap,
          ioData: state.ioData,
          reducers: state.reducers
        };
}

function register(state, param) {
  var id = param.id;
  return _markStateChange(show(_setExecState(_setExecFunc(state, id, param.execFunc), id, param.execState), id), id);
}

function isStateChange(state, id) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.isStateChangeMap, id);
}

var _clearButton = (function({x,y,width,height,text}) {
  let id = "_" + ( x+y ).toString()

  if(document.querySelector("#" + id) !== null){
document.querySelector("#" + id).remove()
  }
});

var _renderButton = (function( {x,y,width,height,text}) {
  let button = document.createElement("button")

  let id = "_" + ( x+y ).toString()

  button.id = id

  button.style.position = "absolute"
  button.style.left = x + "px"
  button.style.top = y + "px"
  button.style.width = width + "px"
  button.style.height = height + "px"
  button.innerHTML =text

  document.body.appendChild(
    button
  )
});

function drawButton(meta3dState, param, data) {
  var state = param[0].getExtensionStateExn(meta3dState, param[1]);
  _clearButton(data);
  _renderButton(data);
  var match = _getIODataExn(state);
  var y = data.y;
  var x = data.x;
  var pointPosition = match.pointPosition;
  var pointPositionY = pointPosition[1];
  var pointPositionX = pointPosition[0];
  var isClick = match.isPointDown && pointPositionX >= x && pointPositionX <= (x + data.width | 0) && pointPositionY >= y && pointPositionY <= (y + data.height | 0);
  return [
          meta3dState,
          isClick
        ];
}

export {
  hide ,
  show ,
  _markStateChange ,
  _markStateNotChange ,
  _markAllStateNotChange ,
  combineReducers ,
  _getExecStateExn ,
  getExecState ,
  _setExecState ,
  dispatch ,
  _getIODataExn ,
  _setIOData ,
  render ,
  _setExecFunc ,
  register ,
  isStateChange ,
  _clearButton ,
  _renderButton ,
  drawButton ,
  
}
/* No side effect */
