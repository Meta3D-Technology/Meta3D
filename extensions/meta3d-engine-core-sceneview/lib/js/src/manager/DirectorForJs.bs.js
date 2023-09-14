'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var Result$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Result.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var MutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var PipelineManager$Meta3dEngineCoreSceneview = require("./pipeline_manager/PipelineManager.bs.js");
var ComponentManager$Meta3dEngineCoreSceneview = require("./scene_graph_manager/component/ComponentManager.bs.js");
var GameObjectManager$Meta3dEngineCoreSceneview = require("./scene_graph_manager/GameObjectManager.bs.js");
var ContributeDataManager$Meta3dEngineCoreSceneview = require("./ContributeDataManager.bs.js");
var PipelineRedoUndoManager$Meta3dEngineCoreSceneview = require("./pipeline_manager/PipelineRedoUndoManager.bs.js");
var SceneGraphRedoUndoManager$Meta3dEngineCoreSceneview = require("./scene_graph_manager/SceneGraphRedoUndoManager.bs.js");

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
  return PipelineManager$Meta3dEngineCoreSceneview.registerPipeline(state, contribute, config, _convertJobOrders(jobOrders));
}

function prepare(param) {
  
}

var init = PipelineManager$Meta3dEngineCoreSceneview.init;

function runPipeline(api, param, meta3dState, meta3dEngineCoreExtensionProtocolName, pipelineName) {
  var mostService = api.getExtensionService(meta3dState, "meta3d-bs-most-protocol");
  return Result$Meta3dCommonlib.handleFail(PipelineManager$Meta3dEngineCoreSceneview.runPipeline(meta3dState, [
                  api,
                  mostService,
                  param[0],
                  param[1],
                  meta3dEngineCoreExtensionProtocolName
                ], pipelineName), Exception$Meta3dCommonlib.throwErr);
}

function registerComponent(state, componentContribute) {
  return Result$Meta3dCommonlib.handleFail(ComponentManager$Meta3dEngineCoreSceneview.registerComponent(state, componentContribute), Exception$Meta3dCommonlib.throwErr);
}

function getComponentState(state, componentName) {
  return OptionSt$Meta3dCommonlib.toNullable(ComponentManager$Meta3dEngineCoreSceneview.getComponentState(state, componentName));
}

function restore(api, extensionProtocolName, currentMeta3dState, targetMeta3dState) {
  var currentState = api.getExtensionState(currentMeta3dState, extensionProtocolName);
  return api.setExtensionState(targetMeta3dState, extensionProtocolName, SceneGraphRedoUndoManager$Meta3dEngineCoreSceneview.restore(currentState, PipelineRedoUndoManager$Meta3dEngineCoreSceneview.restore(currentState, api.getExtensionState(targetMeta3dState, extensionProtocolName))));
}

function deepCopy(api, extensionProtocolName, meta3dState) {
  var state = api.getExtensionState(meta3dState, extensionProtocolName);
  var init = state.componentContributeData;
  var state$1 = {
    allRegisteredPipelineContribute: state.allRegisteredPipelineContribute,
    states: state.states,
    contributeData: state.contributeData,
    componentContributeData: {
      allComponentContributes: init.allComponentContributes,
      allUsedComponentContributes: MutableHashMap$Meta3dCommonlib.copy(state.componentContributeData.allUsedComponentContributes)
    },
    gameObjectContribute: state.gameObjectContribute,
    usedGameObjectContribute: state.usedGameObjectContribute
  };
  return api.setExtensionState(meta3dState, extensionProtocolName, SceneGraphRedoUndoManager$Meta3dEngineCoreSceneview.deepCopy(PipelineRedoUndoManager$Meta3dEngineCoreSceneview.deepCopy(state$1)));
}

var unregisterPipeline = PipelineManager$Meta3dEngineCoreSceneview.unregisterPipeline;

var getIsDebug = ContributeDataManager$Meta3dEngineCoreSceneview.getIsDebug;

var setIsDebug = ContributeDataManager$Meta3dEngineCoreSceneview.setIsDebug;

var unregisterComponent = ComponentManager$Meta3dEngineCoreSceneview.unregisterComponent;

var createAndSetComponentState = ComponentManager$Meta3dEngineCoreSceneview.createAndSetComponentState;

var unsafeGetUsedComponentContribute = ComponentManager$Meta3dEngineCoreSceneview.unsafeGetUsedComponentContribute;

var setUsedComponentContribute = ComponentManager$Meta3dEngineCoreSceneview.setUsedComponentContribute;

var createComponent = ComponentManager$Meta3dEngineCoreSceneview.createComponent;

var setComponentData = ComponentManager$Meta3dEngineCoreSceneview.setComponentData;

var addComponent = ComponentManager$Meta3dEngineCoreSceneview.addComponent;

var removeComponent = ComponentManager$Meta3dEngineCoreSceneview.removeComponent;

var hasComponent = ComponentManager$Meta3dEngineCoreSceneview.hasComponent;

var getComponent = ComponentManager$Meta3dEngineCoreSceneview.getComponent;

var getNeedDisposedComponents = ComponentManager$Meta3dEngineCoreSceneview.getNeedDisposedComponents;

var deferDisposeComponent = ComponentManager$Meta3dEngineCoreSceneview.deferDisposeComponent;

var disposeComponents = ComponentManager$Meta3dEngineCoreSceneview.disposeComponents;

var getAllComponents = ComponentManager$Meta3dEngineCoreSceneview.getAllComponents;

var getComponentData = ComponentManager$Meta3dEngineCoreSceneview.getComponentData;

var getComponentGameObjects = ComponentManager$Meta3dEngineCoreSceneview.getComponentGameObjects;

var setGameObjectContribute = GameObjectManager$Meta3dEngineCoreSceneview.setGameObjectContribute;

var createAndSetGameObjectState = GameObjectManager$Meta3dEngineCoreSceneview.createAndSetState;

var createGameObject = GameObjectManager$Meta3dEngineCoreSceneview.createGameObject;

var getNeedDisposedGameObjects = GameObjectManager$Meta3dEngineCoreSceneview.getNeedDisposedGameObjects;

var deferDisposeGameObject = GameObjectManager$Meta3dEngineCoreSceneview.deferDisposeGameObject;

var disposeGameObjects = GameObjectManager$Meta3dEngineCoreSceneview.disposeGameObjects;

var cloneGameObject = GameObjectManager$Meta3dEngineCoreSceneview.cloneGameObject;

var getAllGameObjects = GameObjectManager$Meta3dEngineCoreSceneview.getAllGameObjects;

exports._convertJobOrders = _convertJobOrders;
exports.registerPipeline = registerPipeline;
exports.unregisterPipeline = unregisterPipeline;
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
exports.restore = restore;
exports.deepCopy = deepCopy;
/* No side effect */
