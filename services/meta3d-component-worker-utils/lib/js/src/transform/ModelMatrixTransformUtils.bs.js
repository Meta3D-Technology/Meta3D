'use strict';

var OperateTypeArrayTransformUtils$Meta3dComponentWorkerUtils = require("./OperateTypeArrayTransformUtils.bs.js");

function getLocalToWorldMatrix(localToWorldMatrices, transform) {
  return OperateTypeArrayTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices);
}

exports.getLocalToWorldMatrix = getLocalToWorldMatrix;
/* No side effect */
