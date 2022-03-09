'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ComponentManager$Meta3dEngineCore = require("./component/ComponentManager.bs.js");
var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");

function unsafeGetGameObjectData(state) {
  return OptionSt$Meta3dCommonlib.unsafeGet(state.gameObjectContribute);
}

function setGameObjectContribute(state, gameObjectContribute) {
  return {
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
          states: state.states,
          pluginData: state.pluginData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

function createAndSetState(state, config) {
  var match = OptionSt$Meta3dCommonlib.unsafeGet(state.gameObjectContribute);
  return {
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
          states: state.states,
          pluginData: state.pluginData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: {
            state: match.createStateFunc(config),
            createGameObjectFunc: match.createGameObjectFunc,
            getNeedDisposedGameObjectsFunc: match.getNeedDisposedGameObjectsFunc,
            deferDisposeGameObjectFunc: match.deferDisposeGameObjectFunc,
            disposeGameObjectsFunc: match.disposeGameObjectsFunc,
            getAllGameObjectsFunc: match.getAllGameObjectsFunc
          }
        };
}

function _unsafeGetUsedGameObjectContribute(param) {
  return OptionSt$Meta3dCommonlib.unsafeGet(param.usedGameObjectContribute);
}

function _setGameObjectStateToState(state, usedGameObjectContribute, gameObjectState) {
  usedGameObjectContribute.state = gameObjectState;
  state.usedGameObjectContribute = usedGameObjectContribute;
  return state;
}

function createGameObject(state) {
  var usedGameObjectContribute = _unsafeGetUsedGameObjectContribute(state);
  var match = usedGameObjectContribute.createGameObjectFunc(usedGameObjectContribute.state);
  return [
          _setGameObjectStateToState(state, usedGameObjectContribute, match[0]),
          match[1]
        ];
}

function deferDisposeGameObject(state, gameObject) {
  var usedGameObjectContribute = _unsafeGetUsedGameObjectContribute(state);
  var usedTransformContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentTransformProtocol.componentName);
  var match = usedGameObjectContribute.deferDisposeGameObjectFunc([
        usedGameObjectContribute.state,
        usedTransformContribute.state
      ], [
        usedTransformContribute.getComponentFunc,
        usedTransformContribute.deferDisposeComponentFunc
      ], gameObject);
  var usedTransformContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match[1], usedTransformContribute);
  return ComponentManager$Meta3dEngineCore.setUsedComponentContribute(_setGameObjectStateToState(state, usedGameObjectContribute, match[0]), usedTransformContribute$1, Index$Meta3dComponentTransformProtocol.componentName);
}

function disposeGameObjects(state, gameObjects) {
  var usedGameObjectContribute = _unsafeGetUsedGameObjectContribute(state);
  var usedTransformContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentTransformProtocol.componentName);
  var match = usedGameObjectContribute.disposeGameObjectsFunc([
        usedGameObjectContribute.state,
        usedTransformContribute.state
      ], [
        usedTransformContribute.getComponentsFunc,
        usedTransformContribute.disposeComponentsFunc
      ], gameObjects);
  var usedTransformContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match[1], usedTransformContribute);
  return ComponentManager$Meta3dEngineCore.setUsedComponentContribute(_setGameObjectStateToState(state, usedGameObjectContribute, match[0]), usedTransformContribute$1, Index$Meta3dComponentTransformProtocol.componentName);
}

function getAllGameObjects(state) {
  var usedGameObjectContribute = _unsafeGetUsedGameObjectContribute(state);
  return usedGameObjectContribute.getAllGameObjectsFunc(usedGameObjectContribute.state);
}

exports.unsafeGetGameObjectData = unsafeGetGameObjectData;
exports.setGameObjectContribute = setGameObjectContribute;
exports.createAndSetState = createAndSetState;
exports._unsafeGetUsedGameObjectContribute = _unsafeGetUsedGameObjectContribute;
exports._setGameObjectStateToState = _setGameObjectStateToState;
exports.createGameObject = createGameObject;
exports.deferDisposeGameObject = deferDisposeGameObject;
exports.disposeGameObjects = disposeGameObjects;
exports.getAllGameObjects = getAllGameObjects;
/* No side effect */
