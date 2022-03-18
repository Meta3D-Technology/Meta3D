'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state) {
  var gameObjectMap = state.gameObjectMap;
  var gameObjectDirectionLightMap = state.gameObjectDirectionLightMap;
  return function (gameObject, light) {
    MutableSparseMap$Meta3dCommonlib.set(gameObjectMap, light, gameObject);
    MutableSparseMap$Meta3dCommonlib.set(gameObjectDirectionLightMap, gameObject, light);
    return state;
  };
}

exports.add = add;
/* No side effect */
