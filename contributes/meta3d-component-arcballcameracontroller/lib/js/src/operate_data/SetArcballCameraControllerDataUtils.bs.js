'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var NumberUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/NumberUtils.bs.js");
var ConfigUtils$Meta3dComponentArcballcameracontroller = require("../config/ConfigUtils.bs.js");
var Index$Meta3dComponentArcballcameracontrollerProtocol = require("meta3d-component-arcballcameracontroller-protocol/lib/js/src/Index.bs.js");
var DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("../utils/DirtyArcballCameraControllerUtils.bs.js");
var OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("../utils/OperateArcballCameraControllerUtils.bs.js");

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
      return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
    }
  }
  var state$1 = OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setThetaMargin(state, cameraController, dataValue);
  return DirtyArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setTheta(state$1, cameraController, _constrainTheta(ConfigUtils$Meta3dComponentArcballcameracontroller.getIsDebug(state$1), OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getTheta(state$1, cameraController)), dataValue)), cameraController, true);
}

exports._constrainTheta = _constrainTheta;
exports.setData = setData;
/* No side effect */
