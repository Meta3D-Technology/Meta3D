let createState = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    StateType.state,
  >,
  ~isDebug=false,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
  })
}
