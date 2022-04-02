let createState = (
  ~contribute: Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.config,
    
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.needDisposedComponents,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.batchDisposeData,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.cloneConfig,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection,
  >,
  ~isDebug=false,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
  })
}
