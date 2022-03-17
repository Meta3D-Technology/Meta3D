'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ComponentManager$Meta3dEngineCore = require("./component/ComponentManager.bs.js");
var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");
var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");
var Index$Meta3dComponentPbrmaterialProtocol = require("meta3d-component-pbrmaterial-protocol/lib/js/src/Index.bs.js");

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
            cloneGameObjectFunc: match.cloneGameObjectFunc,
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
  var usedPBRMaterialContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentPbrmaterialProtocol.componentName);
  var usedGeometryContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentGeometryProtocol.componentName);
  var match = usedGameObjectContribute.deferDisposeGameObjectFunc([
        usedGameObjectContribute.state,
        usedTransformContribute.state,
        usedPBRMaterialContribute.state,
        usedGeometryContribute.state
      ], [
        [
          usedTransformContribute.getComponentFunc,
          usedTransformContribute.deferDisposeComponentFunc
        ],
        [
          usedPBRMaterialContribute.getComponentFunc,
          usedPBRMaterialContribute.deferDisposeComponentFunc
        ],
        [
          usedGeometryContribute.getComponentFunc,
          usedGeometryContribute.deferDisposeComponentFunc
        ]
      ], gameObject);
  var usedTransformContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match[1], usedTransformContribute);
  var usedPBRMaterialContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match[2], usedPBRMaterialContribute);
  var usedGeometryContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match[3], usedGeometryContribute);
  return ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(_setGameObjectStateToState(state, usedGameObjectContribute, match[0]), usedTransformContribute$1, Index$Meta3dComponentTransformProtocol.componentName), usedPBRMaterialContribute$1, Index$Meta3dComponentPbrmaterialProtocol.componentName), usedGeometryContribute$1, Index$Meta3dComponentGeometryProtocol.componentName);
}

function disposeGameObjects(state, gameObjects) {
  var usedGameObjectContribute = _unsafeGetUsedGameObjectContribute(state);
  var usedTransformContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentTransformProtocol.componentName);
  var usedPBRMaterialContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentPbrmaterialProtocol.componentName);
  var usedGeometryContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentGeometryProtocol.componentName);
  var match = usedGameObjectContribute.disposeGameObjectsFunc([
        usedGameObjectContribute.state,
        usedTransformContribute.state,
        usedPBRMaterialContribute.state,
        usedGeometryContribute.state
      ], [
        [
          usedTransformContribute.getComponentFunc,
          usedTransformContribute.disposeComponentsFunc
        ],
        [
          usedPBRMaterialContribute.getComponentFunc,
          usedPBRMaterialContribute.disposeComponentsFunc
        ],
        [
          usedGeometryContribute.getComponentFunc,
          usedGeometryContribute.disposeComponentsFunc
        ]
      ], gameObjects);
  var usedTransformContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match[1], usedTransformContribute);
  var usedPBRMaterialContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match[2], usedPBRMaterialContribute);
  var usedGeometryContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match[3], usedGeometryContribute);
  return ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(_setGameObjectStateToState(state, usedGameObjectContribute, match[0]), usedTransformContribute$1, Index$Meta3dComponentTransformProtocol.componentName), usedPBRMaterialContribute$1, Index$Meta3dComponentPbrmaterialProtocol.componentName), usedGeometryContribute$1, Index$Meta3dComponentGeometryProtocol.componentName);
}

function cloneGameObject(state, count, cloneConfig, sourceGameObject) {
  var usedGameObjectContribute = _unsafeGetUsedGameObjectContribute(state);
  var usedTransformContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentTransformProtocol.componentName);
  var usedPBRMaterialContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentPbrmaterialProtocol.componentName);
  var usedGeometryContribute = ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentGeometryProtocol.componentName);
  var match = usedGameObjectContribute.cloneGameObjectFunc([
        usedGameObjectContribute.state,
        usedTransformContribute.state,
        usedPBRMaterialContribute.state,
        usedGeometryContribute.state
      ], [
        [
          usedTransformContribute.getComponentFunc,
          usedTransformContribute.cloneComponentFunc,
          usedTransformContribute.addComponentFunc,
          usedTransformContribute.getGameObjectsFunc,
          usedTransformContribute.getComponentDataFunc,
          usedTransformContribute.setComponentDataFunc
        ],
        [
          usedPBRMaterialContribute.getComponentFunc,
          usedPBRMaterialContribute.cloneComponentFunc,
          usedPBRMaterialContribute.addComponentFunc
        ],
        [
          usedGeometryContribute.getComponentFunc,
          usedGeometryContribute.cloneComponentFunc,
          usedGeometryContribute.addComponentFunc
        ]
      ], count, cloneConfig, sourceGameObject);
  var match$1 = match[0];
  var usedTransformContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match$1[1], usedTransformContribute);
  var usedPBRMaterialContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match$1[2], usedPBRMaterialContribute);
  var usedGeometryContribute$1 = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(match$1[3], usedGeometryContribute);
  var state$1 = ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(_setGameObjectStateToState(state, usedGameObjectContribute, match$1[0]), usedTransformContribute$1, Index$Meta3dComponentTransformProtocol.componentName), usedPBRMaterialContribute$1, Index$Meta3dComponentPbrmaterialProtocol.componentName), usedGeometryContribute$1, Index$Meta3dComponentGeometryProtocol.componentName);
  return [
          state$1,
          match[1]
        ];
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
exports.cloneGameObject = cloneGameObject;
exports.getAllGameObjects = getAllGameObjects;
/* No side effect */
