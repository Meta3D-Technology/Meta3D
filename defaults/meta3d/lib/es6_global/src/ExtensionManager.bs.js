

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionServiceExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, name);
}

function setExtensionState(state, name, extensionState) {
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionStateMap, name, extensionState),
          contributeMap: state.contributeMap
        };
}

function getExtensionStateExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionStateMap, name);
}

function getContributeExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.contributeMap, name);
}

function registerExtension(state, name, getServiceFunc, param, extensionState) {
  return setExtensionState({
              extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionServiceMap, name, Curry._2(getServiceFunc, buildAPI(undefined), [
                        param[0],
                        param[1]
                      ])),
              extensionStateMap: state.extensionStateMap,
              contributeMap: state.contributeMap
            }, name, extensionState);
}

function registerContribute(state, name, getContributeFunc, param) {
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: state.extensionStateMap,
          contributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.contributeMap, name, Curry._2(getContributeFunc, buildAPI(undefined), [
                    param[0],
                    param[1]
                  ]))
        };
}

function buildAPI(param) {
  return {
          registerExtension: (function (state, extensionName, getExtensionService, param, extensionState) {
              return registerExtension(state, extensionName, getExtensionService, [
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
          contributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

export {
  getExtensionServiceExn ,
  setExtensionState ,
  getExtensionStateExn ,
  getContributeExn ,
  registerExtension ,
  registerContribute ,
  buildAPI ,
  prepare ,
  
}
/* No side effect */
