'use strict';

var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state) {
  var gameObjectsMap = state.gameObjectsMap;
  var gameObjectGeometryMap = state.gameObjectGeometryMap;
  return function (gameObject, geometry) {
    ArrayMapUtils$Meta3dCommonlib.addValue(gameObjectsMap, geometry, gameObject);
    MutableSparseMap$Meta3dCommonlib.set(gameObjectGeometryMap, gameObject, geometry);
    return state;
  };
}

exports.add = add;
/* No side effect */
