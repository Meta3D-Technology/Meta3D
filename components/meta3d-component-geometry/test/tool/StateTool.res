let createState = (
  ~contribute: Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentGeometryProtocol.Index.config,
    Meta3dComponentGeometryProtocol.Index.dataNameType,
    Meta3dComponentGeometryProtocol.Index.needDisposedComponents,
    Meta3dComponentGeometryProtocol.Index.batchDisposeData,
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
