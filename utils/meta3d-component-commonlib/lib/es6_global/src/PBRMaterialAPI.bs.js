

import * as ArrayMapUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as DisposeSharedComponentUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeSharedComponentUtils.bs.js";

function isActuallyDispose(state, material, gameObjects) {
  return !DisposeSharedComponentUtils$Meta3dCommonlib.isComponentHasGameObject(ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr(MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectsMap), material, gameObjects), material, gameObjects);
}

export {
  isActuallyDispose ,
}
/* No side effect */
