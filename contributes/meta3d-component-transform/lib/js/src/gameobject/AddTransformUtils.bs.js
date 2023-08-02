'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state) {
  var gameObjectMap = state.gameObjectMap;
  var gameObjectTransformMap = state.gameObjectTransformMap;
  return function (gameObject, transform) {
    MutableSparseMap$Meta3dCommonlib.set(gameObjectMap, transform, gameObject);
    MutableSparseMap$Meta3dCommonlib.set(gameObjectTransformMap, gameObject, transform);
    return state;
  };
}

exports.add = add;
/* No side effect */
