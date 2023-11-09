'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function add(state, gameObject, cameraProjection) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: ImmutableSparseMap$Meta3dCommonlib.set(state.gameObjectMap, cameraProjection, gameObject),
          gameObjectPerspectiveCameraProjectionMap: ImmutableSparseMap$Meta3dCommonlib.set(state.gameObjectPerspectiveCameraProjectionMap, gameObject, cameraProjection),
          needDisposedPerspectiveCameraProjections: state.needDisposedPerspectiveCameraProjections,
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections,
          names: state.names
        };
}

exports.add = add;
/* No side effect */
