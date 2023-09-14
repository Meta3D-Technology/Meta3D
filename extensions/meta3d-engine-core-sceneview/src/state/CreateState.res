let createState = (): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
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
  usedGameObjectContribute: None,
}
