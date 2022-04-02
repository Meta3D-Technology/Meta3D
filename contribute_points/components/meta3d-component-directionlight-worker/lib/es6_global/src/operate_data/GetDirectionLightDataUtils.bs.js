

import * as Log$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentDirectionlightWorkerProtocol from "./../../../../../../node_modules/meta3d-component-directionlight-worker-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js";

function getData(state, light, dataName) {
  if (dataName === Index$Meta3dComponentDirectionlightWorkerProtocol.dataName.color) {
    return OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.getColor(light, state.colors);
  } else if (dataName === Index$Meta3dComponentDirectionlightWorkerProtocol.dataName.intensity) {
    return OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensity(light, state.intensities);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
