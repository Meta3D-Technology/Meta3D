

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as Index$Meta3dComponentDirectionlightProtocol from "../../../../../../node_modules/meta3d-component-directionlight-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils from "../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js";

function getName(state, light) {
  return ImmutableSparseMap$Meta3dCommonlib.getNullable(state.names, light);
}

function getData(state, param, param$1) {
  var colors = state.colors;
  var intensities = state.intensities;
  if (param$1 === Index$Meta3dComponentDirectionlightProtocol.dataName.name) {
    return ImmutableSparseMap$Meta3dCommonlib.getNullable(state.names, param);
  } else if (param$1 === Index$Meta3dComponentDirectionlightProtocol.dataName.color) {
    return OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.getColor(param, colors);
  } else if (param$1 === Index$Meta3dComponentDirectionlightProtocol.dataName.intensity) {
    return OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensity(param, intensities);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$1 + "", "", "", "")));
  }
}

export {
  getName ,
  getData ,
}
/* No side effect */
