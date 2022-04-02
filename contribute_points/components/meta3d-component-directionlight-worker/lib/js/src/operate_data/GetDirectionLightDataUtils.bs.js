'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentDirectionlightWorkerProtocol = require("meta3d-component-directionlight-worker-protocol/lib/js/src/Index.bs.js");
var OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js");

function getData(state, light, dataName) {
  if (dataName === Index$Meta3dComponentDirectionlightWorkerProtocol.dataName.color) {
    return OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.getColor(light, state.colors);
  } else if (dataName === Index$Meta3dComponentDirectionlightWorkerProtocol.dataName.intensity) {
    return OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensity(light, state.intensities);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
