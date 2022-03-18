'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state, gameObject, light) {
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectMap, light, gameObject);
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectDirectionLightMap, gameObject, light);
  return state;
}

exports.add = add;
/* No side effect */
