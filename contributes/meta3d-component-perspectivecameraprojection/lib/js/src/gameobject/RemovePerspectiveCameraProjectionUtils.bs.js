'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

var _removeGameObject = MutableSparseMap$Meta3dCommonlib.remove;

function remove(state, gameObject, cameraProjection) {
  MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectMap, cameraProjection);
  MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectPerspectiveCameraProjectionMap, gameObject);
  return state;
}

exports._removeComponent = _removeComponent;
exports._removeGameObject = _removeGameObject;
exports.remove = remove;
/* No side effect */
