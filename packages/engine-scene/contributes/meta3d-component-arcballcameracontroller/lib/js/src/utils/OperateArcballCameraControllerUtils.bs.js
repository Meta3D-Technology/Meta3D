'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function getName(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.getNullable(state.names, cameraController);
}

function setName(state, cameraController, name) {
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
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: ImmutableSparseMap$Meta3dCommonlib.set(state.names, cameraController, name)
        };
}

function getDistance(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.distanceMap, cameraController);
}

function setDistance(state, cameraController, distance) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: ImmutableSparseMap$Meta3dCommonlib.set(state.distanceMap, cameraController, distance),
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
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

function getMinDistance(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.minDistanceMap, cameraController);
}

function setMinDistance(state, cameraController, minDistance) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: ImmutableSparseMap$Meta3dCommonlib.set(state.minDistanceMap, cameraController, minDistance),
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

function getWheelSpeed(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.wheelSpeedMap, cameraController);
}

function setWheelSpeed(state, cameraController, wheelSpeed) {
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
          wheelSpeedMap: ImmutableSparseMap$Meta3dCommonlib.set(state.wheelSpeedMap, cameraController, wheelSpeed),
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

function getPhi(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.phiMap, cameraController);
}

function setPhi(state, cameraController, phi) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: ImmutableSparseMap$Meta3dCommonlib.set(state.phiMap, cameraController, phi),
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

function getTheta(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.thetaMap, cameraController);
}

function setTheta(state, cameraController, theta) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: ImmutableSparseMap$Meta3dCommonlib.set(state.thetaMap, cameraController, theta),
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

function getThetaMargin(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.thetaMarginMap, cameraController);
}

function setThetaMargin(state, cameraController, thetaMargin) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: ImmutableSparseMap$Meta3dCommonlib.set(state.thetaMarginMap, cameraController, thetaMargin),
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

function getTarget(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.targetMap, cameraController);
}

function setTarget(state, cameraController, target) {
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
          targetMap: ImmutableSparseMap$Meta3dCommonlib.set(state.targetMap, cameraController, target),
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

function getMoveSpeedX(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.moveSpeedXMap, cameraController);
}

function setMoveSpeedX(state, cameraController, moveSppedX) {
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
          moveSpeedXMap: ImmutableSparseMap$Meta3dCommonlib.set(state.moveSpeedXMap, cameraController, moveSppedX),
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

function getMoveSpeedY(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.moveSpeedYMap, cameraController);
}

function setMoveSpeedY(state, cameraController, moveSppedY) {
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
          moveSpeedYMap: ImmutableSparseMap$Meta3dCommonlib.set(state.moveSpeedYMap, cameraController, moveSppedY),
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

function getRotateSpeed(state, cameraController) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.rotateSpeedMap, cameraController);
}

function setRotateSpeed(state, cameraController, rotateSpeed) {
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
          rotateSpeedMap: ImmutableSparseMap$Meta3dCommonlib.set(state.rotateSpeedMap, cameraController, rotateSpeed),
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers,
          names: state.names
        };
}

exports.getName = getName;
exports.setName = setName;
exports.getDistance = getDistance;
exports.setDistance = setDistance;
exports.getMinDistance = getMinDistance;
exports.setMinDistance = setMinDistance;
exports.getWheelSpeed = getWheelSpeed;
exports.setWheelSpeed = setWheelSpeed;
exports.getPhi = getPhi;
exports.setPhi = setPhi;
exports.getTheta = getTheta;
exports.setTheta = setTheta;
exports.getThetaMargin = getThetaMargin;
exports.setThetaMargin = setThetaMargin;
exports.getTarget = getTarget;
exports.setTarget = setTarget;
exports.getMoveSpeedX = getMoveSpeedX;
exports.setMoveSpeedX = setMoveSpeedX;
exports.getMoveSpeedY = getMoveSpeedY;
exports.setMoveSpeedY = setMoveSpeedY;
exports.getRotateSpeed = getRotateSpeed;
exports.setRotateSpeed = setRotateSpeed;
/* No side effect */
