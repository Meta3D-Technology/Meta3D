

import * as Log$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as Index$Meta3dComponentDirectionlightProtocol from "../../../../../../../../node_modules/meta3d-component-directionlight-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight from "../utils/OperateTypeArrayDirectionLightUtils.bs.js";

function setName(state, light, name) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          buffer: state.buffer,
          colors: state.colors,
          intensities: state.intensities,
          gameObjectMap: state.gameObjectMap,
          gameObjectDirectionLightMap: state.gameObjectDirectionLightMap,
          needDisposedDirectionLights: state.needDisposedDirectionLights,
          disposedDirectionLights: state.disposedDirectionLights,
          names: ImmutableSparseMap$Meta3dCommonlib.set(state.names, light, name)
        };
}

function setData(state, param, param$1, param$2) {
  var colors = state.colors;
  var intensities = state.intensities;
  if (param$1 === Index$Meta3dComponentDirectionlightProtocol.dataName.name) {
    return setName(state, param, param$2);
  } else if (param$1 === Index$Meta3dComponentDirectionlightProtocol.dataName.color) {
    OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight.setColor(param, param$2, colors);
    return state;
  } else if (param$1 === Index$Meta3dComponentDirectionlightProtocol.dataName.intensity) {
    OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight.setIntensity(param, param$2, intensities);
    return state;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + param$1 + "", "", "", "")));
  }
}

export {
  setName ,
  setData ,
}
/* No side effect */
