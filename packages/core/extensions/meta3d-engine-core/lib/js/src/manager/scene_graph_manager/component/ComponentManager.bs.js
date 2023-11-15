'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Result$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Result.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ContractResult$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/ContractResult.bs.js");
var MutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");
var ContributeDataManager$Meta3dEngineCore = require("../../ContributeDataManager.bs.js");

function registerComponent(state, componentContribute) {
  var componentContributeData = state.componentContributeData;
  return Result$Meta3dCommonlib.mapSuccess(ContractResult$Meta3dCommonlib.requireCheck((function (param) {
                    ContractResult$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("not register before", "not"), (function (param) {
                            return ContractResult$Meta3dCommonlib.assertFalse(ImmutableHashMap$Meta3dCommonlib.has(componentContributeData.allComponentContributes, componentContribute.componentName));
                          }));
                  }), ContributeDataManager$Meta3dEngineCore.getIsDebug(state)), (function (param) {
                return {
                        allRegisteredPipelineContribute: state.allRegisteredPipelineContribute,
                        states: state.states,
                        contributeData: state.contributeData,
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
          allRegisteredPipelineContribute: state.allRegisteredPipelineContribute,
          states: state.states,
          contributeData: state.contributeData,
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
          allRegisteredPipelineContribute: state.allRegisteredPipelineContribute,
          states: state.states,
          contributeData: state.contributeData,
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
                  setComponentDataFunc: match.setComponentDataFunc,
                  restore: match.restore,
                  deepCopy: match.deepCopy
                })
          },
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

function setComponentStateToUsedComponentContribute(componentState, usedComponentContribute) {
  return {
          componentName: usedComponentContribute.componentName,
          state: componentState,
          createComponentFunc: usedComponentContribute.createComponentFunc,
          getGameObjectsFunc: usedComponentContribute.getGameObjectsFunc,
          addComponentFunc: usedComponentContribute.addComponentFunc,
          removeComponentFunc: usedComponentContribute.removeComponentFunc,
          hasComponentFunc: usedComponentContribute.hasComponentFunc,
          getComponentFunc: usedComponentContribute.getComponentFunc,
          getNeedDisposedComponentsFunc: usedComponentContribute.getNeedDisposedComponentsFunc,
          deferDisposeComponentFunc: usedComponentContribute.deferDisposeComponentFunc,
          disposeComponentsFunc: usedComponentContribute.disposeComponentsFunc,
          cloneComponentFunc: usedComponentContribute.cloneComponentFunc,
          getAllComponentsFunc: usedComponentContribute.getAllComponentsFunc,
          getComponentDataFunc: usedComponentContribute.getComponentDataFunc,
          setComponentDataFunc: usedComponentContribute.setComponentDataFunc,
          restore: usedComponentContribute.restore,
          deepCopy: usedComponentContribute.deepCopy
        };
}

function createComponent(usedComponentContribute) {
  var match = usedComponentContribute.createComponentFunc(usedComponentContribute.state);
  return [
          setComponentStateToUsedComponentContribute(match[0], usedComponentContribute),
          match[1]
        ];
}

function setComponentData(usedComponentContribute, component, dataName, dataValue) {
  return setComponentStateToUsedComponentContribute(usedComponentContribute.setComponentDataFunc(usedComponentContribute.state, component, dataName, dataValue), usedComponentContribute);
}

function addComponent(usedComponentContribute, gameObject, component) {
  return setComponentStateToUsedComponentContribute(usedComponentContribute.addComponentFunc(usedComponentContribute.state, gameObject, component), usedComponentContribute);
}

function removeComponent(usedComponentContribute, gameObject, component) {
  return setComponentStateToUsedComponentContribute(usedComponentContribute.removeComponentFunc(usedComponentContribute.state, gameObject, component), usedComponentContribute);
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
  return setComponentStateToUsedComponentContribute(usedComponentContribute.deferDisposeComponentFunc(usedComponentContribute.state, deferDisposeData), usedComponentContribute);
}

function disposeComponents(usedComponentContribute, batchDisposeData) {
  var match = usedComponentContribute.disposeComponentsFunc(usedComponentContribute.state, batchDisposeData);
  return [
          setComponentStateToUsedComponentContribute(match[0], usedComponentContribute),
          match[1]
        ];
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

function restore(currentUsedComponentContribute, targetUsedComponentContribute) {
  return setComponentStateToUsedComponentContribute(currentUsedComponentContribute.restore(currentUsedComponentContribute.state, targetUsedComponentContribute.state), targetUsedComponentContribute);
}

function deepCopy(usedComponentContribute) {
  return setComponentStateToUsedComponentContribute(usedComponentContribute.deepCopy(usedComponentContribute.state), usedComponentContribute);
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
exports.restore = restore;
exports.deepCopy = deepCopy;
/* No side effect */
