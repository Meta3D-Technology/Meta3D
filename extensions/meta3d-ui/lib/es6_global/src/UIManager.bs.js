

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/PromiseSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function hide(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, id, false),
          isStateChangeMap: state.isStateChangeMap,
          reducers: state.reducers
        };
}

function show(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: ImmutableHashMap$Meta3dCommonlib.set(state.isShowMap, id, true),
          isStateChangeMap: state.isStateChangeMap,
          reducers: state.reducers
        };
}

function _markStateChange(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, id, true),
          reducers: state.reducers
        };
}

function _markStateNotChange(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isShowMap: state.isShowMap,
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.set(state.isStateChangeMap, id, false),
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

function render(api, meta3dState, uiExtensionName) {
  var state = api.getExtensionStateExn(meta3dState, uiExtensionName);
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
                    return PromiseSt$Meta3dCommonlib.map(Curry._1(execFunc, meta3dState), (function (meta3dState) {
                                  return [
                                          meta3dState,
                                          ArraySt$Meta3dCommonlib.push(needMarkStateNotChangeIds, id)
                                        ];
                                }));
                  }), [
                  meta3dState,
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
          reducers: state.reducers
        };
}

function register(state, param) {
  var id = param.id;
  return _markStateChange(show(_setExecState(_setExecFunc(state, id, param.execFunc), id, param.execState), id), id);
}

var drawButton = (function(meta3dState, {x,y,width,height,text},onClickFunc) {
  /////*! only read state, not write it */
  /*! get state from meta3dState */

  let id = "_" + ( x+y ).toString()

  if(document.querySelector("#" + id) !== null){
document.querySelector("#" + id).remove()
  }


let button = document.createElement("button")

button.style.position = "absolute"
button.style.left = x + "px"
button.style.top = y + "px"
button.style.width = width + "px"
button.style.height = height + "px"
button.innerHTML =text

// TODO fix onclick, should return meta3dState
button.onclick = (e) => onClickFunc(meta3dState)
button.id = id

  document.body.appendChild(
    button
  )

  return new Promise((resolve) =>{
    resolve(meta3dState)
  }) 
});

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
  render ,
  _setExecFunc ,
  register ,
  drawButton ,
  
}
/* No side effect */
