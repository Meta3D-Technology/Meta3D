

import * as Caml_option from "./../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as ArrayMapUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeComponentUtils.bs.js";
import * as ConfigUtils$Meta3dGameobjectDataoriented from "./config/ConfigUtils.bs.js";
import * as GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented from "./GetNeedDisposedGameObjectsUtils.bs.js";

function deferDisposeGameObject(param) {
  var gameObjectState = param[0];
  var needDisposedGameObjectArray = gameObjectState.needDisposedGameObjectArray;
  var pbrMaterialState = param[2];
  var transformState = param[1];
  return function (param, gameObject) {
    var match = param[1];
    var deferDisposePBRMaterialFunc = match[1];
    var match$1 = param[0];
    var deferDisposeTransformFunc = match$1[1];
    var transformState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.bind(match$1[0](transformState, gameObject), (function (transform) {
                return deferDisposeTransformFunc(transformState, [
                            transform,
                            gameObject
                          ]);
              })), transformState);
    var pbrMaterialState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.bind(match[0](pbrMaterialState, gameObject), (function (pbrMaterial) {
                return deferDisposePBRMaterialFunc(pbrMaterialState, [
                            pbrMaterial,
                            gameObject
                          ]);
              })), pbrMaterialState);
    var gameObjectState$1 = {
      config: gameObjectState.config,
      maxUID: gameObjectState.maxUID,
      needDisposedGameObjectArray: ArraySt$Meta3dCommonlib.push(needDisposedGameObjectArray, gameObject)
    };
    return [
            gameObjectState$1,
            transformState$1,
            pbrMaterialState$1
          ];
  };
}

function _getTransforms(state, getTransformFunc, gameObjects) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(gameObjects, (function (arr, gameObject) {
                var component = OptionSt$Meta3dCommonlib.fromNullable(getTransformFunc(state, gameObject));
                if (component !== undefined) {
                  return ArraySt$Meta3dCommonlib.push(arr, Caml_option.valFromOption(component));
                } else {
                  return arr;
                }
              }), []);
}

function _getSharableComponentDataMap(state, getComponentFunc, gameObjects) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(gameObjects, (function (dataMap, gameObject) {
                return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.bind(getComponentFunc(state, gameObject), (function (component) {
                                  return ArrayMapUtils$Meta3dCommonlib.addValue(dataMap, component, gameObject);
                                })), dataMap);
              }), MutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

function _isNotNeedDispose(component, needDisposedIndexArray) {
  return !needDisposedIndexArray.includes(component);
}

function disposeGameObjects(param) {
  var gameObjectState = param[0];
  var pbrMaterialState = param[2];
  var transformState = param[1];
  return function (param, gameObjects) {
    var match = param[1];
    var match$1 = param[0];
    var isDebug = ConfigUtils$Meta3dGameobjectDataoriented.getIsDebug(gameObjectState);
    var needDisposedGameObjectArray = GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented.get(gameObjectState);
    DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "gameObject", gameObjects, needDisposedGameObjectArray);
    gameObjectState.needDisposedGameObjectArray = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedGameObjectArray, gameObjects);
    var transformState$1 = match$1[1](transformState, _getTransforms(transformState, match$1[0], gameObjects));
    var pbrMaterialState$1 = match[1](pbrMaterialState, _getSharableComponentDataMap(pbrMaterialState, match[0], gameObjects));
    return [
            gameObjectState,
            transformState$1,
            pbrMaterialState$1
          ];
  };
}

export {
  deferDisposeGameObject ,
  _getTransforms ,
  _getSharableComponentDataMap ,
  _isNotNeedDispose ,
  disposeGameObjects ,
  
}
/* No side effect */