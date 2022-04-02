

import * as IndexComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/IndexComponentUtils.bs.js";
import * as DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "../utils/DirtyArcballCameraControllerUtils.bs.js";
import * as OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "../utils/OperateArcballCameraControllerUtils.bs.js";

function _setDefaultValue(state, cameraController) {
  return OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setWheelSpeed(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setRotateSpeed(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setMoveSpeedY(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setMoveSpeedX(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setTarget(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setThetaMargin(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setTheta(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setPhi(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setMinDistance(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setDistance(state, cameraController, 10), cameraController, 0.05), cameraController, Math.PI / 2), cameraController, Math.PI / 2), cameraController, 0.05), cameraController, [
                              0,
                              0,
                              0
                            ]), cameraController, 1), cameraController, 1), cameraController, 1), cameraController, 1);
}

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex(state.disposedArcballCameraControllers, index);
  var index$1 = match[1];
  var state$1 = _setDefaultValue(DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(state, index$1, true), index$1);
  return [
          {
            config: state$1.config,
            maxIndex: match[2],
            gameObjectMap: state$1.gameObjectMap,
            dirtyMap: state$1.dirtyMap,
            distanceMap: state$1.distanceMap,
            minDistanceMap: state$1.minDistanceMap,
            phiMap: state$1.phiMap,
            thetaMap: state$1.thetaMap,
            thetaMarginMap: state$1.thetaMarginMap,
            targetMap: state$1.targetMap,
            moveSpeedXMap: state$1.moveSpeedXMap,
            moveSpeedYMap: state$1.moveSpeedYMap,
            rotateSpeedMap: state$1.rotateSpeedMap,
            wheelSpeedMap: state$1.wheelSpeedMap,
            gameObjectArcballCameraControllerMap: state$1.gameObjectArcballCameraControllerMap,
            needDisposedArcballCameraControllers: state$1.needDisposedArcballCameraControllers,
            disposedArcballCameraControllers: match[0]
          },
          index$1
        ];
}

export {
  _setDefaultValue ,
  create ,
  
}
/* No side effect */
