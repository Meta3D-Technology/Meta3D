

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Log$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
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

function _invokeLifeOnStartHander(state, extensionName, handlerNullable) {
  var handler = NullableSt$Meta3dCommonlib.getExn(handlerNullable);
  return Curry._2(handler, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionName));
}

function _invokeLifeOtherHander(state, extensionName, handlerNullable) {
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(handlerNullable, (function (handler) {
                    return Curry._2(handler, state, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionServiceMap, extensionName));
                  })), state);
}

function startExtension(state, extensionName) {
  return _invokeLifeOnStartHander(state, extensionName, ImmutableHashMap$Meta3dCommonlib.getExn(state.extensionLifeMap, extensionName).onStart);
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
  } else if (!(contribute.workPluginName == null) && !(contribute.allPipelineData == null)) {
    return /* WorkPlugin */6;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("unknown contribute type", "", "", "", "")));
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
  return _invokeLifeOtherHander(state$1, name, ImmutableHashMap$Meta3dCommonlib.getExn(state$1.extensionLifeMap, name).onRegister);
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

export {
  getExtensionServiceExn ,
  setExtensionState ,
  getExtensionStateExn ,
  getContributeExn ,
  getAllContributesByType ,
  _getExtensionLifeExn ,
  _invokeLifeOnStartHander ,
  _invokeLifeOtherHander ,
  startExtension ,
  _decideContributeType ,
  registerExtension ,
  registerContribute ,
  buildAPI ,
  
}
/* No side effect */
