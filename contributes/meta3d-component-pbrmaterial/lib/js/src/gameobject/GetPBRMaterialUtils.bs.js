'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param) {
  var gameObjectPBRMaterialMap = param.gameObjectPBRMaterialMap;
  return function (gameObject) {
    return MutableSparseMap$Meta3dCommonlib.unsafeGet(gameObjectPBRMaterialMap, gameObject);
  };
}

exports.get = get;
/* No side effect */
