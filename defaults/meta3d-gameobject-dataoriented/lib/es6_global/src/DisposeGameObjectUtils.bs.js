

import * as ArraySt$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as ConfigUtils$Meta3dGameobjectDataoriented from "./config/ConfigUtils.bs.js";
import * as ComponentMapUtils$Meta3dGameobjectDataoriented from "./utils/ComponentMapUtils.bs.js";

function deferDisposeGameObjectFunc(state) {
  var needDisposedGameObjectArray = state.needDisposedGameObjectArray;
  return function (gameObject) {
    return {
            config: state.config,
            maxUID: state.maxUID,
            needDisposedGameObjectArray: ArraySt$Meta3dCommonlib.push(needDisposedGameObjectArray, gameObject)
          };
  };
}

function _isNotNeedDispose(component, needDisposedIndexArray) {
  return !needDisposedIndexArray.includes(component);
}

function batchDisposeGameObjectsFunc(param) {
  var gameObjectState = param[0];
  var needDisposedGameObjectArray = gameObjectState.needDisposedGameObjectArray;
  var transformState = param[1];
  return function (batchDisposeTransformsFunc, gameObjects) {
    var isDebug = ConfigUtils$Meta3dGameobjectDataoriented.getIsDebug(gameObjectState);
    DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "gameObject", gameObjects, needDisposedGameObjectArray);
    var gameObjectTransformMap = transformState.gameObjectTransformMap;
    var transformState$1 = batchDisposeTransformsFunc(transformState, ComponentMapUtils$Meta3dGameobjectDataoriented.batchGetComponent(gameObjects, gameObjectTransformMap));
    return [
            gameObjectState,
            transformState$1
          ];
  };
}

export {
  deferDisposeGameObjectFunc ,
  _isNotNeedDispose ,
  batchDisposeGameObjectsFunc ,
  
}
/* No side effect */
