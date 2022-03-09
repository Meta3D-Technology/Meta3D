'use strict';

var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state, gameObject, material) {
  ArrayMapUtils$Meta3dCommonlib.addValue(state.gameObjectsMap, material, gameObject);
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectPBRMaterialMap, gameObject, material);
  return state;
}

exports.add = add;
/* No side effect */
