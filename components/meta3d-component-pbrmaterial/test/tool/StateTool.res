let createState = (
  ~contribute: Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentPbrmaterialProtocol.Index.config,
    Meta3dComponentPbrmaterialProtocol.Index.dataNameType,
    Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
    Meta3dComponentPbrmaterialProtocol.Index.deferDisposeData,
    Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
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
