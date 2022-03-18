open StateType

let createState = (isDebug: bool) => {
  {
    config: {
      isDebug: isDebug,
    },
    maxIndex: 0,
    isActiveMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectBasicCameraViewMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  }
}
