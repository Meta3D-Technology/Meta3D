

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentBasiccameraviewProtocol from "../../../../../../node_modules/meta3d-component-basiccameraview-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview from "../utils/OperateBasicCameraViewUtils.bs.js";

function getData(state, cameraView, dataName) {
  if (dataName === Index$Meta3dComponentBasiccameraviewProtocol.dataName.isActive) {
    return OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview.getIsActive(state, cameraView);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName + "", "", "", ""));
  }
}

export {
  getData ,
}
/* No side effect */
