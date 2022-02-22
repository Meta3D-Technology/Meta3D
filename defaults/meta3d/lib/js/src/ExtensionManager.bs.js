'use strict';

var Curry = require("rescript/lib/js/curry.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function getServiceExn(state, name) {
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

function buildAPI(param) {
  return {
          getServiceExn: (function (state, name) {
              return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, name);
            }),
          getExtensionStateExn: (function (state, name) {
              return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionStateMap, name);
            }),
          setExtensionState: setExtensionState
        };
}

function register(state, name, getServiceFunc, dependentExtensionNameMap, extensionState) {
  return setExtensionState({
              extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionServiceMap, name, Curry._2(getServiceFunc, buildAPI(undefined), dependentExtensionNameMap)),
              extensionStateMap: state.extensionStateMap
            }, name, extensionState);
}

function prepare(param) {
  return {
          extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

exports.getServiceExn = getServiceExn;
exports.setExtensionState = setExtensionState;
exports.getExtensionStateExn = getExtensionStateExn;
exports.buildAPI = buildAPI;
exports.register = register;
exports.prepare = prepare;
/* No side effect */
