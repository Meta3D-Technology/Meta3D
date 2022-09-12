'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentDirectionlightProtocol = require("meta3d-component-directionlight-protocol/lib/js/src/Index.bs.js");
var OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight = require("../utils/OperateTypeArrayDirectionLightUtils.bs.js");

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

exports.setData = setData;
/* No side effect */
