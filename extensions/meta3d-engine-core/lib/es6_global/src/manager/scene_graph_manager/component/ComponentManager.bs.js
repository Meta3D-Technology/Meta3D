

import * as Log$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Result$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ContractResult$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/ContractResult.bs.js";
import * as MutableHashMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";
import * as PluginDataManager$Meta3dEngineCore from "../../work_manager/plugin_data/PluginDataManager.bs.js";

function registerComponent(state, data) {
  var componentData = state.componentData;
  return Result$Meta3dCommonlib.mapSuccess(ContractResult$Meta3dCommonlib.requireCheck((function (param) {
                    return ContractResult$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("not register before", "not"), (function (param) {
                                  return ContractResult$Meta3dCommonlib.assertFalse(ImmutableHashMap$Meta3dCommonlib.has(componentData.allRegisteredComponentData, data.componentName));
                                }));
                  }), PluginDataManager$Meta3dEngineCore.getIsDebug(undefined)), (function (param) {
                return {
                        allRegisteredWorkPluginData: state.allRegisteredWorkPluginData,
                        states: state.states,
                        pluginData: state.pluginData,
                        componentData: {
                          allRegisteredComponentData: ImmutableHashMap$Meta3dCommonlib.set(componentData.allRegisteredComponentData, data.componentName, data),
                          allUsedComponentData: componentData.allUsedComponentData
                        },
                        gameObjectData: state.gameObjectData,
                        usedGameObjectData: state.usedGameObjectData
                      };
              }));
}

function unregisterComponent(state, componentName) {
  var componentData = state.componentData;
  return {
          allRegisteredWorkPluginData: state.allRegisteredWorkPluginData,
          states: state.states,
          pluginData: state.pluginData,
          componentData: {
            allRegisteredComponentData: ImmutableHashMap$Meta3dCommonlib.deleteVal(componentData.allRegisteredComponentData, componentName),
            allUsedComponentData: componentData.allUsedComponentData
          },
          gameObjectData: state.gameObjectData,
          usedGameObjectData: state.usedGameObjectData
        };
}

function unsafeGetUsedComponentData(param, componentName) {
  return MutableHashMap$Meta3dCommonlib.unsafeGet(param.componentData.allUsedComponentData, componentName);
}

function setRelatedComponentData(poState, data, componentName) {
  MutableHashMap$Meta3dCommonlib.set(poState.componentData.allUsedComponentData, componentName, data);
  return poState;
}

function createAndSetComponentState(state, componentName, config) {
  var match = ImmutableHashMap$Meta3dCommonlib.unsafeGet(state.componentData.allRegisteredComponentData, componentName);
  var init = state.componentData;
  return {
          allRegisteredWorkPluginData: state.allRegisteredWorkPluginData,
          states: state.states,
          pluginData: state.pluginData,
          componentData: {
            allRegisteredComponentData: init.allRegisteredComponentData,
            allUsedComponentData: ImmutableHashMap$Meta3dCommonlib.set(state.componentData.allUsedComponentData, componentName, {
                  componentName: componentName,
                  state: match.createStateFunc(config),
                  createComponentFunc: match.createComponentFunc,
                  getGameObjectsFunc: match.getGameObjectsFunc,
                  addComponentFunc: match.addComponentFunc,
                  hasComponentFunc: match.hasComponentFunc,
                  getComponentFunc: match.getComponentFunc,
                  getAllComponentsFunc: match.getAllComponentsFunc,
                  getComponentDataFunc: match.getComponentDataFunc,
                  setComponentDataFunc: match.setComponentDataFunc
                })
          },
          gameObjectData: state.gameObjectData,
          usedGameObjectData: state.usedGameObjectData
        };
}

function _setComponentStateToData(componentState, data) {
  data.state = componentState;
  return data;
}

function createComponent(data) {
  var match = data.createComponentFunc(data.state);
  return [
          (data.state = match[0], data),
          match[1]
        ];
}

function setComponentData(data, component, dataName, dataValue) {
  var componentState = data.setComponentDataFunc(data.state, component, dataName, dataValue);
  data.state = componentState;
  return data;
}

function addComponent(data, gameObject, component) {
  var componentState = data.addComponentFunc(data.state, gameObject, component);
  data.state = componentState;
  return data;
}

function hasComponent(data, gameObject) {
  return data.hasComponentFunc(data.state, gameObject);
}

function getComponent(data, gameObject) {
  return data.getComponentFunc(data.state, gameObject);
}

function getAllComponents(data) {
  return data.getAllComponentsFunc(data.state);
}

function getComponentData(data, component, dataName) {
  return data.getComponentDataFunc(data.state, component, dataName);
}

function getComponentGameObjects(data, component) {
  return data.getGameObjectsFunc(data.state, component);
}

function getState(state, componentName) {
  return OptionSt$Meta3dCommonlib.map(MutableHashMap$Meta3dCommonlib.get(state.componentData.allUsedComponentData, componentName), (function (param) {
                return param.state;
              }));
}

export {
  registerComponent ,
  unregisterComponent ,
  unsafeGetUsedComponentData ,
  setRelatedComponentData ,
  createAndSetComponentState ,
  _setComponentStateToData ,
  createComponent ,
  setComponentData ,
  addComponent ,
  hasComponent ,
  getComponent ,
  getAllComponents ,
  getComponentData ,
  getComponentGameObjects ,
  getState ,
  
}
/* No side effect */
