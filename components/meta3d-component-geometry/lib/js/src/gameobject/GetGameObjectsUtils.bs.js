'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param) {
  var gameObjectsMap = param.gameObjectsMap;
  return function (geometry) {
    return ArraySt$Meta3dCommonlib.map(OptionSt$Meta3dCommonlib.getWithDefault(MutableSparseMap$Meta3dCommonlib.get(gameObjectsMap, geometry), []), (function (prim) {
                  return prim;
                }));
  };
}

exports.get = get;
/* No side effect */
