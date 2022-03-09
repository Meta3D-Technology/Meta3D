'use strict';

var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state, gameObject, geometry) {
  ArrayMapUtils$Meta3dCommonlib.addValue(state.gameObjectsMap, geometry, gameObject);
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectGeometryMap, gameObject, geometry);
  return state;
}

exports.add = add;
/* No side effect */
