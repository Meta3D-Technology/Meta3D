

import * as Log$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentPerspectivecameraprojectionProtocol from "./../../../../../../../node_modules/meta3d-component-perspectivecameraprojection-protocol/lib/es6_global/src/Index.bs.js";
import * as DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "../utils/DirtyPerspectiveCameraProjectionUtils.bs.js";
import * as OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "../utils/OperatePerspectiveCameraProjectionUtils.bs.js";

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
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
