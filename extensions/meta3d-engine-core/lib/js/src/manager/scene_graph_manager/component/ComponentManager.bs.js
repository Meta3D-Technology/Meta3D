'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Result$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Result.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ContractResult$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/ContractResult.bs.js");
var MutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");
var PluginDataManager$Meta3dEngineCore = require("../../work_manager/plugin_data/PluginDataManager.bs.js");

function registerComponent(state, componentContribute) {
  var componentContributeData = state.componentContributeData;
  return Result$Meta3dCommonlib.mapSuccess(ContractResult$Meta3dCommonlib.requireCheck((function (param) {
                    return ContractResult$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("not register before", "not"), (function (param) {
                                  return ContractResult$Meta3dCommonlib.assertFalse(ImmutableHashMap$Meta3dCommonlib.has(componentContributeData.allComponentContributes, componentContribute.componentName));
                                }));
                  }), PluginDataManager$Meta3dEngineCore.getIsDebug(state)), (function (param) {
                return {
                        allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
                        states: state.states,
                        pluginData: state.pluginData,
                        componentContributeData: {
                          allComponentContributes: ImmutableHashMap$Meta3dCommonlib.set(componentContributeData.allComponentContributes, componentContribute.componentName, componentContribute),
                          allUsedComponentContributes: componentContributeData.allUsedComponentContributes
                        },
                        gameObjectContribute: state.gameObjectContribute,
                        usedGameObjectContribute: state.usedGameObjectContribute
                      };
              }));
}

function unregisterComponent(state, componentName) {
  var componentContributeData = state.componentContributeData;
  return {
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
          states: state.states,
          pluginData: state.pluginData,
          componentContributeData: {
            allComponentContributes: ImmutableHashMap$Meta3dCommonlib.deleteVal(componentContributeData.allComponentContributes, componentName),
            allUsedComponentContributes: componentContributeData.allUsedComponentContributes
          },
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

function unsafeGetUsedComponentContribute(param, componentName) {
  return MutableHashMap$Meta3dCommonlib.unsafeGet(param.componentContributeData.allUsedComponentContributes, componentName);
}

function setUsedComponentContribute(state, usedComponentContribute, componentName) {
  MutableHashMap$Meta3dCommonlib.set(state.componentContributeData.allUsedComponentContributes, componentName, usedComponentContribute);
  return state;
}

function createAndSetComponentState(state, componentName, config) {
  var match = ImmutableHashMap$Meta3dCommonlib.unsafeGet(state.componentContributeData.allComponentContributes, componentName);
  var init = state.componentContributeData;
  return {
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
          states: state.states,
          pluginData: state.pluginData,
          componentContributeData: {
            allComponentContributes: init.allComponentContributes,
            allUsedComponentContributes: ImmutableHashMap$Meta3dCommonlib.set(state.componentContributeData.allUsedComponentContributes, componentName, {
                  componentName: componentName,
                  state: match.createStateFunc(config),
                  createComponentFunc: match.createComponentFunc,
                  getGameObjectsFunc: match.getGameObjectsFunc,
                  addComponentFunc: match.addComponentFunc,
                  removeComponentFunc: match.removeComponentFunc,
                  hasComponentFunc: match.hasComponentFunc,
                  getComponentFunc: match.getComponentFunc,
                  getNeedDisposedComponentsFunc: match.getNeedDisposedComponentsFunc,
                  deferDisposeComponentFunc: match.deferDisposeComponentFunc,
                  disposeComponentsFunc: match.disposeComponentsFunc,
                  cloneComponentFunc: match.cloneComponentFunc,
                  getAllComponentsFunc: match.getAllComponentsFunc,
                  getComponentDataFunc: match.getComponentDataFunc,
                  setComponentDataFunc: match.setComponentDataFunc
                })
          },
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

function setComponentStateToUsedComponentContribute(componentState, usedComponentContribute) {
  usedComponentContribute.state = componentState;
  return usedComponentContribute;
}

function createComponent(usedComponentContribute) {
  var match = usedComponentContribute.createComponentFunc(usedComponentContribute.state);
  return [
          (usedComponentContribute.state = match[0], usedComponentContribute),
          match[1]
        ];
}

function setComponentData(usedComponentContribute, component, dataName, dataValue) {
  var componentState = usedComponentContribute.setComponentDataFunc(usedComponentContribute.state, component, dataName, dataValue);
  usedComponentContribute.state = componentState;
  return usedComponentContribute;
}

function addComponent(usedComponentContribute, gameObject, component) {
  var componentState = usedComponentContribute.addComponentFunc(usedComponentContribute.state, gameObject, component);
  usedComponentContribute.state = componentState;
  return usedComponentContribute;
}

function removeComponent(usedComponentContribute, gameObject, component) {
  var componentState = usedComponentContribute.removeComponentFunc(usedComponentContribute.state, gameObject, component);
  usedComponentContribute.state = componentState;
  return usedComponentContribute;
}

function hasComponent(usedComponentContribute, gameObject) {
  return usedComponentContribute.hasComponentFunc(usedComponentContribute.state, gameObject);
}

function getComponent(usedComponentContribute, gameObject) {
  return usedComponentContribute.getComponentFunc(usedComponentContribute.state, gameObject);
}

function getNeedDisposedComponents(usedComponentContribute) {
  return usedComponentContribute.getNeedDisposedComponentsFunc(usedComponentContribute.state);
}

function deferDisposeComponent(usedComponentContribute, deferDisposeData) {
  var componentState = usedComponentContribute.deferDisposeComponentFunc(usedComponentContribute.state, deferDisposeData);
  usedComponentContribute.state = componentState;
  return usedComponentContribute;
}

function disposeComponents(usedComponentContribute, batchDisposeData) {
  var componentState = usedComponentContribute.disposeComponentsFunc(usedComponentContribute.state, batchDisposeData);
  usedComponentContribute.state = componentState;
  return usedComponentContribute;
}

function getAllComponents(usedComponentContribute) {
  return usedComponentContribute.getAllComponentsFunc(usedComponentContribute.state);
}

function getComponentData(usedComponentContribute, component, dataName) {
  return usedComponentContribute.getComponentDataFunc(usedComponentContribute.state, component, dataName);
}

function getComponentGameObjects(usedComponentContribute, component) {
  return usedComponentContribute.getGameObjectsFunc(usedComponentContribute.state, component);
}

function getComponentState(state, componentName) {
  return OptionSt$Meta3dCommonlib.map(MutableHashMap$Meta3dCommonlib.get(state.componentContributeData.allUsedComponentContributes, componentName), (function (param) {
                return param.state;
              }));
}

exports.registerComponent = registerComponent;
exports.unregisterComponent = unregisterComponent;
exports.unsafeGetUsedComponentContribute = unsafeGetUsedComponentContribute;
exports.setUsedComponentContribute = setUsedComponentContribute;
exports.createAndSetComponentState = createAndSetComponentState;
exports.setComponentStateToUsedComponentContribute = setComponentStateToUsedComponentContribute;
exports.createComponent = createComponent;
exports.setComponentData = setComponentData;
exports.addComponent = addComponent;
exports.removeComponent = removeComponent;
exports.hasComponent = hasComponent;
exports.getComponent = getComponent;
exports.getNeedDisposedComponents = getNeedDisposedComponents;
exports.deferDisposeComponent = deferDisposeComponent;
exports.disposeComponents = disposeComponents;
exports.getAllComponents = getAllComponents;
exports.getComponentData = getComponentData;
exports.getComponentGameObjects = getComponentGameObjects;
exports.getComponentState = getComponentState;
/* No side effect */
