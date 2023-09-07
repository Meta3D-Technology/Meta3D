

import * as ImmutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function get(param, cameraController) {
  var gameObject = ImmutableSparseMap$Meta3dCommonlib.get(param.gameObjectMap, cameraController);
  if (gameObject !== undefined) {
    return [gameObject];
  } else {
    return [];
  }
}

export {
  get ,
}
/* No side effect */
