'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function get(param, gameObject) {
  return ImmutableSparseMap$Meta3dCommonlib.getNullable(param.gameObjectPerspectiveCameraProjectionMap, gameObject);
}

exports.get = get;
/* No side effect */
