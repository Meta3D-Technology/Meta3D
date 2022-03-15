'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function has(param) {
  var gameObjectGeometryMap = param.gameObjectGeometryMap;
  return function (gameObject) {
    return MutableSparseMap$Meta3dCommonlib.has(gameObjectGeometryMap, gameObject);
  };
}

exports.has = has;
/* No side effect */
