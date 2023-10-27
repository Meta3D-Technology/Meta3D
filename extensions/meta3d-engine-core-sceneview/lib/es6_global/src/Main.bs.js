

import * as NullableSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as CreateState$Meta3dEngineCoreSceneview from "./state/CreateState.bs.js";
import * as DirectorForJs$Meta3dEngineCoreSceneview from "./manager/DirectorForJs.bs.js";
import * as StateContainer$Meta3dEngineCoreSceneview from "./state/StateContainer.bs.js";

function getExtensionService(api) {
  var partial_arg = [
    StateContainer$Meta3dEngineCoreSceneview.unsafeGetMeta3dState,
    StateContainer$Meta3dEngineCoreSceneview.setMeta3dState
  ];
  return {
          getIsDebug: DirectorForJs$Meta3dEngineCoreSceneview.getIsDebug,
          setIsDebug: DirectorForJs$Meta3dEngineCoreSceneview.setIsDebug,
          prepare: DirectorForJs$Meta3dEngineCoreSceneview.prepare,
          init: DirectorForJs$Meta3dEngineCoreSceneview.init,
          registerPipeline: DirectorForJs$Meta3dEngineCoreSceneview.registerPipeline,
          unregisterPipeline: DirectorForJs$Meta3dEngineCoreSceneview.unregisterPipeline,
          registerComponent: DirectorForJs$Meta3dEngineCoreSceneview.registerComponent,
          unregisterComponent: DirectorForJs$Meta3dEngineCoreSceneview.unregisterComponent,
          createAndSetComponentState: DirectorForJs$Meta3dEngineCoreSceneview.createAndSetComponentState,
          unsafeGetUsedComponentContribute: DirectorForJs$Meta3dEngineCoreSceneview.unsafeGetUsedComponentContribute,
          setUsedComponentContribute: DirectorForJs$Meta3dEngineCoreSceneview.setUsedComponentContribute,
          createComponent: DirectorForJs$Meta3dEngineCoreSceneview.createComponent,
          setComponentData: DirectorForJs$Meta3dEngineCoreSceneview.setComponentData,
          addComponent: DirectorForJs$Meta3dEngineCoreSceneview.addComponent,
          removeComponent: DirectorForJs$Meta3dEngineCoreSceneview.removeComponent,
          hasComponent: DirectorForJs$Meta3dEngineCoreSceneview.hasComponent,
          getComponent: DirectorForJs$Meta3dEngineCoreSceneview.getComponent,
          deferDisposeComponent: DirectorForJs$Meta3dEngineCoreSceneview.deferDisposeComponent,
          disposeComponents: DirectorForJs$Meta3dEngineCoreSceneview.disposeComponents,
          getAllComponents: DirectorForJs$Meta3dEngineCoreSceneview.getAllComponents,
          getComponentData: DirectorForJs$Meta3dEngineCoreSceneview.getComponentData,
          getNeedDisposedComponents: DirectorForJs$Meta3dEngineCoreSceneview.getNeedDisposedComponents,
          getComponentGameObjects: DirectorForJs$Meta3dEngineCoreSceneview.getComponentGameObjects,
          getComponentState: DirectorForJs$Meta3dEngineCoreSceneview.getComponentState,
          setGameObjectContribute: DirectorForJs$Meta3dEngineCoreSceneview.setGameObjectContribute,
          createAndSetGameObjectState: DirectorForJs$Meta3dEngineCoreSceneview.createAndSetGameObjectState,
          createGameObject: DirectorForJs$Meta3dEngineCoreSceneview.createGameObject,
          getNeedDisposedGameObjects: DirectorForJs$Meta3dEngineCoreSceneview.getNeedDisposedGameObjects,
          deferDisposeGameObject: DirectorForJs$Meta3dEngineCoreSceneview.deferDisposeGameObject,
          disposeGameObjects: DirectorForJs$Meta3dEngineCoreSceneview.disposeGameObjects,
          cloneGameObject: DirectorForJs$Meta3dEngineCoreSceneview.cloneGameObject,
          getAllGameObjects: DirectorForJs$Meta3dEngineCoreSceneview.getAllGameObjects,
          getGameObjectName: DirectorForJs$Meta3dEngineCoreSceneview.getGameObjectName,
          setGameObjectName: DirectorForJs$Meta3dEngineCoreSceneview.setGameObjectName,
          runPipeline: (function (param, param$1, param$2) {
              return DirectorForJs$Meta3dEngineCoreSceneview.runPipeline(api, partial_arg, param, param$1, param$2);
            })
        };
}

function createExtensionState(param) {
  return CreateState$Meta3dEngineCoreSceneview.createState(undefined);
}

function getExtensionLife(api, extensionProtocolName) {
  return {
          onRegister: null,
          onRestore: NullableSt$Meta3dCommonlib.$$return(function (param, param$1) {
                return DirectorForJs$Meta3dEngineCoreSceneview.restore(api, extensionProtocolName, param, param$1);
              }),
          onDeepCopy: NullableSt$Meta3dCommonlib.$$return(function (param) {
                return DirectorForJs$Meta3dEngineCoreSceneview.deepCopy(api, extensionProtocolName, param);
              }),
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
}
/* No side effect */
