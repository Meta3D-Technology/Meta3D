

import * as Js_array from "../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as Caml_option from "../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as ArrayMapUtils$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeComponentUtils.bs.js";
import * as ConfigUtils$Meta3dGameobjectDataoriented from "./config/ConfigUtils.bs.js";
import * as GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented from "./GetNeedDisposedGameObjectsUtils.bs.js";

function deferDisposeGameObject(param) {
  var gameObjectState = param[0];
  var needDisposedGameObjectArray = gameObjectState.needDisposedGameObjectArray;
  var perspectiveCameraProjectionState = param[7];
  var basicCameraViewState = param[6];
  var arcballCameraControllerState = param[5];
  var directionLightState = param[4];
  var geometryState = param[3];
  var pbrMaterialState = param[2];
  var transformState = param[1];
  return function (param, gameObject) {
    var match = param[6];
    var deferDisposePerspectiveCameraProjectionFunc = match[1];
    var match$1 = param[5];
    var deferDisposeBasicCameraViewFunc = match$1[1];
    var match$2 = param[4];
    var deferDisposeArcballCameraControllerFunc = match$2[1];
    var match$3 = param[3];
    var deferDisposeDirectionLightFunc = match$3[1];
    var match$4 = param[2];
    var deferDisposeGeometryFunc = match$4[1];
    var match$5 = param[1];
    var deferDisposePBRMaterialFunc = match$5[1];
    var match$6 = param[0];
    var deferDisposeTransformFunc = match$6[1];
    var transformState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match$6[0](transformState, gameObject), (function (transform) {
                return deferDisposeTransformFunc(transformState, [
                            transform,
                            gameObject
                          ]);
              })), transformState);
    var pbrMaterialState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match$5[0](pbrMaterialState, gameObject), (function (pbrMaterial) {
                return deferDisposePBRMaterialFunc(pbrMaterialState, [
                            pbrMaterial,
                            gameObject
                          ]);
              })), pbrMaterialState);
    var geometryState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match$4[0](geometryState, gameObject), (function (geometry) {
                return deferDisposeGeometryFunc(geometryState, [
                            geometry,
                            gameObject
                          ]);
              })), geometryState);
    var directionLightState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match$3[0](directionLightState, gameObject), (function (directionLight) {
                return deferDisposeDirectionLightFunc(directionLightState, [
                            directionLight,
                            gameObject
                          ]);
              })), directionLightState);
    var arcballCameraControllerState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match$2[0](arcballCameraControllerState, gameObject), (function (arcballCameraController) {
                return deferDisposeArcballCameraControllerFunc(arcballCameraControllerState, [
                            arcballCameraController,
                            gameObject
                          ]);
              })), arcballCameraControllerState);
    var basicCameraViewState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match$1[0](basicCameraViewState, gameObject), (function (cameraView) {
                return deferDisposeBasicCameraViewFunc(basicCameraViewState, [
                            cameraView,
                            gameObject
                          ]);
              })), basicCameraViewState);
    var perspectiveCameraProjectionState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match[0](perspectiveCameraProjectionState, gameObject), (function (cameraProjection) {
                return deferDisposePerspectiveCameraProjectionFunc(perspectiveCameraProjectionState, [
                            cameraProjection,
                            gameObject
                          ]);
              })), perspectiveCameraProjectionState);
    var gameObjectState$1 = {
      config: gameObjectState.config,
      maxUID: gameObjectState.maxUID,
      needDisposedGameObjectArray: ArraySt$Meta3dCommonlib.push(needDisposedGameObjectArray, gameObject),
      disposedGameObjectArray: gameObjectState.disposedGameObjectArray
    };
    return [
            gameObjectState$1,
            transformState$1,
            pbrMaterialState$1,
            geometryState$1,
            directionLightState$1,
            arcballCameraControllerState$1,
            basicCameraViewState$1,
            perspectiveCameraProjectionState$1
          ];
  };
}

function _getNotSharedComponents(state, getComponentFunc, gameObjects) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(gameObjects, (function (arr, gameObject) {
                var component = OptionSt$Meta3dCommonlib.fromNullable(getComponentFunc(state, gameObject));
                if (component !== undefined) {
                  return ArraySt$Meta3dCommonlib.push(arr, Caml_option.valFromOption(component));
                } else {
                  return arr;
                }
              }), []);
}

function _getSharableComponentDataMap(state, getComponentFunc, gameObjects) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(gameObjects, (function (dataMap, gameObject) {
                return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(getComponentFunc(state, gameObject), (function (component) {
                                  return ArrayMapUtils$Meta3dCommonlib.addValue(dataMap, component, gameObject);
                                })), dataMap);
              }), MutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

function _isNotNeedDispose(component, needDisposedIndexArray) {
  return !Js_array.includes(component, needDisposedIndexArray);
}

function disposeGameObjects(param) {
  var gameObjectState = param[0];
  var perspectiveCameraProjectionState = param[7];
  var basicCameraViewState = param[6];
  var arcballCameraControllerState = param[5];
  var directionLightState = param[4];
  var geometryState = param[3];
  var pbrMaterialState = param[2];
  var transformState = param[1];
  return function (param, gameObjects) {
    var match = param[6];
    var match$1 = param[5];
    var match$2 = param[4];
    var match$3 = param[3];
    var match$4 = param[2];
    var match$5 = param[1];
    var match$6 = param[0];
    var isDebug = ConfigUtils$Meta3dGameobjectDataoriented.getIsDebug(gameObjectState);
    var needDisposedGameObjectArray = GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented.get(gameObjectState);
    DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "gameObject", gameObjects, needDisposedGameObjectArray);
    gameObjectState.disposedGameObjectArray = ArraySt$Meta3dCommonlib.removeDuplicateItems(Js_array.concat(gameObjects, gameObjectState.disposedGameObjectArray));
    gameObjectState.needDisposedGameObjectArray = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedGameObjectArray, gameObjects);
    var match$7 = match$6[1](transformState, _getNotSharedComponents(transformState, match$6[0], gameObjects));
    var match$8 = match$5[1](pbrMaterialState, _getSharableComponentDataMap(pbrMaterialState, match$5[0], gameObjects));
    var match$9 = match$4[1](geometryState, _getSharableComponentDataMap(geometryState, match$4[0], gameObjects));
    var match$10 = match$3[1](directionLightState, _getNotSharedComponents(directionLightState, match$3[0], gameObjects));
    var match$11 = match$2[1](arcballCameraControllerState, _getNotSharedComponents(arcballCameraControllerState, match$2[0], gameObjects));
    var match$12 = match$1[1](basicCameraViewState, _getNotSharedComponents(basicCameraViewState, match$1[0], gameObjects));
    var match$13 = match[1](perspectiveCameraProjectionState, _getNotSharedComponents(perspectiveCameraProjectionState, match[0], gameObjects));
    return [
            [
              gameObjectState,
              match$7[0],
              match$8[0],
              match$9[0],
              match$10[0],
              match$11[0],
              match$12[0],
              match$13[0]
            ],
            [
              gameObjects,
              match$7[1],
              match$8[1],
              match$9[1],
              match$10[1],
              match$11[1],
              match$12[1],
              match$13[1]
            ]
          ];
  };
}

export {
  deferDisposeGameObject ,
  _getNotSharedComponents ,
  _getSharableComponentDataMap ,
  _isNotNeedDispose ,
  disposeGameObjects ,
}
/* No side effect */
