'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function _getComponents(gameObjectComponentMap, gameObjects) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(gameObjects, (function (arr, gameObject) {
                var component = MutableSparseMap$Meta3dCommonlib.get(gameObjectComponentMap, gameObject);
                if (component !== undefined) {
                  return ArraySt$Meta3dCommonlib.push(arr, Caml_option.valFromOption(component));
                } else {
                  return arr;
                }
              }), []);
}

function get(param) {
  var gameObjectTransformMap = param.gameObjectTransformMap;
  return function (gameObjects) {
    return _getComponents(gameObjectTransformMap, gameObjects);
  };
}

exports._getComponents = _getComponents;
exports.get = get;
/* No side effect */
