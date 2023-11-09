'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_array = require("rescript/lib/js/js_array.js");
var Js_string = require("rescript/lib/js/js_string.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Tuple2$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/tuple/Tuple2.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function getExtensionServiceExn(state, protocolName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, protocolName);
}

function setExtensionState(state, protocolName, extensionState) {
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionStateMap, protocolName, extensionState),
          extensionLifeMap: state.extensionLifeMap,
          contributeExceptActionMap: state.contributeExceptActionMap,
          actionMap: state.actionMap,
          packageStoreInAppMap: state.packageStoreInAppMap
        };
}

function getExtensionStateExn(state, protocolName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionStateMap, protocolName);
}

function _isAction(protocolName) {
  if (Js_string.includes("-action-", protocolName)) {
    return true;
  } else {
    return false;
  }
}

function getContributeExn(state, protocolName) {
  if (_isAction(protocolName)) {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("shouldn't get action whose protocol is: " + protocolName + "!", "", "", "", "")));
  } else {
    return Tuple2$Meta3dCommonlib.getLast(ImmutableHashMap$Meta3dCommonlib.getExn(state.contributeExceptActionMap, protocolName));
  }
}

function getAllContributesByType(state, contributeType) {
  if (contributeType !== 3) {
    return ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.filter(ImmutableHashMap$Meta3dCommonlib.getValidValues(state.contributeExceptActionMap), (function (param) {
                      return param[0] === contributeType;
                    })), Tuple2$Meta3dCommonlib.getLast);
  } else {
    return ArraySt$Meta3dCommonlib.reduceOneParam(ImmutableHashMap$Meta3dCommonlib.getValidValues(state.actionMap), (function (result, arr) {
                  return Js_array.concat(arr, result);
                }), []);
  }
}

function _getExtensionLifeExn(state, protocolName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, protocolName);
}

function _invokeLifeOnStartHander(state, extensionProtocolName, configData, handlerNullable) {
  var handler = NullableSt$Meta3dCommonlib.getExn(handlerNullable);
  return Curry._3(handler, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionProtocolName), configData);
}

function _invokeSyncLifeOtherHander(state, extensionProtocolName, handlerNullable) {
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(handlerNullable, (function (handler) {
                    return Curry._2(handler, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionProtocolName));
                  })), state);
}

function _invokeAsyncLifeOtherHander(state, extensionProtocolName, data, handlerNullable) {
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(handlerNullable, (function (handler) {
                    return Curry._3(handler, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionProtocolName), data);
                  })), new Promise((function (resolve, reject) {
                    resolve(state);
                  })));
}

function startExtension(state, extensionProtocolName, configData) {
  _invokeLifeOnStartHander(state, extensionProtocolName, configData, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, extensionProtocolName).onStart);
}

function updateExtension(state, extensionProtocolName, data) {
  return _invokeAsyncLifeOtherHander(state, extensionProtocolName, data, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, extensionProtocolName).onUpdate);
}

function initExtension(state, extensionProtocolName, data) {
  return _invokeAsyncLifeOtherHander(state, extensionProtocolName, data, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, extensionProtocolName).onInit);
}

function getPackageService(state, protocolName) {
  return OptionSt$Meta3dCommonlib.toNullable(ImmutableHashMap$Meta3dCommonlib.get(state.extensionServiceMap, protocolName));
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
  } else if (!(contribute.pipelineName == null) && !(contribute.allPipelineData == null)) {
    return /* Pipeline */6;
  } else {
    return /* Unknown */7;
  }
}

function _checkIsRegister(protocolName, isRegister) {
  if (isRegister) {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("already register extension or contribute of protocol: " + protocolName + "", "", "", "", "")));
  }
  
}

function restore(currentState, targetState) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(ImmutableHashMap$Meta3dCommonlib.entries(targetState.extensionLifeMap), (function (targetState, param) {
                return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(param[1].onRestore, (function (handler) {
                                  return Curry._2(handler, currentState, targetState);
                                })), targetState);
              }), targetState);
}

function deepCopy(state) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(ImmutableHashMap$Meta3dCommonlib.entries(state.extensionLifeMap), (function (state, param) {
                return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(param[1].onDeepCopy, (function (handler) {
                                  return Curry._1(handler, state);
                                })), state);
              }), state);
}

function registerExtension(state, protocolName, getServiceFunc, getLifeFunc, extensionState) {
  _checkIsRegister(protocolName, ImmutableHashMap$Meta3dCommonlib.has(state.extensionServiceMap, protocolName));
  var state$1 = setExtensionState({
        extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionServiceMap, protocolName, Curry._1(getServiceFunc, buildAPI(undefined))),
        extensionStateMap: state.extensionStateMap,
        extensionLifeMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionLifeMap, protocolName, Curry._2(getLifeFunc, buildAPI(undefined), protocolName)),
        contributeExceptActionMap: state.contributeExceptActionMap,
        actionMap: state.actionMap,
        packageStoreInAppMap: state.packageStoreInAppMap
      }, protocolName, extensionState);
  return _invokeSyncLifeOtherHander(state$1, protocolName, ImmutableHashMap$Meta3dCommonlib.getExn(state$1.extensionLifeMap, protocolName).onRegister);
}

function registerContribute(state, protocolName, getContributeFunc) {
  var contribute = Curry._1(getContributeFunc, buildAPI(undefined));
  var contributeType = _decideContributeType(contribute);
  if (contributeType !== 3) {
    _checkIsRegister(protocolName, ImmutableHashMap$Meta3dCommonlib.has(state.contributeExceptActionMap, protocolName));
    return {
            extensionServiceMap: state.extensionServiceMap,
            extensionStateMap: state.extensionStateMap,
            extensionLifeMap: state.extensionLifeMap,
            contributeExceptActionMap: ImmutableHashMap$Meta3dCommonlib.set(state.contributeExceptActionMap, protocolName, [
                  contributeType,
                  contribute
                ]),
            actionMap: state.actionMap,
            packageStoreInAppMap: state.packageStoreInAppMap
          };
  }
  var actions = ImmutableHashMap$Meta3dCommonlib.get(state.actionMap, protocolName);
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: state.extensionStateMap,
          extensionLifeMap: state.extensionLifeMap,
          contributeExceptActionMap: state.contributeExceptActionMap,
          actionMap: actions !== undefined ? ImmutableHashMap$Meta3dCommonlib.set(state.actionMap, protocolName, ArraySt$Meta3dCommonlib.push(actions, contribute)) : ImmutableHashMap$Meta3dCommonlib.set(state.actionMap, protocolName, [contribute]),
          packageStoreInAppMap: state.packageStoreInAppMap
        };
}

function buildAPI(param) {
  return {
          registerExtension: registerExtension,
          getExtensionService: (function (state, protocolName) {
              return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, protocolName);
            }),
          getExtensionState: (function (state, protocolName) {
              return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionStateMap, protocolName);
            }),
          setExtensionState: setExtensionState,
          getPackageService: getPackageService,
          registerContribute: registerContribute,
          getContribute: getContributeExn,
          getAllContributesByType: getAllContributesByType,
          getPackage: (function (state, packageProtocolName) {
              return ImmutableHashMap$Meta3dCommonlib.getNullable(state.packageStoreInAppMap, packageProtocolName);
            }),
          restore: restore,
          deepCopy: deepCopy
        };
}

exports.getExtensionServiceExn = getExtensionServiceExn;
exports.setExtensionState = setExtensionState;
exports.getExtensionStateExn = getExtensionStateExn;
exports._isAction = _isAction;
exports.getContributeExn = getContributeExn;
exports.getAllContributesByType = getAllContributesByType;
exports._getExtensionLifeExn = _getExtensionLifeExn;
exports._invokeLifeOnStartHander = _invokeLifeOnStartHander;
exports._invokeSyncLifeOtherHander = _invokeSyncLifeOtherHander;
exports._invokeAsyncLifeOtherHander = _invokeAsyncLifeOtherHander;
exports.startExtension = startExtension;
exports.updateExtension = updateExtension;
exports.initExtension = initExtension;
exports.getPackageService = getPackageService;
exports._decideContributeType = _decideContributeType;
exports._checkIsRegister = _checkIsRegister;
exports.restore = restore;
exports.deepCopy = deepCopy;
exports.registerExtension = registerExtension;
exports.registerContribute = registerContribute;
exports.buildAPI = buildAPI;
/* No side effect */
