

import * as Result$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as ComponentManager$Meta3dEngineCore from "./scene_graph_manager/component/ComponentManager.bs.js";
import * as GameObjectManager$Meta3dEngineCore from "./scene_graph_manager/GameObjectManager.bs.js";
import * as PluginDataManager$Meta3dEngineCore from "./work_manager/plugin_data/PluginDataManager.bs.js";
import * as WorkPluginManager$Meta3dEngineCore from "./work_manager/WorkPluginManager.bs.js";

function _convertJobOrders(jobOrders) {
  return ArraySt$Meta3dCommonlib.map(jobOrders, (function (jobOrder) {
                return {
                        pipelineName: jobOrder.pipelineName,
                        insertElementName: jobOrder.insertElementName,
                        insertAction: jobOrder.insertAction === "after" ? /* After */1 : /* Before */0
                      };
              }));
}

function registerWorkPlugin(state, contribute, jobOrdersOpt, param) {
  var jobOrders = jobOrdersOpt !== undefined ? jobOrdersOpt : [];
  return WorkPluginManager$Meta3dEngineCore.registerPlugin(state, contribute, _convertJobOrders(jobOrders));
}

function prepare(param) {
  
}

var init = WorkPluginManager$Meta3dEngineCore.init;

function runPipeline(param, state, meta3dState, pipelineName) {
  var mostService = param[0].getExtensionService(meta3dState, param[1].meta3dBsMostExtensionName);
  return Result$Meta3dCommonlib.handleFail(WorkPluginManager$Meta3dEngineCore.runPipeline(state, mostService, pipelineName), Exception$Meta3dCommonlib.throwErr);
}

function registerComponent(state, componentContribute) {
  return Result$Meta3dCommonlib.handleFail(ComponentManager$Meta3dEngineCore.registerComponent(state, componentContribute), Exception$Meta3dCommonlib.throwErr);
}

function getComponentState(state, componentName) {
  return OptionSt$Meta3dCommonlib.toNullable(ComponentManager$Meta3dEngineCore.getComponentState(state, componentName));
}

var unregisterWorkPlugin = WorkPluginManager$Meta3dEngineCore.unregisterPlugin;

var getIsDebug = PluginDataManager$Meta3dEngineCore.getIsDebug;

var setIsDebug = PluginDataManager$Meta3dEngineCore.setIsDebug;

var unregisterComponent = ComponentManager$Meta3dEngineCore.unregisterComponent;

var createAndSetComponentState = ComponentManager$Meta3dEngineCore.createAndSetComponentState;

var unsafeGetUsedComponentContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute;

var setUsedComponentContribute = ComponentManager$Meta3dEngineCore.setUsedComponentContribute;

var createComponent = ComponentManager$Meta3dEngineCore.createComponent;

var setComponentData = ComponentManager$Meta3dEngineCore.setComponentData;

var addComponent = ComponentManager$Meta3dEngineCore.addComponent;

var removeComponent = ComponentManager$Meta3dEngineCore.removeComponent;

var hasComponent = ComponentManager$Meta3dEngineCore.hasComponent;

var getComponent = ComponentManager$Meta3dEngineCore.getComponent;

var deferDisposeComponent = ComponentManager$Meta3dEngineCore.deferDisposeComponent;

var disposeComponents = ComponentManager$Meta3dEngineCore.disposeComponents;

var getAllComponents = ComponentManager$Meta3dEngineCore.getAllComponents;

var getComponentData = ComponentManager$Meta3dEngineCore.getComponentData;

var getComponentGameObjects = ComponentManager$Meta3dEngineCore.getComponentGameObjects;

var setGameObjectContribute = GameObjectManager$Meta3dEngineCore.setGameObjectContribute;

var createAndSetGameObjectState = GameObjectManager$Meta3dEngineCore.createAndSetState;

var createGameObject = GameObjectManager$Meta3dEngineCore.createGameObject;

var deferDisposeGameObject = GameObjectManager$Meta3dEngineCore.deferDisposeGameObject;

var disposeGameObjects = GameObjectManager$Meta3dEngineCore.disposeGameObjects;

var getAllGameObjects = GameObjectManager$Meta3dEngineCore.getAllGameObjects;

export {
  _convertJobOrders ,
  registerWorkPlugin ,
  unregisterWorkPlugin ,
  prepare ,
  init ,
  runPipeline ,
  getIsDebug ,
  setIsDebug ,
  registerComponent ,
  unregisterComponent ,
  createAndSetComponentState ,
  unsafeGetUsedComponentContribute ,
  setUsedComponentContribute ,
  createComponent ,
  setComponentData ,
  addComponent ,
  removeComponent ,
  hasComponent ,
  getComponent ,
  deferDisposeComponent ,
  disposeComponents ,
  getAllComponents ,
  getComponentData ,
  getComponentGameObjects ,
  setGameObjectContribute ,
  createAndSetGameObjectState ,
  createGameObject ,
  deferDisposeGameObject ,
  disposeGameObjects ,
  getAllGameObjects ,
  getComponentState ,
  
}
/* No side effect */
