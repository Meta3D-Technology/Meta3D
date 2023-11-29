'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");
var Index$Meta3dComponentDirectionlightProtocol = require("meta3d-component-directionlight-protocol/lib/js/src/Index.bs.js");
var OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js");

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

exports.getName = getName;
exports.getData = getData;
/* No side effect */
