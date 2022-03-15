let createState = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    StateType.state,
    Meta3dEngineCoreProtocol.ComponentType.transformState,
    Meta3dEngineCoreProtocol.ComponentType.pbrMaterialState,
    Meta3dEngineCoreProtocol.ComponentType.geometryState,
  >,
  ~isDebug=false,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
  })
}
