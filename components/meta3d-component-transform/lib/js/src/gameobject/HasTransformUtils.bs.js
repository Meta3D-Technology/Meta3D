'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function has(param) {
  var gameObjectTransformMap = param.gameObjectTransformMap;
  return function (gameObject) {
    return MutableSparseMap$Meta3dCommonlib.has(gameObjectTransformMap, gameObject);
  };
}

exports.has = has;
/* No side effect */
