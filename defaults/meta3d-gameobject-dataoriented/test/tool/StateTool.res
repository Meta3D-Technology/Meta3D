let createState = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    StateType.state,
    Meta3dGameobjectProtocol.Index.config,
    Meta3dGameobjectProtocol.Index.gameObject,
  >,
  ~isDebug=false,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
  })
}
