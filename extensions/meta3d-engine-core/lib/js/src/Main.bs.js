'use strict';

var CreateState$Meta3dEngineCore = require("./state/CreateState.bs.js");
var DirectorForJs$Meta3dEngineCore = require("./manager/DirectorForJs.bs.js");

function getExtensionService(api, dependentExtensionNameMap) {
  var partial_arg = [
    api,
    dependentExtensionNameMap
  ];
  return {
          getIsDebug: DirectorForJs$Meta3dEngineCore.getIsDebug,
          setIsDebug: DirectorForJs$Meta3dEngineCore.setIsDebug,
          prepare: DirectorForJs$Meta3dEngineCore.prepare,
          init: DirectorForJs$Meta3dEngineCore.init,
          registerWorkPlugin: DirectorForJs$Meta3dEngineCore.registerWorkPlugin,
          unregisterWorkPlugin: DirectorForJs$Meta3dEngineCore.unregisterWorkPlugin,
          registerComponent: DirectorForJs$Meta3dEngineCore.registerComponent,
          unregisterComponent: DirectorForJs$Meta3dEngineCore.unregisterComponent,
          createAndSetComponentState: DirectorForJs$Meta3dEngineCore.createAndSetComponentState,
          unsafeGetUsedComponentContribute: DirectorForJs$Meta3dEngineCore.unsafeGetUsedComponentContribute,
          setUsedComponentContribute: DirectorForJs$Meta3dEngineCore.setUsedComponentContribute,
          createComponent: DirectorForJs$Meta3dEngineCore.createComponent,
          setComponentData: DirectorForJs$Meta3dEngineCore.setComponentData,
          addComponent: DirectorForJs$Meta3dEngineCore.addComponent,
          removeComponent: DirectorForJs$Meta3dEngineCore.removeComponent,
          hasComponent: DirectorForJs$Meta3dEngineCore.hasComponent,
          getComponent: DirectorForJs$Meta3dEngineCore.getComponent,
          deferDisposeComponent: DirectorForJs$Meta3dEngineCore.deferDisposeComponent,
          disposeComponents: DirectorForJs$Meta3dEngineCore.disposeComponents,
          getAllComponents: DirectorForJs$Meta3dEngineCore.getAllComponents,
          getComponentData: DirectorForJs$Meta3dEngineCore.getComponentData,
          getComponentGameObjects: DirectorForJs$Meta3dEngineCore.getComponentGameObjects,
          getComponentState: DirectorForJs$Meta3dEngineCore.getComponentState,
          setGameObjectContribute: DirectorForJs$Meta3dEngineCore.setGameObjectContribute,
          createAndSetGameObjectState: DirectorForJs$Meta3dEngineCore.createAndSetGameObjectState,
          createGameObject: DirectorForJs$Meta3dEngineCore.createGameObject,
          deferDisposeGameObject: DirectorForJs$Meta3dEngineCore.deferDisposeGameObject,
          disposeGameObjects: DirectorForJs$Meta3dEngineCore.disposeGameObjects,
          cloneGameObject: DirectorForJs$Meta3dEngineCore.cloneGameObject,
          getAllGameObjects: DirectorForJs$Meta3dEngineCore.getAllGameObjects,
          runPipeline: (function (param, param$1, param$2) {
              return DirectorForJs$Meta3dEngineCore.runPipeline(partial_arg, param, param$1, param$2);
            })
        };
}

function createExtensionState(param) {
  return CreateState$Meta3dEngineCore.createState(undefined);
}

exports.getExtensionService = getExtensionService;
exports.createExtensionState = createExtensionState;
/* No side effect */
