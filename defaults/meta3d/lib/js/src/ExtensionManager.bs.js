'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Tuple2$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/tuple/Tuple2.bs.js");
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
  return Tuple2$Meta3dCommonlib.getLast(ImmutableHashMap$Meta3dCommonlib.getExn(state.contributeMap, name));
}

function getAllContributesByType(state, contributeType) {
  return ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.filter(ImmutableHashMap$Meta3dCommonlib.getValidValues(state.contributeMap), (function (param) {
                    return param[0] === contributeType;
                  })), Tuple2$Meta3dCommonlib.getLast);
}

function _getExtensionLifeExn(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, name);
}

function _invokeLifeOnStartHander(state, extensionName, configData, handlerNullable) {
  var handler = NullableSt$Meta3dCommonlib.getExn(handlerNullable);
  return Curry._3(handler, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionName), configData);
}

function _invokeSyncLifeOtherHander(state, extensionName, handlerNullable) {
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(handlerNullable, (function (handler) {
                    return Curry._2(handler, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionName));
                  })), state);
}

function _invokeAsyncLifeOtherHander(state, extensionName, data, handlerNullable) {
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(handlerNullable, (function (handler) {
                    return Curry._3(handler, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionName), data);
                  })), new Promise((function (resolve, reject) {
                    resolve(state);
                  })));
}

function startExtension(state, extensionName, configData) {
  _invokeLifeOnStartHander(state, extensionName, configData, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, extensionName).onStart);
}

function updateExtension(state, extensionName, data) {
  return _invokeAsyncLifeOtherHander(state, extensionName, data, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, extensionName).onUpdate);
}

function initExtension(state, extensionName, data) {
  return _invokeAsyncLifeOtherHander(state, extensionName, data, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, extensionName).onInit);
}

function _decideContributeType(contribute) {
  if (!(contribute.actionName == null) && !(contribute.handler == null)) {
    return /* Action */3;
  } else if (!(contribute.componentName == null) && !(contribute.createComponentFunc == null)) {
    return /* Component */4;
  } else if (!(contribute.elementName == null) && !(contribute.execOrder == null)) {
    return /* Element */2;
  } else if (!(contribute.createGameObjectFunc == null) && !(contribute.getAllGameObjectsFunc == null)) {
    return /* GameObject */5;
  } else if (!(contribute.uiControlName == null) && !(contribute.func == null)) {
    return /* UIControl */0;
  } else if (!(contribute.skinName == null) && !(contribute.skin == null)) {
    return /* Skin */1;
  } else if (!(contribute.workPluginName == null) && !(contribute.allPipelineData == null)) {
    return /* WorkPlugin */6;
  } else {
    return /* Unknown */7;
  }
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
  return _invokeSyncLifeOtherHander(state$1, name, ImmutableHashMap$Meta3dCommonlib.getExn(state$1.extensionLifeMap, name).onRegister);
}

function registerContribute(state, name, getContributeFunc, param) {
  var contribute = Curry._2(getContributeFunc, buildAPI(undefined), [
        param[0],
        param[1]
      ]);
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: state.extensionStateMap,
          extensionLifeMap: state.extensionLifeMap,
          contributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.contributeMap, name, [
                _decideContributeType(contribute),
                contribute
              ])
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
          getContribute: getContributeExn,
          getAllContributesByType: getAllContributesByType
        };
}

exports.getExtensionServiceExn = getExtensionServiceExn;
exports.setExtensionState = setExtensionState;
exports.getExtensionStateExn = getExtensionStateExn;
exports.getContributeExn = getContributeExn;
exports.getAllContributesByType = getAllContributesByType;
exports._getExtensionLifeExn = _getExtensionLifeExn;
exports._invokeLifeOnStartHander = _invokeLifeOnStartHander;
exports._invokeSyncLifeOtherHander = _invokeSyncLifeOtherHander;
exports._invokeAsyncLifeOtherHander = _invokeAsyncLifeOtherHander;
exports.startExtension = startExtension;
exports.updateExtension = updateExtension;
exports.initExtension = initExtension;
exports._decideContributeType = _decideContributeType;
exports.registerExtension = registerExtension;
exports.registerContribute = registerContribute;
exports.buildAPI = buildAPI;
/* No side effect */
