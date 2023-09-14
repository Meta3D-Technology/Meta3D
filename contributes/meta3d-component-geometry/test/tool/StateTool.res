let createState = (
  ~contribute: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentGeometryProtocol.Index.config,
    
    Meta3dComponentGeometryProtocol.Index.needDisposedComponents,
    Meta3dComponentGeometryProtocol.Index.batchDisposeData,
    Meta3dComponentGeometryProtocol.Index.cloneConfig,
    Meta3dComponentGeometryProtocol.Index.geometry,
  >,
  ~isDebug=false,
  ~geometryCount=10,
  ~geometryPointCount=10,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
    geometryCount: geometryCount,
    geometryPointCount: geometryPointCount,
  })
}
