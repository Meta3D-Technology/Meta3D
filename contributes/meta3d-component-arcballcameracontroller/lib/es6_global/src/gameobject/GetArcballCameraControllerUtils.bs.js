

import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function get(param, gameObject) {
  return ImmutableSparseMap$Meta3dCommonlib.unsafeGet(param.gameObjectArcballCameraControllerMap, gameObject);
}

export {
  get ,
}
/* No side effect */
