let createState = (): Meta3dEngineCoreProtocol.StateType.state => {
  allRegisteredWorkPluginContribute: list{},
  states: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  pluginData: {
    isDebug: false,
  },
  componentData: {
    allRegisteredComponentData: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    allUsedComponentData: Meta3dCommonlib.MutableHashMap.createEmpty(),
  },
  gameObjectContribute: None,
  usedGameObjectData: None,
}
