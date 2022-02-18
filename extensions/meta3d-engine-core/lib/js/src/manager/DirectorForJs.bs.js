'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Result$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Result.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var CreatePO$Meta3dEngineCore = require("../data/CreatePO.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var POContainer$Meta3dEngineCore = require("../data/POContainer.bs.js");
var WorkManager$Meta3dEngineCore = require("./work_manager/WorkManager.bs.js");
var ComponentManager$Meta3dEngineCore = require("./scene_graph_manager/component/ComponentManager.bs.js");
var GameObjectManager$Meta3dEngineCore = require("./scene_graph_manager/GameObjectManager.bs.js");
var PluginDataManager$Meta3dEngineCore = require("./work_manager/plugin_data/PluginDataManager.bs.js");

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

exports._convertJobOrders = _convertJobOrders;
exports.registerWorkPlugin = registerWorkPlugin;
exports.unregisterWorkPlugin = unregisterWorkPlugin;
exports.prepare = prepare;
exports.init = init;
exports.runPipeline = runPipeline;
exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
exports.registerComponent = registerComponent;
exports.unregisterComponent = unregisterComponent;
exports.createAndSetComponentState = createAndSetComponentState;
exports.unsafeGetRelatedComponentData = unsafeGetRelatedComponentData;
exports.setRelatedComponentData = setRelatedComponentData;
exports.createComponent = createComponent;
exports.setComponentData = setComponentData;
exports.addComponent = addComponent;
exports.hasComponent = hasComponent;
exports.getComponent = getComponent;
exports.getAllComponents = getAllComponents;
exports.getComponentData = getComponentData;
exports.getComponentGameObjects = getComponentGameObjects;
exports.setGameObjectData = setGameObjectData;
exports.createAndSetGameObjectState = createAndSetGameObjectState;
exports.createGameObject = createGameObject;
exports.getAllGameObjects = getAllGameObjects;
exports.getState = getState;
/* No side effect */
