'use strict';

var Result$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Result.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
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

function registerWorkPlugin(state, contribute, jobOrdersOpt, param) {
  var jobOrders = jobOrdersOpt !== undefined ? jobOrdersOpt : [];
  return WorkManager$Meta3dEngineCore.registerPlugin(state, contribute, _convertJobOrders(jobOrders));
}

var unregisterWorkPlugin = WorkManager$Meta3dEngineCore.unregisterPlugin;

function prepare(param) {
  
}

var init = WorkManager$Meta3dEngineCore.init;

function runPipeline(param, state, meta3dState, pipelineName) {
  var mostService = param[0].getServiceExn(meta3dState, param[1].meta3dBsMostExtensionName);
  return Result$Meta3dCommonlib.handleFail(WorkManager$Meta3dEngineCore.runPipeline(state, mostService, pipelineName), Exception$Meta3dCommonlib.throwErr);
}

function getIsDebug(param) {
  return PluginDataManager$Meta3dEngineCore.getIsDebug(undefined);
}

var setIsDebug = PluginDataManager$Meta3dEngineCore.setIsDebug;

function registerComponent(state, componentContribute) {
  return Result$Meta3dCommonlib.handleFail(ComponentManager$Meta3dEngineCore.registerComponent(state, componentContribute), Exception$Meta3dCommonlib.throwErr);
}

var unregisterComponent = ComponentManager$Meta3dEngineCore.unregisterComponent;

var createAndSetComponentState = ComponentManager$Meta3dEngineCore.createAndSetComponentState;

var unsafeGetUsedComponentContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute;

var setUsedComponentContribute = ComponentManager$Meta3dEngineCore.setUsedComponentContribute;

var createComponent = ComponentManager$Meta3dEngineCore.createComponent;

var setComponentData = ComponentManager$Meta3dEngineCore.setComponentData;

var addComponent = ComponentManager$Meta3dEngineCore.addComponent;

var hasComponent = ComponentManager$Meta3dEngineCore.hasComponent;

var getComponent = ComponentManager$Meta3dEngineCore.getComponent;

var getAllComponents = ComponentManager$Meta3dEngineCore.getAllComponents;

var getComponentData = ComponentManager$Meta3dEngineCore.getComponentData;

var getComponentGameObjects = ComponentManager$Meta3dEngineCore.getComponentGameObjects;

var setGameObjectContribute = GameObjectManager$Meta3dEngineCore.setGameObjectContribute;

var createAndSetGameObjectState = GameObjectManager$Meta3dEngineCore.createAndSetState;

function createGameObject(state) {
  var match = GameObjectManager$Meta3dEngineCore.createGameObject(state);
  return [
          match[0],
          match[1]
        ];
}

var getAllGameObjects = GameObjectManager$Meta3dEngineCore.getAllGameObjects;

function getComponentState(state, componentName) {
  return OptionSt$Meta3dCommonlib.toNullable(ComponentManager$Meta3dEngineCore.getComponentState(state, componentName));
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
exports.unsafeGetUsedComponentContribute = unsafeGetUsedComponentContribute;
exports.setUsedComponentContribute = setUsedComponentContribute;
exports.createComponent = createComponent;
exports.setComponentData = setComponentData;
exports.addComponent = addComponent;
exports.hasComponent = hasComponent;
exports.getComponent = getComponent;
exports.getAllComponents = getAllComponents;
exports.getComponentData = getComponentData;
exports.getComponentGameObjects = getComponentGameObjects;
exports.setGameObjectContribute = setGameObjectContribute;
exports.createAndSetGameObjectState = createAndSetGameObjectState;
exports.createGameObject = createGameObject;
exports.getAllGameObjects = getAllGameObjects;
exports.getComponentState = getComponentState;
/* No side effect */
