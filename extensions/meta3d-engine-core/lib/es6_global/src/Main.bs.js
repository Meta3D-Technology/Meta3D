

import * as CreateState$Meta3dEngineCore from "./state/CreateState.bs.js";
import * as DirectorForJs$Meta3dEngineCore from "./manager/DirectorForJs.bs.js";

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

function createExtensionState(param) {
  return CreateState$Meta3dEngineCore.createState(undefined);
}

export {
  getExtensionService ,
  createExtensionState ,
  
}
/* No side effect */
