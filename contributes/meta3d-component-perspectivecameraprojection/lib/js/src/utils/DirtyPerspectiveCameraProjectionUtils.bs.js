'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Contract$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/Contract.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");
var ConfigUtils$Meta3dComponentPerspectivecameraprojection = require("../config/ConfigUtils.bs.js");

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

exports.mark = mark;
exports.isDirty = isDirty;
/* No side effect */
