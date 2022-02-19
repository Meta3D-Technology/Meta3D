let createState = (): Meta3dEngineCoreType.StateType.state => {
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
