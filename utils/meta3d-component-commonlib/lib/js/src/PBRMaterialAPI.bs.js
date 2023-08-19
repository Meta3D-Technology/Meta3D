'use strict';

var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var DisposeSharedComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeSharedComponentUtils.bs.js");

function isActuallyDispose(state, material, gameObjects) {
  return !DisposeSharedComponentUtils$Meta3dCommonlib.isComponentHasGameObject(ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr(MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectsMap), material, gameObjects), material, gameObjects);
}

exports.isActuallyDispose = isActuallyDispose;
/* No side effect */
