'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param) {
  var gameObjectMap = param.gameObjectMap;
  return function (transform) {
    var gameObject = MutableSparseMap$Meta3dCommonlib.get(gameObjectMap, transform);
    if (gameObject !== undefined) {
      return [gameObject];
    } else {
      return [];
    }
  };
}

exports.get = get;
/* No side effect */
