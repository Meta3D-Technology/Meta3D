

import * as Caml_option from "./../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Result$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as PipelineManager$Meta3dEngineCore from "./pipeline_manager/PipelineManager.bs.js";
import * as ComponentManager$Meta3dEngineCore from "./scene_graph_manager/component/ComponentManager.bs.js";
import * as GameObjectManager$Meta3dEngineCore from "./scene_graph_manager/GameObjectManager.bs.js";
import * as ContributeDataManager$Meta3dEngineCore from "./ContributeDataManager.bs.js";

function _convertJobOrders(jobOrders) {
  return ArraySt$Meta3dCommonlib.map(jobOrders, (function (jobOrder) {
                return {
                        pipelineName: jobOrder.pipelineName,
                        insertElementName: jobOrder.insertElementName,
                        insertAction: jobOrder.insertAction === "after" ? /* After */1 : /* Before */0
                      };
              }));
}

function registerPipeline(state, contribute, configOpt, jobOrdersOpt, param) {
  var config = configOpt !== undefined ? Caml_option.valFromOption(configOpt) : null;
  var jobOrders = jobOrdersOpt !== undefined ? jobOrdersOpt : [];
  return PipelineManager$Meta3dEngineCore.registerPipeline(state, contribute, config, _convertJobOrders(jobOrders));
}

function prepare(param) {
  
}

var init = PipelineManager$Meta3dEngineCore.init;

function runPipeline(api, param, meta3dState, meta3dEngineCoreExtensionProtocolName, pipelineName) {
  var mostService = api.getExtensionService(meta3dState, "meta3d-bs-most-protocol");
  return Result$Meta3dCommonlib.handleFail(PipelineManager$Meta3dEngineCore.runPipeline(meta3dState, [
                  api,
                  mostService,
                  param[0],
                  param[1],
                  meta3dEngineCoreExtensionProtocolName
                ], pipelineName), Exception$Meta3dCommonlib.throwErr);
}

function registerComponent(state, componentContribute) {
  return Result$Meta3dCommonlib.handleFail(ComponentManager$Meta3dEngineCore.registerComponent(state, componentContribute), Exception$Meta3dCommonlib.throwErr);
}

function getComponentState(state, componentName) {
  return OptionSt$Meta3dCommonlib.toNullable(ComponentManager$Meta3dEngineCore.getComponentState(state, componentName));
}

var unregisterPipeline = PipelineManager$Meta3dEngineCore.unregisterPipeline;

var getIsDebug = ContributeDataManager$Meta3dEngineCore.getIsDebug;

var setIsDebug = ContributeDataManager$Meta3dEngineCore.setIsDebug;

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

var getNeedDisposedComponents = ComponentManager$Meta3dEngineCore.getNeedDisposedComponents;

var deferDisposeComponent = ComponentManager$Meta3dEngineCore.deferDisposeComponent;

var disposeComponents = ComponentManager$Meta3dEngineCore.disposeComponents;

var getAllComponents = ComponentManager$Meta3dEngineCore.getAllComponents;

var getComponentData = ComponentManager$Meta3dEngineCore.getComponentData;

var getComponentGameObjects = ComponentManager$Meta3dEngineCore.getComponentGameObjects;

var setGameObjectContribute = GameObjectManager$Meta3dEngineCore.setGameObjectContribute;

var createAndSetGameObjectState = GameObjectManager$Meta3dEngineCore.createAndSetState;

var createGameObject = GameObjectManager$Meta3dEngineCore.createGameObject;

var getNeedDisposedGameObjects = GameObjectManager$Meta3dEngineCore.getNeedDisposedGameObjects;

var deferDisposeGameObject = GameObjectManager$Meta3dEngineCore.deferDisposeGameObject;

var disposeGameObjects = GameObjectManager$Meta3dEngineCore.disposeGameObjects;

var cloneGameObject = GameObjectManager$Meta3dEngineCore.cloneGameObject;

var getAllGameObjects = GameObjectManager$Meta3dEngineCore.getAllGameObjects;

export {
  _convertJobOrders ,
  registerPipeline ,
  unregisterPipeline ,
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
  getNeedDisposedComponents ,
  deferDisposeComponent ,
  disposeComponents ,
  getAllComponents ,
  getComponentData ,
  getComponentGameObjects ,
  setGameObjectContribute ,
  createAndSetGameObjectState ,
  createGameObject ,
  getNeedDisposedGameObjects ,
  deferDisposeGameObject ,
  disposeGameObjects ,
  cloneGameObject ,
  getAllGameObjects ,
  getComponentState ,
}
/* No side effect */
