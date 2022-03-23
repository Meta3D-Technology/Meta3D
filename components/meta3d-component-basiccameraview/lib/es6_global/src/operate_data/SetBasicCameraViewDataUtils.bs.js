

import * as Log$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentBasiccameraviewProtocol from "./../../../../../meta3d-component-basiccameraview-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview from "../utils/OperateBasicCameraViewUtils.bs.js";

function setData(state, cameraView, dataName, dataValue) {
  if (dataName === Index$Meta3dComponentBasiccameraviewProtocol.dataName.isActive) {
    return OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview.setIsActive(state, cameraView, dataValue);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  setData ,
  
}
/* No side effect */
