'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function has(param, gameObject) {
  return ImmutableSparseMap$Meta3dCommonlib.has(param.gameObjectBasicCameraViewMap, gameObject);
}

exports.has = has;
/* No side effect */
