'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param) {
  var needDisposedGeometryArray = param.needDisposedGeometryArray;
  return MutableSparseMap$Meta3dCommonlib.reducei(needDisposedGeometryArray, (function (result, gameObjects, component) {
                return MutableSparseMap$Meta3dCommonlib.set(result, component, ArraySt$Meta3dCommonlib.removeDuplicateItems(gameObjects));
              }), MutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

exports.get = get;
/* No side effect */
