'use strict';

var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state) {
  var gameObjectsMap = state.gameObjectsMap;
  var gameObjectPBRMaterialMap = state.gameObjectPBRMaterialMap;
  return function (gameObject, material) {
    ArrayMapUtils$Meta3dCommonlib.addValue(gameObjectsMap, material, gameObject);
    MutableSparseMap$Meta3dCommonlib.set(gameObjectPBRMaterialMap, gameObject, material);
    return state;
  };
}

exports.add = add;
/* No side effect */
