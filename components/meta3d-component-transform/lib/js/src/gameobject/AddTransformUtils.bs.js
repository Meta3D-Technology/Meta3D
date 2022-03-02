'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state, gameObject, transform) {
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectMap, transform, gameObject);
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectTransformMap, gameObject, transform);
  return state;
}

exports.add = add;
/* No side effect */
