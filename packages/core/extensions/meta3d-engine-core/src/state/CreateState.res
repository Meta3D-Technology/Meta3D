let createState = (): Meta3dEngineCoreProtocol.StateType.state => {
  allRegisteredPipelineContribute: list{},
  states: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  contributeData: {
    isDebug: false,
  },
  componentContributeData: {
    allComponentContributes: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    allUsedComponentContributes: Meta3dCommonlib.MutableHashMap.createEmpty(),
  },
  gameObjectContribute: None,
  // groupStatusData: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  usedGameObjectContribute: None,
}
