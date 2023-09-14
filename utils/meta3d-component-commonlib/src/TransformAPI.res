let lookAt = (
  ~data,
  ~engineCoreService: Meta3dEngineCoreSceneviewProtocol.ServiceType.service,
  ~transform: Meta3dComponentTransformProtocol.Index.transform,
  ~target,
  ~up=(0., 1., 0.),
  (),
) => {
  let transform = transform->VOTypeConvert.transformToComponent

  engineCoreService.setComponentData(
    data,
    transform,
    Meta3dComponentTransformProtocol.Index.dataName.rotation->Obj.magic,
    Meta3dCommonlib.Matrix4.setLookAt(
      engineCoreService.getComponentData(
        data,
        transform,
        Meta3dComponentTransformProtocol.Index.dataName.position->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->Obj.magic,
      target,
      up,
    )->Meta3dCommonlib.Quaternion.setFromMatrix,
  )
}
