let createState = (
  ~contribute: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentDirectionlightProtocol.Index.config,
    
    Meta3dComponentDirectionlightProtocol.Index.needDisposedComponents,
    Meta3dComponentDirectionlightProtocol.Index.batchDisposeData,
    Meta3dComponentDirectionlightProtocol.Index.cloneConfig,
    Meta3dComponentDirectionlightProtocol.Index.directionLight,
  >,
  ~isDebug=false,
  ~directionLightCount=10,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
    directionLightCount: directionLightCount,
  })
}
