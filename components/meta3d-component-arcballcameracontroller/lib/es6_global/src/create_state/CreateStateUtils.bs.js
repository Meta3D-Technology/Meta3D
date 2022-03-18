

import * as ImmutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function createState(isDebug) {
  return {
          config: {
            isDebug: isDebug
          },
          maxIndex: 0,
          gameObjectMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          dirtyMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          distanceMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          minDistanceMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          phiMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          thetaMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          thetaMarginMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          targetMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          moveSpeedXMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          moveSpeedYMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          rotateSpeedMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          wheelSpeedMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          gameObjectArcballCameraControllerMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          needDisposedArcballCameraControllers: [],
          disposedArcballCameraControllers: []
        };
}

export {
  createState ,
  
}
/* No side effect */
