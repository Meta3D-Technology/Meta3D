

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionServiceExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, name);
}

function setExtensionState(state, name, extensionState) {
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionStateMap, name, extensionState),
          extensionLifeMap: state.extensionLifeMap,
          contributeMap: state.contributeMap
        };
}

function getExtensionStateExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionStateMap, name);
}

function getContributeExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.contributeMap, name);
}

function _getExtensionLifeExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, name);
}

function startExtensions(state, extensionNames) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(extensionNames, (function (state, extensionName) {
                return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, extensionName).onStart, (function (onStartFunc) {
                                  return Curry._2(onStartFunc, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionName));
                                })), state);
              }), state);
}

function registerExtension(state, name, getServiceFunc, getLifeFunc, param, extensionState) {
  return setExtensionState({
              extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionServiceMap, name, Curry._2(getServiceFunc, buildAPI(undefined), [
                        param[0],
                        param[1]
                      ])),
              extensionStateMap: state.extensionStateMap,
              extensionLifeMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionLifeMap, name, Curry._2(getLifeFunc, buildAPI(undefined), name)),
              contributeMap: state.contributeMap
            }, name, extensionState);
}

function registerContribute(state, name, getContributeFunc, param) {
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: state.extensionStateMap,
          extensionLifeMap: state.extensionLifeMap,
          contributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.contributeMap, name, Curry._2(getContributeFunc, buildAPI(undefined), [
                    param[0],
                    param[1]
                  ]))
        };
}

function buildAPI(param) {
  return {
          registerExtension: (function (state, extensionName, getExtensionService, getExtensionLife, param, extensionState) {
              return registerExtension(state, extensionName, getExtensionService, getExtensionLife, [
                          param[0],
                          param[1]
                        ], extensionState);
            }),
          getExtensionService: (function (state, name) {
              return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, name);
            }),
          getExtensionState: (function (state, name) {
              return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionStateMap, name);
            }),
          setExtensionState: setExtensionState,
          registerContribute: (function (state, contributeName, getContribute, param) {
              return registerContribute(state, contributeName, getContribute, [
                          param[0],
                          param[1]
                        ]);
            }),
          getContribute: (function (state, name) {
              return ImmutableHashMap$Meta3dCommonlib.getExn(state.contributeMap, name);
            })
        };
}

function prepare(param) {
  return {
          extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionLifeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          contributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

export {
  getExtensionServiceExn ,
  setExtensionState ,
  getExtensionStateExn ,
  getContributeExn ,
  _getExtensionLifeExn ,
  startExtensions ,
  registerExtension ,
  registerContribute ,
  buildAPI ,
  prepare ,
  
}
/* No side effect */
