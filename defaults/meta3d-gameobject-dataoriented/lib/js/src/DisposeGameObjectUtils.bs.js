'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var ConfigUtils$Meta3dGameobjectDataoriented = require("./config/ConfigUtils.bs.js");
var ComponentMapUtils$Meta3dGameobjectDataoriented = require("./utils/ComponentMapUtils.bs.js");

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

exports.deferDisposeGameObjectFunc = deferDisposeGameObjectFunc;
exports._isNotNeedDispose = _isNotNeedDispose;
exports.batchDisposeGameObjectsFunc = batchDisposeGameObjectsFunc;
/* No side effect */
