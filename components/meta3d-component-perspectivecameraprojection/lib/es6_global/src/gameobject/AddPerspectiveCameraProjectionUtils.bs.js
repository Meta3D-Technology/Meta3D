

import * as ImmutableSparseMap$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

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
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections
        };
}

export {
  add ,
  
}
/* No side effect */
