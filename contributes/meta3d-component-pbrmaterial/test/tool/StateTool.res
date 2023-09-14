let createState = (
  ~contribute: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentPbrmaterialProtocol.Index.config,
    
    Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
    Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
    Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
    Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial,
  >,
  ~isDebug=false,
  ~pbrMaterialCount=10,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
    pbrMaterialCount: pbrMaterialCount,
  })
}
