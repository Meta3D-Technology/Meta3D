'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentPerspectivecameraprojectionProtocol = require("meta3d-component-perspectivecameraprojection-protocol/lib/js/src/Index.bs.js");
var DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("../utils/DirtyPerspectiveCameraProjectionUtils.bs.js");
var OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("../utils/OperatePerspectiveCameraProjectionUtils.bs.js");

function setData(state, cameraProjection, dataName, dataValue) {
  if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.pMatrix) {
    return DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setPMatrix(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.fovy) {
    return DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setFovy(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.aspect) {
    return DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setAspect(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.far) {
    return DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setFar(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.near) {
    return DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setNear(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.dirty) {
    return DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.mark(state, cameraProjection, dataValue);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName + "", "", "", ""));
  }
}

exports.setData = setData;
/* No side effect */
