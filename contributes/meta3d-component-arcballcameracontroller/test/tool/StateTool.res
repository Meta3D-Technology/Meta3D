let createState = (
  ~contribute: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentArcballcameracontrollerProtocol.Index.config,
    
    Meta3dComponentArcballcameracontrollerProtocol.Index.needDisposedComponents,
    Meta3dComponentArcballcameracontrollerProtocol.Index.batchDisposeData,
    Meta3dComponentArcballcameracontrollerProtocol.Index.cloneConfig,
    Meta3dComponentArcballcameracontrollerProtocol.Index.arcballCameraController,
  >,
  ~isDebug=false,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
  })
}
