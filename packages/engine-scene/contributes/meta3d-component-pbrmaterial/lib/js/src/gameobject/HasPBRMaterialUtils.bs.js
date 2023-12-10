'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function has(param) {
  var gameObjectPBRMaterialMap = param.gameObjectPBRMaterialMap;
  return function (gameObject) {
    return MutableSparseMap$Meta3dCommonlib.has(gameObjectPBRMaterialMap, gameObject);
  };
}

exports.has = has;
/* No side effect */
