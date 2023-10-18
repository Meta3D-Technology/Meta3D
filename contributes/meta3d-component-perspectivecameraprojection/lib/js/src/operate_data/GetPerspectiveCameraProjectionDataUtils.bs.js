'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentPerspectivecameraprojectionProtocol = require("meta3d-component-perspectivecameraprojection-protocol/lib/js/src/Index.bs.js");
var DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("../utils/DirtyPerspectiveCameraProjectionUtils.bs.js");
var OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("../utils/OperatePerspectiveCameraProjectionUtils.bs.js");

function getData(state, cameraProjection, dataName) {
  if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.pMatrix) {
    return OptionSt$Meta3dCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.getPMatrix(state, cameraProjection));
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.fovy) {
    return OptionSt$Meta3dCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.getFovy(state, cameraProjection));
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.aspect) {
    return OptionSt$Meta3dCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.getAspect(state, cameraProjection));
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.far) {
    return OptionSt$Meta3dCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.getFar(state, cameraProjection));
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.near) {
    return OptionSt$Meta3dCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.getNear(state, cameraProjection));
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.dirty) {
    return OptionSt$Meta3dCommonlib.toNullable(DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.isDirty(state, cameraProjection));
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName + "", "", "", "")));
  }
}

exports.getData = getData;
/* No side effect */
