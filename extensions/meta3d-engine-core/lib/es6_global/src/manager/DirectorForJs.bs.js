

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Result$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as CreateState$Meta3dEngineCore from "../data/CreateState.bs.js";
import * as WorkManager$Meta3dEngineCore from "./work_manager/WorkManager.bs.js";
import * as StateContainer$Meta3dEngineCore from "../data/StateContainer.bs.js";
import * as ComponentManager$Meta3dEngineCore from "./scene_graph_manager/component/ComponentManager.bs.js";
import * as GameObjectManager$Meta3dEngineCore from "./scene_graph_manager/GameObjectManager.bs.js";
import * as PluginDataManager$Meta3dEngineCore from "./work_manager/plugin_data/PluginDataManager.bs.js";

function _convertJobOrders(jobOrders) {
  return ArraySt$Meta3dCommonlib.map(jobOrders, (function (jobOrder) {
                return {
                        pipelineName: jobOrder.pipelineName,
                        insertElementName: jobOrder.insertElementName,
                        insertAction: jobOrder.insertAction === "after" ? /* After */1 : /* Before */0
                      };
              }));
}

function registerWorkPlugin(data, jobOrdersOpt, param) {
  var jobOrders = jobOrdersOpt !== undefined ? jobOrdersOpt : [];
  return StateContainer$Meta3dEngineCore.setState(WorkManager$Meta3dEngineCore.registerPlugin(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), data, _convertJobOrders(jobOrders)));
}

function unregisterWorkPlugin(targetPluginName) {
  return StateContainer$Meta3dEngineCore.setState(WorkManager$Meta3dEngineCore.unregisterPlugin(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), targetPluginName));
}

function prepare(param) {
  return StateContainer$Meta3dEngineCore.setState(CreateState$Meta3dEngineCore.createState(undefined));
}

function init(param) {
  return StateContainer$Meta3dEngineCore.setState(WorkManager$Meta3dEngineCore.init(StateContainer$Meta3dEngineCore.unsafeGetState(undefined)));
}

function runPipeline(mostService, pipelineName) {
  return Result$Meta3dCommonlib.handleFail(Result$Meta3dCommonlib.mapSuccess(WorkManager$Meta3dEngineCore.runPipeline(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), mostService, pipelineName), (function (__x) {
                    return Curry._2(mostService.map, StateContainer$Meta3dEngineCore.setState, __x);
                  })), Exception$Meta3dCommonlib.throwErr);
}

function getIsDebug(param) {
  return PluginDataManager$Meta3dEngineCore.getIsDebug(undefined);
}

var setIsDebug = PluginDataManager$Meta3dEngineCore.setIsDebug;

function registerComponent(data) {
  return Result$Meta3dCommonlib.handleFail(Result$Meta3dCommonlib.mapSuccess(ComponentManager$Meta3dEngineCore.registerComponent(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), data), StateContainer$Meta3dEngineCore.setState), Exception$Meta3dCommonlib.throwErr);
}

function unregisterComponent(componentName) {
  return StateContainer$Meta3dEngineCore.setState(ComponentManager$Meta3dEngineCore.unregisterComponent(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), componentName));
}

function createAndSetComponentState(componentName, config) {
  return StateContainer$Meta3dEngineCore.setState(ComponentManager$Meta3dEngineCore.createAndSetComponentState(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), componentName, config));
}

function unsafeGetRelatedComponentData(componentName) {
  return ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentData(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), componentName);
}

function setRelatedComponentData(data, componentName) {
  return StateContainer$Meta3dEngineCore.setState(ComponentManager$Meta3dEngineCore.setRelatedComponentData(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), data, componentName));
}

var createComponent = ComponentManager$Meta3dEngineCore.createComponent;

var setComponentData = ComponentManager$Meta3dEngineCore.setComponentData;

var addComponent = ComponentManager$Meta3dEngineCore.addComponent;

var hasComponent = ComponentManager$Meta3dEngineCore.hasComponent;

var getComponent = ComponentManager$Meta3dEngineCore.getComponent;

var getAllComponents = ComponentManager$Meta3dEngineCore.getAllComponents;

var getComponentData = ComponentManager$Meta3dEngineCore.getComponentData;

var getComponentGameObjects = ComponentManager$Meta3dEngineCore.getComponentGameObjects;

function setGameObjectData(data) {
  return StateContainer$Meta3dEngineCore.setState(GameObjectManager$Meta3dEngineCore.setGameObjectData(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), data));
}

function createAndSetGameObjectState(param) {
  return StateContainer$Meta3dEngineCore.setState(GameObjectManager$Meta3dEngineCore.createAndSetState(StateContainer$Meta3dEngineCore.unsafeGetState(undefined)));
}

function createGameObject(param) {
  var match = GameObjectManager$Meta3dEngineCore.createGameObject(StateContainer$Meta3dEngineCore.unsafeGetState(undefined));
  StateContainer$Meta3dEngineCore.setState(match[0]);
  return match[1];
}

function getAllGameObjects(param) {
  return GameObjectManager$Meta3dEngineCore.getAllGameObjects(StateContainer$Meta3dEngineCore.unsafeGetState(undefined));
}

function getState(componentName) {
  return OptionSt$Meta3dCommonlib.toNullable(ComponentManager$Meta3dEngineCore.getState(StateContainer$Meta3dEngineCore.unsafeGetState(undefined), componentName));
}

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
  unsafeGetRelatedComponentData ,
  setRelatedComponentData ,
  createComponent ,
  setComponentData ,
  addComponent ,
  hasComponent ,
  getComponent ,
  getAllComponents ,
  getComponentData ,
  getComponentGameObjects ,
  setGameObjectData ,
  createAndSetGameObjectState ,
  createGameObject ,
  getAllGameObjects ,
  getState ,
  
}
/* No side effect */
