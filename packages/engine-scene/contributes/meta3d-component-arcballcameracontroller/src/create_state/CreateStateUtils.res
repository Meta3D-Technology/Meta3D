open StateType

let createState = (isDebug: bool) => {
  {
    config: {
      isDebug: isDebug,
    },
    maxIndex: 0,
    dirtyMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    distanceMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    minDistanceMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    phiMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    thetaMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    thetaMarginMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    targetMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    moveSpeedXMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    moveSpeedYMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    rotateSpeedMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    wheelSpeedMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectArcballCameraControllerMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    needDisposedArcballCameraControllers: [],
    disposedArcballCameraControllers: [],
    names: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  }
}
