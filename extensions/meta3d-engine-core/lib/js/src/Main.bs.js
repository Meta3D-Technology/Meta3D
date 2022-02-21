'use strict';

var CreateState$Meta3dEngineCore = require("./state/CreateState.bs.js");
var DirectorForJs$Meta3dEngineCore = require("./manager/DirectorForJs.bs.js");

function getService(api, dependentExtensionNameMap) {
  var partial_arg = [
    api,
    dependentExtensionNameMap
  ];
  return {
          prepare: DirectorForJs$Meta3dEngineCore.prepare,
          init: DirectorForJs$Meta3dEngineCore.init,
          registerWorkPlugin: DirectorForJs$Meta3dEngineCore.registerWorkPlugin,
          unregisterWorkPlugin: DirectorForJs$Meta3dEngineCore.unregisterWorkPlugin,
          setGameObjectContribute: DirectorForJs$Meta3dEngineCore.setGameObjectContribute,
          createAndSetGameObjectState: DirectorForJs$Meta3dEngineCore.createAndSetGameObjectState,
          createGameObject: DirectorForJs$Meta3dEngineCore.createGameObject,
          getAllGameObjects: DirectorForJs$Meta3dEngineCore.getAllGameObjects,
          runPipeline: (function (param, param$1, param$2) {
              return DirectorForJs$Meta3dEngineCore.runPipeline(partial_arg, param, param$1, param$2);
            })
        };
}

function createState(param) {
  return CreateState$Meta3dEngineCore.createState(undefined);
}

var prepare = DirectorForJs$Meta3dEngineCore.prepare;

var init = DirectorForJs$Meta3dEngineCore.init;

var runPipeline = DirectorForJs$Meta3dEngineCore.runPipeline;

var registerWorkPlugin = DirectorForJs$Meta3dEngineCore.registerWorkPlugin;

var unregisterWorkPlugin = DirectorForJs$Meta3dEngineCore.unregisterWorkPlugin;

var getIsDebug = DirectorForJs$Meta3dEngineCore.getIsDebug;

var setIsDebug = DirectorForJs$Meta3dEngineCore.setIsDebug;

var registerComponent = DirectorForJs$Meta3dEngineCore.registerComponent;

var unregisterComponent = DirectorForJs$Meta3dEngineCore.unregisterComponent;

var createAndSetComponentState = DirectorForJs$Meta3dEngineCore.createAndSetComponentState;

var createComponent = DirectorForJs$Meta3dEngineCore.createComponent;

var unsafeGetRelatedComponentData = DirectorForJs$Meta3dEngineCore.unsafeGetRelatedComponentData;

var setRelatedComponentData = DirectorForJs$Meta3dEngineCore.setRelatedComponentData;

var setComponentData = DirectorForJs$Meta3dEngineCore.setComponentData;

var addComponent = DirectorForJs$Meta3dEngineCore.addComponent;

var hasComponent = DirectorForJs$Meta3dEngineCore.hasComponent;

var getComponent = DirectorForJs$Meta3dEngineCore.getComponent;

var getAllComponents = DirectorForJs$Meta3dEngineCore.getAllComponents;

var getComponentContribute = DirectorForJs$Meta3dEngineCore.getComponentContribute;

var getComponentGameObjects = DirectorForJs$Meta3dEngineCore.getComponentGameObjects;

var setGameObjectContribute = DirectorForJs$Meta3dEngineCore.setGameObjectContribute;

var createAndSetGameObjectState = DirectorForJs$Meta3dEngineCore.createAndSetGameObjectState;

var createGameObject = DirectorForJs$Meta3dEngineCore.createGameObject;

var getAllGameObjects = DirectorForJs$Meta3dEngineCore.getAllGameObjects;

var getState = DirectorForJs$Meta3dEngineCore.getState;

exports.prepare = prepare;
exports.init = init;
exports.runPipeline = runPipeline;
exports.registerWorkPlugin = registerWorkPlugin;
exports.unregisterWorkPlugin = unregisterWorkPlugin;
exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
exports.registerComponent = registerComponent;
exports.unregisterComponent = unregisterComponent;
exports.createAndSetComponentState = createAndSetComponentState;
exports.createComponent = createComponent;
exports.unsafeGetRelatedComponentData = unsafeGetRelatedComponentData;
exports.setRelatedComponentData = setRelatedComponentData;
exports.setComponentData = setComponentData;
exports.addComponent = addComponent;
exports.hasComponent = hasComponent;
exports.getComponent = getComponent;
exports.getAllComponents = getAllComponents;
exports.getComponentContribute = getComponentContribute;
exports.getComponentGameObjects = getComponentGameObjects;
exports.setGameObjectContribute = setGameObjectContribute;
exports.createAndSetGameObjectState = createAndSetGameObjectState;
exports.createGameObject = createGameObject;
exports.getAllGameObjects = getAllGameObjects;
exports.getState = getState;
exports.getService = getService;
exports.createState = createState;
/* No side effect */
