open StateType

let createState = (isDebug: bool) => {
  {
    config: {
      isDebug: isDebug,
    },
    maxIndex: 0,
    dirtyMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    pMatrixMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    nearMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    farMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    fovyMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    aspectMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectPerspectiveCameraProjectionMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    needDisposedPerspectiveCameraProjections: [],
    disposedPerspectiveCameraProjections: [],
  }
}
