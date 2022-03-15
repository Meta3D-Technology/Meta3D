'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param) {
  var needDisposedGeometrys = param.needDisposedGeometrys;
  return MutableSparseMap$Meta3dCommonlib.reducei(needDisposedGeometrys, (function (result, gameObjects, component) {
                return MutableSparseMap$Meta3dCommonlib.set(result, component, ArraySt$Meta3dCommonlib.removeDuplicateItems(gameObjects));
              }), MutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

exports.get = get;
/* No side effect */
