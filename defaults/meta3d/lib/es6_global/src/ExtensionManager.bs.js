

import * as Curry from "./../../../../rescript/lib/es6/curry.js";
import * as ImmutableHashMap$Meta3dCommonlib from "./../../../../meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionServiceExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, name);
}

function setExtensionState(state, name, extensionState) {
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionStateMap, name, extensionState)
        };
}

function getExtensionStateExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionStateMap, name);
}

function register(state, name, getServiceFunc, dependentExtensionNameMap, extensionState) {
  return setExtensionState({
              extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionServiceMap, name, Curry._2(getServiceFunc, buildAPI(undefined), dependentExtensionNameMap)),
              extensionStateMap: state.extensionStateMap
            }, name, extensionState);
}

function buildAPI(param) {
  return {
          registerExtension: register,
          getExtensionService: (function (state, name) {
              return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, name);
            }),
          getExtensionState: (function (state, name) {
              return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionStateMap, name);
            }),
          setExtensionState: setExtensionState
        };
}

function prepare(param) {
  return {
          extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

export {
  getExtensionServiceExn ,
  setExtensionState ,
  getExtensionStateExn ,
  register ,
  buildAPI ,
  prepare ,
  
}
/* No side effect */
