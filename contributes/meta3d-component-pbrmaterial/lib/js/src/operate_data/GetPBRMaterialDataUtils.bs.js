'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentPbrmaterialProtocol = require("meta3d-component-pbrmaterial-protocol/lib/js/src/Index.bs.js");
var OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js");

function getData(param, param$1, param$2) {
  var diffuseColors = param.diffuseColors;
  var speculars = param.speculars;
  if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.diffuseColor) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColor(param$1, diffuseColors);
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.specular) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecular(param$1, speculars);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$2 + "", "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
