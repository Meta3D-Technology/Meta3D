'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentArcballcameracontrollerProtocol = require("meta3d-component-arcballcameracontroller-protocol/lib/js/src/Index.bs.js");
var DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("../utils/DirtyArcballCameraControllerUtils.bs.js");
var OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("../utils/OperateArcballCameraControllerUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
