

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as NumberUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/NumberUtils.bs.js";
import * as ConfigUtils$Meta3dComponentArcballcameracontroller from "../config/ConfigUtils.bs.js";
import * as Index$Meta3dComponentArcballcameracontrollerProtocol from "../../../../../../node_modules/meta3d-component-arcballcameracontroller-protocol/lib/es6_global/src/Index.bs.js";
import * as DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "../utils/DirtyArcballCameraControllerUtils.bs.js";
import * as OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "../utils/OperateArcballCameraControllerUtils.bs.js";

function _constrainTheta(isDebug, theta, thetaMargin) {
  return NumberUtils$Meta3dCommonlib.clamp(isDebug, theta, thetaMargin, Math.PI - thetaMargin);
}

function setData(state, cameraController, dataName, dataValue) {
  if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.distance) {
    return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setDistance(state, cameraController, NumberUtils$Meta3dCommonlib.bigThan(dataValue, OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getMinDistance(state, cameraController)))), cameraController, true);
  }
  if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.minDistance) {
    return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setMinDistance(state, cameraController, dataValue), cameraController, true);
  }
  if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.wheelSpeed) {
    return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setWheelSpeed(state, cameraController, dataValue), cameraController, true);
  }
  if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.phi) {
    return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setPhi(state, cameraController, dataValue), cameraController, true);
  }
  if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.theta) {
    return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setTheta(state, cameraController, _constrainTheta(ConfigUtils$Meta3dComponentArcballcameracontroller.getIsDebug(state), dataValue, OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getThetaMargin(state, cameraController)))), cameraController, true);
  }
  if (dataName !== Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.thetaMargin) {
    if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.target) {
      return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setTarget(state, cameraController, dataValue), cameraController, true);
    } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.moveSpeedX) {
      return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setMoveSpeedX(state, cameraController, dataValue), cameraController, true);
    } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.moveSpeedY) {
      return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setMoveSpeedY(state, cameraController, dataValue), cameraController, true);
    } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.rotateSpeed) {
      return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setRotateSpeed(state, cameraController, dataValue), cameraController, true);
    } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.dirty) {
      return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(state, cameraController, dataValue);
    } else {
      return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName + "", "", "", ""));
    }
  }
  var state$1 = OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setThetaMargin(state, cameraController, dataValue);
  return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setTheta(state$1, cameraController, _constrainTheta(ConfigUtils$Meta3dComponentArcballcameracontroller.getIsDebug(state$1), OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getTheta(state$1, cameraController)), dataValue)), cameraController, true);
}

export {
  _constrainTheta ,
  setData ,
}
/* No side effect */
