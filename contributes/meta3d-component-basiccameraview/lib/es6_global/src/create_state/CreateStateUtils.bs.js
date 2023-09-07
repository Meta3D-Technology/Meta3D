

import * as ImmutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function createState(isDebug) {
  return {
          config: {
            isDebug: isDebug
          },
          maxIndex: 0,
          isActiveMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          gameObjectMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          gameObjectBasicCameraViewMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          needDisposedBasicCameraViews: [],
          disposedBasicCameraViews: []
        };
}

export {
  createState ,
}
/* No side effect */
