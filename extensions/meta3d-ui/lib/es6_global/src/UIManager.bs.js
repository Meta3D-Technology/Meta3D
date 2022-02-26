

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/PromiseSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function markNotRender(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isRenderMap: ImmutableHashMap$Meta3dCommonlib.set(state.isRenderMap, id, false)
        };
}

function markRender(state, id) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: state.execStateMap,
          isRenderMap: ImmutableHashMap$Meta3dCommonlib.set(state.isRenderMap, id, true)
        };
}

function _markAllNotRender(state) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(ImmutableHashMap$Meta3dCommonlib.entries(state.isRenderMap), (function (state, param) {
                if (param[1]) {
                  return markNotRender(state, param[0]);
                } else {
                  return state;
                }
              }), state);
}

function render(api, meta3dState, uiExtensionName) {
  var state = api.getExtensionStateExn(meta3dState, uiExtensionName);
  var execFuncMap = state.execFuncMap;
  return PromiseSt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.traverseReducePromiseM(ImmutableHashMap$Meta3dCommonlib.entries(state.isRenderMap), (function (meta3dState, param) {
                    if (!param[1]) {
                      return Promise.resolve(meta3dState);
                    }
                    var execFunc = ImmutableHashMap$Meta3dCommonlib.getExn(execFuncMap, param[0]);
                    return Curry._1(execFunc, meta3dState);
                  }), meta3dState), (function (meta3dState) {
                var state = api.getExtensionStateExn(meta3dState, uiExtensionName);
                var state$1 = _markAllNotRender(state);
                return api.setExtensionState(meta3dState, uiExtensionName, state$1);
              }));
}

function _setExecFunc(state, id, execFunc) {
  return {
          execFuncMap: ImmutableHashMap$Meta3dCommonlib.set(state.execFuncMap, id, execFunc),
          execStateMap: state.execStateMap,
          isRenderMap: state.isRenderMap
        };
}

function getExecState(param, id) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(param.execStateMap, id);
}

function _setExecState(state, id, execState) {
  return {
          execFuncMap: state.execFuncMap,
          execStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.execStateMap, id, execState),
          isRenderMap: state.isRenderMap
        };
}

function register(state, param) {
  var id = param.id;
  return markRender(_setExecState(_setExecFunc(state, id, param.execFunc), id, param.execState), id);
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
  markNotRender ,
  markRender ,
  _markAllNotRender ,
  render ,
  _setExecFunc ,
  getExecState ,
  _setExecState ,
  register ,
  drawButton ,
  
}
/* No side effect */
