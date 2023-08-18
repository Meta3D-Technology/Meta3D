

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_array from "../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as Js_string from "../../../../../node_modules/rescript/lib/es6/js_string.js";
import * as Log$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionServiceExn(state, protocolName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, protocolName);
}

function setExtensionState(state, protocolName, extensionState) {
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionStateMap, protocolName, extensionState),
          extensionLifeMap: state.extensionLifeMap,
          contributeExceptActionMap: state.contributeExceptActionMap,
          actionMap: state.actionMap
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

function registerExtension(state, protocolName, getServiceFunc, getLifeFunc, extensionState) {
  _checkIsRegister(protocolName, ImmutableHashMap$Meta3dCommonlib.has(state.extensionServiceMap, protocolName));
  var state$1 = setExtensionState({
        extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionServiceMap, protocolName, Curry._1(getServiceFunc, buildAPI(undefined))),
        extensionStateMap: state.extensionStateMap,
        extensionLifeMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionLifeMap, protocolName, Curry._2(getLifeFunc, buildAPI(undefined), protocolName)),
        contributeExceptActionMap: state.contributeExceptActionMap,
        actionMap: state.actionMap
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
            actionMap: state.actionMap
          };
  }
  var actions = ImmutableHashMap$Meta3dCommonlib.get(state.actionMap, protocolName);
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: state.extensionStateMap,
          extensionLifeMap: state.extensionLifeMap,
          contributeExceptActionMap: state.contributeExceptActionMap,
          actionMap: actions !== undefined ? ImmutableHashMap$Meta3dCommonlib.set(state.actionMap, protocolName, ArraySt$Meta3dCommonlib.push(actions, contribute)) : ImmutableHashMap$Meta3dCommonlib.set(state.actionMap, protocolName, [contribute])
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
          registerContribute: registerContribute,
          getContribute: getContributeExn,
          getAllContributesByType: getAllContributesByType
        };
}

export {
  getExtensionServiceExn ,
  setExtensionState ,
  getExtensionStateExn ,
  _isAction ,
  getContributeExn ,
  getAllContributesByType ,
  _getExtensionLifeExn ,
  _invokeLifeOnStartHander ,
  _invokeSyncLifeOtherHander ,
  _invokeAsyncLifeOtherHander ,
  startExtension ,
  updateExtension ,
  initExtension ,
  _decideContributeType ,
  _checkIsRegister ,
  registerExtension ,
  registerContribute ,
  buildAPI ,
}
/* No side effect */
