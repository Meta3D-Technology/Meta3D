'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentTransformWorkerProtocol = require("meta3d-component-transform-worker-protocol/lib/js/src/Index.bs.js");
var ModelMatrixTransformUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/transform/ModelMatrixTransformUtils.bs.js");

function getData(state, transform, dataName) {
  if (dataName === Index$Meta3dComponentTransformWorkerProtocol.dataName.localToWorldMatrix) {
    return ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, transform);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
