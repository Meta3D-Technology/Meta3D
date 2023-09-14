

import * as Log$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Result$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ContractResult$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/ContractResult.bs.js";
import * as MutableHashMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";
import * as ContributeDataManager$Meta3dEngineCore from "../../ContributeDataManager.bs.js";

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
  return setComponentStateToUsedComponentContribute(usedComponentContribute.disposeComponentsFunc(usedComponentContribute.state, batchDisposeData), usedComponentContribute);
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

export {
  registerComponent ,
  unregisterComponent ,
  unsafeGetUsedComponentContribute ,
  setUsedComponentContribute ,
  createAndSetComponentState ,
  setComponentStateToUsedComponentContribute ,
  createComponent ,
  setComponentData ,
  addComponent ,
  removeComponent ,
  hasComponent ,
  getComponent ,
  getNeedDisposedComponents ,
  deferDisposeComponent ,
  disposeComponents ,
  getAllComponents ,
  getComponentData ,
  getComponentGameObjects ,
  getComponentState ,
  restore ,
  deepCopy ,
}
/* No side effect */
