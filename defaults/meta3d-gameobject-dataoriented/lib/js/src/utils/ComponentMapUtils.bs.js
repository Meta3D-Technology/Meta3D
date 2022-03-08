'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function batchGetComponent(gameObjects, gameObjectComponentMap) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(gameObjects, (function (arr, gameObject) {
                var component = MutableSparseMap$Meta3dCommonlib.get(gameObjectComponentMap, gameObject);
                if (component !== undefined) {
                  return ArraySt$Meta3dCommonlib.push(arr, component);
                } else {
                  return arr;
                }
              }), []);
}

exports.batchGetComponent = batchGetComponent;
/* No side effect */
