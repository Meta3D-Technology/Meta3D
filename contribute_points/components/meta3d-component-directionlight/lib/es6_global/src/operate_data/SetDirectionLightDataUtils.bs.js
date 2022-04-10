

import * as Log$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentDirectionlightProtocol from "./../../../../../../../node_modules/meta3d-component-directionlight-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight from "../utils/OperateTypeArrayDirectionLightUtils.bs.js";

function setData(state, param, param$1, param$2) {
  var colors = state.colors;
  var intensities = state.intensities;
  if (param$1 === Index$Meta3dComponentDirectionlightProtocol.dataName.color) {
    OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight.setColor(param, param$2, colors);
  } else if (param$1 === Index$Meta3dComponentDirectionlightProtocol.dataName.intensity) {
    OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight.setIntensity(param, param$2, intensities);
  } else {
    Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + param$1, "", "", ""));
  }
  return state;
}

export {
  setData ,
  
}
/* No side effect */
