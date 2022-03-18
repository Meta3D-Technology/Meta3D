

import * as Log$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentArcballcameracontrollerProtocol from "./../../../../../../node_modules/meta3d-component-arcballcameracontroller-protocol/lib/es6_global/src/Index.bs.js";
import * as DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "../utils/DirtyArcballCameraControllerUtils.bs.js";
import * as OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "../utils/OperateArcballCameraControllerUtils.bs.js";

function getData(state, cameraController, dataName) {
  if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.distance) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getDistance(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.minDistance) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getMinDistance(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.phi) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getPhi(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.theta) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getTheta(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.thetaMargin) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getThetaMargin(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.target) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getTarget(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.moveSpeedX) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getMoveSpeedX(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.moveSpeedY) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getMoveSpeedY(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.wheelSpeed) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getWheelSpeed(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.rotateSpeed) {
    return OptionSt$Meta3dCommonlib.toNullable(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getRotateSpeed(state, cameraController));
  } else if (dataName === Index$Meta3dComponentArcballcameracontrollerProtocol.dataName.dirty) {
    return OptionSt$Meta3dCommonlib.toNullable(DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.isDirty(state, cameraController));
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
