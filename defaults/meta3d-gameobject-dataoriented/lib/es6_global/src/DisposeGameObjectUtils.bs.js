

import * as ArraySt$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeComponentUtils.bs.js";
import * as ConfigUtils$Meta3dGameobjectDataoriented from "./config/ConfigUtils.bs.js";
import * as GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented from "./GetNeedDisposedGameObjectsUtils.bs.js";

function deferDisposeGameObject(param) {
  var gameObjectState = param[0];
  var needDisposedGameObjectArray = gameObjectState.needDisposedGameObjectArray;
  var transformState = param[1];
  return function (param, gameObject) {
    var transformState$1 = param[1](transformState, param[0](transformState, gameObject));
    var gameObjectState$1 = {
      config: gameObjectState.config,
      maxUID: gameObjectState.maxUID,
      needDisposedGameObjectArray: ArraySt$Meta3dCommonlib.push(needDisposedGameObjectArray, gameObject)
    };
    return [
            gameObjectState$1,
            transformState$1
          ];
  };
}

function _isNotNeedDispose(component, needDisposedIndexArray) {
  return !needDisposedIndexArray.includes(component);
}

function batchDisposeGameObjects(param) {
  var gameObjectState = param[0];
  var transformState = param[1];
  return function (param, gameObjects) {
    var isDebug = ConfigUtils$Meta3dGameobjectDataoriented.getIsDebug(gameObjectState);
    var needDisposedGameObjectArray = GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented.get(gameObjectState);
    DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "gameObject", gameObjects, needDisposedGameObjectArray);
    gameObjectState.needDisposedGameObjectArray = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedGameObjectArray, gameObjects);
    var transformState$1 = param[1](transformState, param[0](transformState, gameObjects));
    return [
            gameObjectState,
            transformState$1
          ];
  };
}

export {
  deferDisposeGameObject ,
  _isNotNeedDispose ,
  batchDisposeGameObjects ,
  
}
/* No side effect */
