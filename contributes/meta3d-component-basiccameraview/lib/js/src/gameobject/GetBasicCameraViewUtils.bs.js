'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function get(param, gameObject) {
  return ImmutableSparseMap$Meta3dCommonlib.unsafeGet(param.gameObjectBasicCameraViewMap, gameObject);
}

exports.get = get;
/* No side effect */
