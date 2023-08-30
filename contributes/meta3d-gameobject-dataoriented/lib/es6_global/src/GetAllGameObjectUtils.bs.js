

import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeComponentUtils.bs.js";
import * as GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented from "./GetNeedDisposedGameObjectsUtils.bs.js";

function getAll(state) {
  return DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(ArraySt$Meta3dCommonlib.range(0, state.maxUID - 1 | 0), GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented.get(state)), state.disposedGameObjectArray);
}

export {
  getAll ,
}
/* No side effect */
