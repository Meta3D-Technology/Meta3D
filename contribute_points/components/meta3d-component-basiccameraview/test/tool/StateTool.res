let createState = (
  ~contribute: Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentBasiccameraviewProtocol.Index.config,
    
    Meta3dComponentBasiccameraviewProtocol.Index.needDisposedComponents,
    Meta3dComponentBasiccameraviewProtocol.Index.batchDisposeData,
    Meta3dComponentBasiccameraviewProtocol.Index.cloneConfig,
    Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView,
  >,
  ~isDebug=false,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
  })
}
