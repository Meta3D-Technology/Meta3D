

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentPerspectivecameraprojectionProtocol from "../../../../../../node_modules/meta3d-component-perspectivecameraprojection-protocol/lib/es6_global/src/Index.bs.js";
import * as DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "../utils/DirtyPerspectiveCameraProjectionUtils.bs.js";
import * as OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "../utils/OperatePerspectiveCameraProjectionUtils.bs.js";

function setData(state, cameraProjection, dataName, dataValue) {
  if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.name) {
    return DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setName(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.pMatrix) {
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
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName + "", "", "", "")));
  }
}

export {
  setData ,
}
/* No side effect */
