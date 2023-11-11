

import * as Log$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as ConfigUtils$Meta3dComponentPerspectivecameraprojection from "../config/ConfigUtils.bs.js";

function mark(state, cameraProjection, isDirty) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: ImmutableSparseMap$Meta3dCommonlib.set(state.dirtyMap, cameraProjection, isDirty),
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap,
          needDisposedPerspectiveCameraProjections: state.needDisposedPerspectiveCameraProjections,
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections,
          names: state.names
        };
}

function isDirty(state, cameraProjection) {
  return MutableSparseMap$Meta3dCommonlib.unsafeGet(state.dirtyMap, cameraProjection) === Contract$Meta3dCommonlib.ensureCheck(true, (function (isDirty) {
                Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("return bool", "not"), (function (param) {
                        return Contract$Meta3dCommonlib.assertIsBool(isDirty);
                      }));
              }), ConfigUtils$Meta3dComponentPerspectivecameraprojection.getIsDebug(state));
}

export {
  mark ,
  isDirty ,
}
/* No side effect */
