open StateType

let createState = (isDebug: bool) => {
  {
    config: {
      isDebug: isDebug,
    },
    maxIndex: 0,
    attributeMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    eventFileStrMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectScriptMap: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    needDisposedScripts: [],
    disposedScripts: [],
    names: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  }
}
