'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

var _removeGameObject = MutableSparseMap$Meta3dCommonlib.remove;

function remove(state) {
  var gameObjectMap = state.gameObjectMap;
  var gameObjectTransformMap = state.gameObjectTransformMap;
  return function (gameObject, transform) {
    MutableSparseMap$Meta3dCommonlib.remove(gameObjectMap, transform);
    MutableSparseMap$Meta3dCommonlib.remove(gameObjectTransformMap, gameObject);
    return state;
  };
}

exports._removeComponent = _removeComponent;
exports._removeGameObject = _removeGameObject;
exports.remove = remove;
/* No side effect */
