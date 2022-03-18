'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

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
          gameObjectArcballCameraControllerMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

exports.createState = createState;
/* No side effect */
