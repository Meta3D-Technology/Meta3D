'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function createState(isDebug) {
  return {
          config: {
            isDebug: isDebug
          },
          maxIndex: 0,
          dirtyMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          pMatrixMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          nearMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          farMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          fovyMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          aspectMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          gameObjectMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          gameObjectPerspectiveCameraProjectionMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          needDisposedPerspectiveCameraProjections: [],
          disposedPerspectiveCameraProjections: []
        };
}

exports.createState = createState;
/* No side effect */
