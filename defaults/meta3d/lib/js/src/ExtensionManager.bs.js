'use strict';

var Curry = require("rescript/lib/js/curry.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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

function _invokeLifeHander(state, extensionName, handlerNullable) {
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(handlerNullable, (function (handler) {
                    return Curry._2(handler, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionName));
                  })), state);
}

function startExtensions(state, extensionNames) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(extensionNames, (function (state, extensionName) {
                return _invokeLifeHander(state, extensionName, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, extensionName).onStart);
              }), state);
}

function registerExtension(state, name, getServiceFunc, getLifeFunc, param, extensionState) {
  var state$1 = setExtensionState({
        extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionServiceMap, name, Curry._2(getServiceFunc, buildAPI(undefined), [
                  param[0],
                  param[1]
                ])),
        extensionStateMap: state.extensionStateMap,
        extensionLifeMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionLifeMap, name, Curry._2(getLifeFunc, buildAPI(undefined), name)),
        contributeMap: state.contributeMap
      }, name, extensionState);
  return _invokeLifeHander(state$1, name, ImmutableHashMap$Meta3dCommonlib.getExn(state$1.extensionLifeMap, name).onRegister);
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

exports.getExtensionServiceExn = getExtensionServiceExn;
exports.setExtensionState = setExtensionState;
exports.getExtensionStateExn = getExtensionStateExn;
exports.getContributeExn = getContributeExn;
exports._getExtensionLifeExn = _getExtensionLifeExn;
exports._invokeLifeHander = _invokeLifeHander;
exports.startExtensions = startExtensions;
exports.registerExtension = registerExtension;
exports.registerContribute = registerContribute;
exports.buildAPI = buildAPI;
/* No side effect */
