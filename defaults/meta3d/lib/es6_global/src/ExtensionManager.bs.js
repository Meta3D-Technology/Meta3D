

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_array from "../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as Js_string from "../../../../../node_modules/rescript/lib/es6/js_string.js";
import * as Log$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
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
          contributeExceptInputMap: state.contributeExceptInputMap,
          inputMap: state.inputMap,
          packageStoreInAppMap: state.packageStoreInAppMap
        };
}

function getExtensionStateExn(state, protocolName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionStateMap, protocolName);
}

function _isInput(protocolName) {
  if (Js_string.includes("-input-", protocolName)) {
    return true;
  } else {
    return false;
  }
}

function getContributeExn(state, protocolName) {
  if (_isInput(protocolName)) {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("shouldn't get input whose protocol is: " + protocolName + "!", "", "", "", "")));
  } else {
    return Tuple2$Meta3dCommonlib.getLast(ImmutableHashMap$Meta3dCommonlib.getExn(state.contributeExceptInputMap, protocolName));
  }
}

function getAllContributesByType(state, contributeType) {
  if (contributeType !== 7) {
    return ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.filter(ImmutableHashMap$Meta3dCommonlib.getValidValues(state.contributeExceptInputMap), (function (param) {
                      return param[0] === contributeType;
                    })), Tuple2$Meta3dCommonlib.getLast);
  } else {
    return ArraySt$Meta3dCommonlib.reduceOneParam(ImmutableHashMap$Meta3dCommonlib.getValidValues(state.inputMap), (function (result, arr) {
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
  } else if (!(contribute.inputName == null) && !(contribute.func == null)) {
    return /* Input */7;
  } else if (!(contribute.skinName == null) && !(contribute.skin == null)) {
    return /* Skin */1;
  } else if (!(contribute.pipelineName == null) && !(contribute.allPipelineData == null)) {
    return /* Pipeline */6;
  } else {
    return /* Unknown */8;
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

function _buildNullableAPI(param) {
  return {
          getExn: NullableSt$Meta3dCommonlib.getExn,
          isNullable: NullableSt$Meta3dCommonlib.isNullable,
          return: NullableSt$Meta3dCommonlib.$$return,
          getWithDefault: NullableSt$Meta3dCommonlib.getWithDefault,
          map: (function (func, data) {
              return NullableSt$Meta3dCommonlib.map(data, func);
            }),
          bind: (function (func, data) {
              return NullableSt$Meta3dCommonlib.bind(data, func);
            }),
          getEmpty: NullableSt$Meta3dCommonlib.getEmpty
        };
}

function _buildImmutableAPI(nullableAPI, getPackageService) {
  return {
          createList: (function (state){
    let { createList } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).core(state).immutable(state)

    return createList()
  }),
          createMap: (function (state){
    let { createMap } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).core(state).immutable(state)

    return createMap()
  })
        };
}

function _buildActionAPI(nullableAPI, getPackageService) {
  return {
          getActionState: (function (state, actionName){
    let { getCurrentElementState } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).ui(state)

    return nullableAPI.bind(currentElementState => {
      return currentElementState[actionName]
    }, getCurrentElementState(state))
  }),
          setActionState: (function (state, actionName, actionState){
    let { updateElementState } = nullableAPI. getExn(getPackageService(state, "meta3d-editor-whole-protocol")).ui(state)

    state = updateElementState(state,
      (elementState) => {
        return Object.assign({}, elementState, {
            [actionName]: actionState
        })
      }
    )

    return state
  })
        };
}

function _buildUIControlAPI(nullableAPI, getPackageService) {
  return {
          getUIControlState: (function (state, uiControlName){
    let { getUIControlState } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).ui(state)

    return getUIControlState(state, uiControlName)
  }),
          setUIControlState: (function (state, uiControlName, uiControlState){
    let { setUIControlState } = nullableAPI. getExn(getPackageService(state, "meta3d-editor-whole-protocol")).ui(state)

    state = setUIControlState(state, uiControlName, uiControlState)

    return state
  })
        };
}

function registerExtension(state, protocolName, getServiceFunc, getLifeFunc, extensionState) {
  _checkIsRegister(protocolName, ImmutableHashMap$Meta3dCommonlib.has(state.extensionServiceMap, protocolName));
  var state$1 = setExtensionState({
        extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionServiceMap, protocolName, Curry._1(getServiceFunc, buildAPI(undefined))),
        extensionStateMap: state.extensionStateMap,
        extensionLifeMap: ImmutableHashMap$Meta3dCommonlib.set(state.extensionLifeMap, protocolName, Curry._2(getLifeFunc, buildAPI(undefined), protocolName)),
        contributeExceptInputMap: state.contributeExceptInputMap,
        inputMap: state.inputMap,
        packageStoreInAppMap: state.packageStoreInAppMap
      }, protocolName, extensionState);
  return _invokeSyncLifeOtherHander(state$1, protocolName, ImmutableHashMap$Meta3dCommonlib.getExn(state$1.extensionLifeMap, protocolName).onRegister);
}

function registerContribute(state, protocolName, getContributeFunc) {
  var contribute = Curry._1(getContributeFunc, buildAPI(undefined));
  var contributeType = _decideContributeType(contribute);
  if (contributeType !== 7) {
    _checkIsRegister(protocolName, ImmutableHashMap$Meta3dCommonlib.has(state.contributeExceptInputMap, protocolName));
    return {
            extensionServiceMap: state.extensionServiceMap,
            extensionStateMap: state.extensionStateMap,
            extensionLifeMap: state.extensionLifeMap,
            contributeExceptInputMap: ImmutableHashMap$Meta3dCommonlib.set(state.contributeExceptInputMap, protocolName, [
                  contributeType,
                  contribute
                ]),
            inputMap: state.inputMap,
            packageStoreInAppMap: state.packageStoreInAppMap
          };
  }
  var inputs = ImmutableHashMap$Meta3dCommonlib.get(state.inputMap, protocolName);
  return {
          extensionServiceMap: state.extensionServiceMap,
          extensionStateMap: state.extensionStateMap,
          extensionLifeMap: state.extensionLifeMap,
          contributeExceptInputMap: state.contributeExceptInputMap,
          inputMap: inputs !== undefined ? ImmutableHashMap$Meta3dCommonlib.set(state.inputMap, protocolName, ArraySt$Meta3dCommonlib.push(inputs, contribute)) : ImmutableHashMap$Meta3dCommonlib.set(state.inputMap, protocolName, [contribute]),
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
          deepCopy: deepCopy,
          nullable: _buildNullableAPI(undefined),
          immutable: _buildImmutableAPI(_buildNullableAPI(undefined), getPackageService),
          action: _buildActionAPI(_buildNullableAPI(undefined), getPackageService),
          uiControl: _buildUIControlAPI(_buildNullableAPI(undefined), getPackageService)
        };
}

export {
  getExtensionServiceExn ,
  setExtensionState ,
  getExtensionStateExn ,
  _isInput ,
  getContributeExn ,
  getAllContributesByType ,
  _getExtensionLifeExn ,
  _invokeLifeOnStartHander ,
  _invokeSyncLifeOtherHander ,
  _invokeAsyncLifeOtherHander ,
  startExtension ,
  updateExtension ,
  initExtension ,
  getPackageService ,
  _decideContributeType ,
  _checkIsRegister ,
  restore ,
  deepCopy ,
  _buildNullableAPI ,
  _buildImmutableAPI ,
  _buildActionAPI ,
  _buildUIControlAPI ,
  registerExtension ,
  registerContribute ,
  buildAPI ,
}
/* No side effect */
