

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Result$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as CreatePO$Meta3dEngineCore from "../data/CreatePO.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as POContainer$Meta3dEngineCore from "../data/POContainer.bs.js";
import * as WorkManager$Meta3dEngineCore from "./work_manager/WorkManager.bs.js";
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
  return POContainer$Meta3dEngineCore.setPO(WorkManager$Meta3dEngineCore.registerPlugin(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), data, _convertJobOrders(jobOrders)));
}

function unregisterWorkPlugin(targetPluginName) {
  return POContainer$Meta3dEngineCore.setPO(WorkManager$Meta3dEngineCore.unregisterPlugin(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), targetPluginName));
}

function prepare(param) {
  return POContainer$Meta3dEngineCore.setPO(CreatePO$Meta3dEngineCore.createPO(undefined));
}

function init(param) {
  return POContainer$Meta3dEngineCore.setPO(WorkManager$Meta3dEngineCore.init(POContainer$Meta3dEngineCore.unsafeGetPO(undefined)));
}

function runPipeline(mostService, pipelineName) {
  return Result$Meta3dCommonlib.handleFail(Result$Meta3dCommonlib.mapSuccess(WorkManager$Meta3dEngineCore.runPipeline(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), mostService, pipelineName), (function (__x) {
                    return Curry._2(mostService.map, POContainer$Meta3dEngineCore.setPO, __x);
                  })), Exception$Meta3dCommonlib.throwErr);
}

function getIsDebug(param) {
  return PluginDataManager$Meta3dEngineCore.getIsDebug(undefined);
}

var setIsDebug = PluginDataManager$Meta3dEngineCore.setIsDebug;

function registerComponent(data) {
  return Result$Meta3dCommonlib.handleFail(Result$Meta3dCommonlib.mapSuccess(ComponentManager$Meta3dEngineCore.registerComponent(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), data), POContainer$Meta3dEngineCore.setPO), Exception$Meta3dCommonlib.throwErr);
}

function unregisterComponent(componentName) {
  return POContainer$Meta3dEngineCore.setPO(ComponentManager$Meta3dEngineCore.unregisterComponent(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), componentName));
}

function createAndSetComponentState(componentName, config) {
  return POContainer$Meta3dEngineCore.setPO(ComponentManager$Meta3dEngineCore.createAndSetComponentState(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), componentName, config));
}

function unsafeGetRelatedComponentData(componentName) {
  return ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentData(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), componentName);
}

function setRelatedComponentData(data, componentName) {
  return POContainer$Meta3dEngineCore.setPO(ComponentManager$Meta3dEngineCore.setRelatedComponentData(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), data, componentName));
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
  return POContainer$Meta3dEngineCore.setPO(GameObjectManager$Meta3dEngineCore.setGameObjectData(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), data));
}

function createAndSetGameObjectState(param) {
  return POContainer$Meta3dEngineCore.setPO(GameObjectManager$Meta3dEngineCore.createAndSetState(POContainer$Meta3dEngineCore.unsafeGetPO(undefined)));
}

function createGameObject(param) {
  var match = GameObjectManager$Meta3dEngineCore.createGameObject(POContainer$Meta3dEngineCore.unsafeGetPO(undefined));
  POContainer$Meta3dEngineCore.setPO(match[0]);
  return match[1];
}

function getAllGameObjects(param) {
  return GameObjectManager$Meta3dEngineCore.getAllGameObjects(POContainer$Meta3dEngineCore.unsafeGetPO(undefined));
}

function getState(componentName) {
  return OptionSt$Meta3dCommonlib.toNullable(ComponentManager$Meta3dEngineCore.getState(POContainer$Meta3dEngineCore.unsafeGetPO(undefined), componentName));
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
