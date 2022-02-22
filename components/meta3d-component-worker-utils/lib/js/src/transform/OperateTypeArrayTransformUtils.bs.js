'use strict';

var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var BufferTransformUtils$Meta3dComponentWorkerUtils = require("./BufferTransformUtils.bs.js");

function getLocalToWorldMatrixTypeArray(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat16TypeArray(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrixIndex(index), typeArr);
}

exports.getLocalToWorldMatrixTypeArray = getLocalToWorldMatrixTypeArray;
/* No side effect */
