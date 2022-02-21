'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Result$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Result.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ContractResult$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/ContractResult.bs.js");
var MutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");
var PluginDataManager$Meta3dEngineCore = require("../../work_manager/plugin_data/PluginDataManager.bs.js");

function registerComponent(state, data) {
  var componentData = state.componentData;
  return Result$Meta3dCommonlib.mapSuccess(ContractResult$Meta3dCommonlib.requireCheck((function (param) {
                    return ContractResult$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("not register before", "not"), (function (param) {
                                  return ContractResult$Meta3dCommonlib.assertFalse(ImmutableHashMap$Meta3dCommonlib.has(componentData.allRegisteredComponentData, data.componentName));
                                }));
                  }), PluginDataManager$Meta3dEngineCore.getIsDebug(undefined)), (function (param) {
                return {
                        allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
                        states: state.states,
                        pluginData: state.pluginData,
                        componentData: {
                          allRegisteredComponentData: ImmutableHashMap$Meta3dCommonlib.set(componentData.allRegisteredComponentData, data.componentName, data),
                          allUsedComponentData: componentData.allUsedComponentData
                        },
                        gameObjectContribute: state.gameObjectContribute,
                        usedGameObjectData: state.usedGameObjectData
                      };
              }));
}

function unregisterComponent(state, componentName) {
  var componentData = state.componentData;
  return {
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
          states: state.states,
          pluginData: state.pluginData,
          componentData: {
            allRegisteredComponentData: ImmutableHashMap$Meta3dCommonlib.deleteVal(componentData.allRegisteredComponentData, componentName),
            allUsedComponentData: componentData.allUsedComponentData
          },
          gameObjectContribute: state.gameObjectContribute,
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
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
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
          gameObjectContribute: state.gameObjectContribute,
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

function getComponentContribute(data, component, dataName) {
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

exports.registerComponent = registerComponent;
exports.unregisterComponent = unregisterComponent;
exports.unsafeGetUsedComponentData = unsafeGetUsedComponentData;
exports.setRelatedComponentData = setRelatedComponentData;
exports.createAndSetComponentState = createAndSetComponentState;
exports._setComponentStateToData = _setComponentStateToData;
exports.createComponent = createComponent;
exports.setComponentData = setComponentData;
exports.addComponent = addComponent;
exports.hasComponent = hasComponent;
exports.getComponent = getComponent;
exports.getAllComponents = getAllComponents;
exports.getComponentContribute = getComponentContribute;
exports.getComponentGameObjects = getComponentGameObjects;
exports.getState = getState;
/* No side effect */
