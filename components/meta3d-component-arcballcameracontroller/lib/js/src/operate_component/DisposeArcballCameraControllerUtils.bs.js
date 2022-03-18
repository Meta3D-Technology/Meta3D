'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var DisposeComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeComponentUtils.bs.js");
var ConfigUtils$Meta3dComponentArcballcameracontroller = require("../config/ConfigUtils.bs.js");
var GetNeedDisposedArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller = require("../gameobject/GetNeedDisposedArcballCameraControllersUtils.bs.js");

function deferDisposeComponent(state) {
  var gameObjectArcballCameraControllerMap = state.gameObjectArcballCameraControllerMap;
  var needDisposedArcballCameraControllers = state.needDisposedArcballCameraControllers;
  return function (param) {
    return {
            config: state.config,
            maxIndex: state.maxIndex,
            gameObjectMap: state.gameObjectMap,
            dirtyMap: state.dirtyMap,
            distanceMap: state.distanceMap,
            minDistanceMap: state.minDistanceMap,
            phiMap: state.phiMap,
            thetaMap: state.thetaMap,
            thetaMarginMap: state.thetaMarginMap,
            targetMap: state.targetMap,
            moveSpeedXMap: state.moveSpeedXMap,
            moveSpeedYMap: state.moveSpeedYMap,
            rotateSpeedMap: state.rotateSpeedMap,
            wheelSpeedMap: state.wheelSpeedMap,
            gameObjectArcballCameraControllerMap: MutableSparseMap$Meta3dCommonlib.remove(gameObjectArcballCameraControllerMap, param[1]),
            needDisposedArcballCameraControllers: ArraySt$Meta3dCommonlib.push(needDisposedArcballCameraControllers, param[0]),
            disposedArcballCameraControllers: state.disposedArcballCameraControllers
          };
  };
}

var _disposeSparseMapData = MutableSparseMap$Meta3dCommonlib.remove;

function _disposeData(state, cameraController) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectMap, cameraController),
          dirtyMap: MutableSparseMap$Meta3dCommonlib.remove(state.dirtyMap, cameraController),
          distanceMap: MutableSparseMap$Meta3dCommonlib.remove(state.distanceMap, cameraController),
          minDistanceMap: MutableSparseMap$Meta3dCommonlib.remove(state.minDistanceMap, cameraController),
          phiMap: MutableSparseMap$Meta3dCommonlib.remove(state.phiMap, cameraController),
          thetaMap: MutableSparseMap$Meta3dCommonlib.remove(state.thetaMap, cameraController),
          thetaMarginMap: MutableSparseMap$Meta3dCommonlib.remove(state.thetaMarginMap, cameraController),
          targetMap: MutableSparseMap$Meta3dCommonlib.remove(state.targetMap, cameraController),
          moveSpeedXMap: MutableSparseMap$Meta3dCommonlib.remove(state.moveSpeedXMap, cameraController),
          moveSpeedYMap: MutableSparseMap$Meta3dCommonlib.remove(state.moveSpeedYMap, cameraController),
          rotateSpeedMap: MutableSparseMap$Meta3dCommonlib.remove(state.rotateSpeedMap, cameraController),
          wheelSpeedMap: MutableSparseMap$Meta3dCommonlib.remove(state.wheelSpeedMap, cameraController),
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers
        };
}

function disposeComponents(state) {
  var disposedArcballCameraControllers = state.disposedArcballCameraControllers;
  return function (cameraControllers) {
    var isDebug = ConfigUtils$Meta3dComponentArcballcameracontroller.getIsDebug(state);
    var needDisposedComponents = GetNeedDisposedArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller.get(state);
    DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "ArcballCameraController", cameraControllers, needDisposedComponents);
    var state$1 = {
      config: state.config,
      maxIndex: state.maxIndex,
      gameObjectMap: state.gameObjectMap,
      dirtyMap: state.dirtyMap,
      distanceMap: state.distanceMap,
      minDistanceMap: state.minDistanceMap,
      phiMap: state.phiMap,
      thetaMap: state.thetaMap,
      thetaMarginMap: state.thetaMarginMap,
      targetMap: state.targetMap,
      moveSpeedXMap: state.moveSpeedXMap,
      moveSpeedYMap: state.moveSpeedYMap,
      rotateSpeedMap: state.rotateSpeedMap,
      wheelSpeedMap: state.wheelSpeedMap,
      gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
      needDisposedArcballCameraControllers: DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedComponents, cameraControllers),
      disposedArcballCameraControllers: disposedArcballCameraControllers.concat(cameraControllers)
    };
    return ArraySt$Meta3dCommonlib.reduceOneParam(cameraControllers, _disposeData, state$1);
  };
}

exports.deferDisposeComponent = deferDisposeComponent;
exports._disposeSparseMapData = _disposeSparseMapData;
exports._disposeData = _disposeData;
exports.disposeComponents = disposeComponents;
/* No side effect */
