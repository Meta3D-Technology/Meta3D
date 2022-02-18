let createPO = (): POType.po => {
  allRegisteredWorkPluginData: list{},
  states: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  pluginData: {
    isDebug: false,
  },
  componentData: {
    allRegisteredComponentData: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    allUsedComponentData: Meta3dCommonlib.MutableHashMap.createEmpty(),
  },
  gameObjectData: None,
  usedGameObjectData: None,
}
