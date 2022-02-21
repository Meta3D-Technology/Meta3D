'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Result$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Result.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var WorkManager$Meta3dEngineCore = require("./work_manager/WorkManager.bs.js");
var StateContainer$Meta3dEngineCore = require("../state/StateContainer.bs.js");
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

function registerWorkPlugin(state, data, jobOrdersOpt, param) {
  var jobOrders = jobOrdersOpt !== undefined ? jobOrdersOpt : [];
  return WorkManager$Meta3dEngineCore.registerPlugin(state, data, _convertJobOrders(jobOrders));
}

var unregisterWorkPlugin = WorkManager$Meta3dEngineCore.unregisterPlugin;

function prepare(param) {
  
}

var init = WorkManager$Meta3dEngineCore.init;

function runPipeline(param, state, meta3dState, pipelineName) {
  var mostService = Curry._2(param[0].getServiceExn, meta3dState, param[1].meta3dBsMostExtensionName);
  return Result$Meta3dCommonlib.handleFail(WorkManager$Meta3dEngineCore.runPipeline(state, mostService, pipelineName), Exception$Meta3dCommonlib.throwErr);
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

var getComponentContribute = ComponentManager$Meta3dEngineCore.getComponentContribute;

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
exports.getComponentContribute = getComponentContribute;
exports.getComponentGameObjects = getComponentGameObjects;
exports.setGameObjectData = setGameObjectData;
exports.createAndSetGameObjectState = createAndSetGameObjectState;
exports.createGameObject = createGameObject;
exports.getAllGameObjects = getAllGameObjects;
exports.getState = getState;
/* No side effect */
