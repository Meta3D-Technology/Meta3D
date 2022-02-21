

import * as CreateState$Meta3dEngineCore from "./state/CreateState.bs.js";
import * as DirectorForJs$Meta3dEngineCore from "./manager/DirectorForJs.bs.js";

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
          registerComponent: DirectorForJs$Meta3dEngineCore.registerComponent,
          unregisterComponent: DirectorForJs$Meta3dEngineCore.unregisterComponent,
          createAndSetComponentState: DirectorForJs$Meta3dEngineCore.createAndSetComponentState,
          unsafeGetUsedComponentContribute: DirectorForJs$Meta3dEngineCore.unsafeGetUsedComponentContribute,
          setUsedComponentContribute: DirectorForJs$Meta3dEngineCore.setUsedComponentContribute,
          createComponent: DirectorForJs$Meta3dEngineCore.createComponent,
          setComponentData: DirectorForJs$Meta3dEngineCore.setComponentData,
          addComponent: DirectorForJs$Meta3dEngineCore.addComponent,
          hasComponent: DirectorForJs$Meta3dEngineCore.hasComponent,
          getComponent: DirectorForJs$Meta3dEngineCore.getComponent,
          getAllComponents: DirectorForJs$Meta3dEngineCore.getAllComponents,
          getComponentData: DirectorForJs$Meta3dEngineCore.getComponentData,
          getComponentGameObjects: DirectorForJs$Meta3dEngineCore.getComponentGameObjects,
          getComponentState: DirectorForJs$Meta3dEngineCore.getComponentState,
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

var unsafeGetUsedComponentContribute = DirectorForJs$Meta3dEngineCore.unsafeGetUsedComponentContribute;

var setUsedComponentContribute = DirectorForJs$Meta3dEngineCore.setUsedComponentContribute;

var setComponentData = DirectorForJs$Meta3dEngineCore.setComponentData;

var addComponent = DirectorForJs$Meta3dEngineCore.addComponent;

var hasComponent = DirectorForJs$Meta3dEngineCore.hasComponent;

var getComponent = DirectorForJs$Meta3dEngineCore.getComponent;

var getAllComponents = DirectorForJs$Meta3dEngineCore.getAllComponents;

var getComponentData = DirectorForJs$Meta3dEngineCore.getComponentData;

var getComponentGameObjects = DirectorForJs$Meta3dEngineCore.getComponentGameObjects;

var setGameObjectContribute = DirectorForJs$Meta3dEngineCore.setGameObjectContribute;

var createAndSetGameObjectState = DirectorForJs$Meta3dEngineCore.createAndSetGameObjectState;

var createGameObject = DirectorForJs$Meta3dEngineCore.createGameObject;

var getAllGameObjects = DirectorForJs$Meta3dEngineCore.getAllGameObjects;

var getComponentState = DirectorForJs$Meta3dEngineCore.getComponentState;

export {
  prepare ,
  init ,
  runPipeline ,
  registerWorkPlugin ,
  unregisterWorkPlugin ,
  getIsDebug ,
  setIsDebug ,
  registerComponent ,
  unregisterComponent ,
  createAndSetComponentState ,
  createComponent ,
  unsafeGetUsedComponentContribute ,
  setUsedComponentContribute ,
  setComponentData ,
  addComponent ,
  hasComponent ,
  getComponent ,
  getAllComponents ,
  getComponentData ,
  getComponentGameObjects ,
  setGameObjectContribute ,
  createAndSetGameObjectState ,
  createGameObject ,
  getAllGameObjects ,
  getComponentState ,
  getService ,
  createState ,
  
}
/* No side effect */
