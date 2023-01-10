'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var Result$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Result.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var ComponentManager$Meta3dEngineCore = require("./scene_graph_manager/component/ComponentManager.bs.js");
var GameObjectManager$Meta3dEngineCore = require("./scene_graph_manager/GameObjectManager.bs.js");
var PluginDataManager$Meta3dEngineCore = require("./work_manager/plugin_data/PluginDataManager.bs.js");
var WorkPluginManager$Meta3dEngineCore = require("./work_manager/WorkPluginManager.bs.js");

function _convertJobOrders(jobOrders) {
  return ArraySt$Meta3dCommonlib.map(jobOrders, (function (jobOrder) {
                return {
                        pipelineName: jobOrder.pipelineName,
                        insertElementName: jobOrder.insertElementName,
                        insertAction: jobOrder.insertAction === "after" ? /* After */1 : /* Before */0
                      };
              }));
}

function registerWorkPlugin(state, contribute, configOpt, jobOrdersOpt, param) {
  var config = configOpt !== undefined ? Caml_option.valFromOption(configOpt) : null;
  var jobOrders = jobOrdersOpt !== undefined ? jobOrdersOpt : [];
  return WorkPluginManager$Meta3dEngineCore.registerPlugin(state, contribute, config, _convertJobOrders(jobOrders));
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
exports.removeComponent = removeComponent;
exports.hasComponent = hasComponent;
exports.getComponent = getComponent;
exports.getNeedDisposedComponents = getNeedDisposedComponents;
exports.deferDisposeComponent = deferDisposeComponent;
exports.disposeComponents = disposeComponents;
exports.getAllComponents = getAllComponents;
exports.getComponentData = getComponentData;
exports.getComponentGameObjects = getComponentGameObjects;
exports.setGameObjectContribute = setGameObjectContribute;
exports.createAndSetGameObjectState = createAndSetGameObjectState;
exports.createGameObject = createGameObject;
exports.getNeedDisposedGameObjects = getNeedDisposedGameObjects;
exports.deferDisposeGameObject = deferDisposeGameObject;
exports.disposeGameObjects = disposeGameObjects;
exports.cloneGameObject = cloneGameObject;
exports.getAllGameObjects = getAllGameObjects;
exports.getComponentState = getComponentState;
/* No side effect */
