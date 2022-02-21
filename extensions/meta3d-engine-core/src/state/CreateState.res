let createState = (): Meta3dEngineCoreProtocol.StateType.state => {
  allRegisteredWorkPluginContribute: list{},
  states: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  pluginData: {
    isDebug: false,
  },
  componentContributeData: {
    allComponentContributes: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    allUsedComponentContributes: Meta3dCommonlib.MutableHashMap.createEmpty(),
  },
  gameObjectContribute: None,
  usedGameObjectData: None,
}
