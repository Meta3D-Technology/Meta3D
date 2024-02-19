'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");
var Index$Meta3dComponentDirectionlightProtocol = require("meta3d-component-directionlight-protocol/lib/js/src/Index.bs.js");
var OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight = require("../utils/OperateTypeArrayDirectionLightUtils.bs.js");

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

exports.setName = setName;
exports.setData = setData;
/* No side effect */
