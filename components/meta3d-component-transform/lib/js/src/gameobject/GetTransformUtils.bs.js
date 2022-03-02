'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param, gameObject) {
  return MutableSparseMap$Meta3dCommonlib.getNullable(param.gameObjectTransformMap, gameObject);
}

exports.get = get;
/* No side effect */
