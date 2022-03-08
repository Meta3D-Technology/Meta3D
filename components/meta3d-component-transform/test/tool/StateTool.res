let createState = (
  ~contribute: Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    Meta3dComponentTransformProtocol.Index.state,
    Meta3dComponentTransformProtocol.Index.config,
    Meta3dComponentTransformProtocol.Index.dataNameType,
    Meta3dComponentTransformProtocol.Index.transform,
  >,
  ~isDebug=false,
  ~transformCount=10,
  ~float9Array1=Meta3dCommonlib.Matrix3.createIdentityMatrix3(),
  ~float32Array1=Meta3dCommonlib.Matrix4.createIdentityMatrix4(),
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
    transformCount: transformCount,
    float9Array1: float9Array1,
    float32Array1: float32Array1,
  })
}
