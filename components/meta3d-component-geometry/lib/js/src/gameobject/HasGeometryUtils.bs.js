'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function has(param, gameObject) {
  return MutableSparseMap$Meta3dCommonlib.has(param.gameObjectGeometryMap, gameObject);
}

exports.has = has;
/* No side effect */
