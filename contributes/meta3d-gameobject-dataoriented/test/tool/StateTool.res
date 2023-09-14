let createState = (
  ~contribute: Meta3dEngineCoreSceneviewProtocol.GameObjectContributeType.gameObjectContribute<
    StateType.state,
  >,
  ~isDebug=false,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
  })
}
