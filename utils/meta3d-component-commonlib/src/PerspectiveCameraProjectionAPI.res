open Meta3dEngineCoreSceneviewProtocol.ServiceType

let _getAspect = (usedComponentContribute, {getComponentData}, cameraProjection) => {
  getComponentData(
    usedComponentContribute,
    cameraProjection,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.aspect->Obj.magic,
  )
  ->Obj.magic
  ->Meta3dCommonlib.OptionSt.fromNullable
}

let _getFovy = (usedComponentContribute, {getComponentData},cameraProjection) => {
  getComponentData(
    usedComponentContribute,
    cameraProjection,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.fovy->Obj.magic,
  )
  ->Obj.magic
  ->Meta3dCommonlib.OptionSt.fromNullable
}

let _getNear = (usedComponentContribute, {getComponentData},cameraProjection) => {
  getComponentData(
    usedComponentContribute,
    cameraProjection,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near->Obj.magic,
  )
  ->Obj.magic
  ->Meta3dCommonlib.OptionSt.fromNullable
}

let _getFar = (usedComponentContribute, {getComponentData},cameraProjection) => {
  getComponentData(
    usedComponentContribute,
    cameraProjection,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.far->Obj.magic,
  )
  ->Obj.magic
  ->Meta3dCommonlib.OptionSt.fromNullable
}

let _getFovy = (usedComponentContribute, {getComponentData},cameraProjection) => {
  getComponentData(
    usedComponentContribute,
    cameraProjection,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.fovy->Obj.magic,
  )
  ->Meta3dCommonlib.OptionSt.fromNullable
  ->Obj.magic
}

let _setPMatrix = (usedComponentContribute, {setComponentData},cameraProjection, pMatrix) => {
  setComponentData(
    usedComponentContribute,
    cameraProjection,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix->Obj.magic,
    pMatrix->Obj.magic,
  )
}

let updatePerspectiveCameraProjection = (
  usedComponentContribute,
  engineCoreService,
  isDebug,
  cameraProjection: Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection,
  canvasSize,
) => {
  let cameraProjection = cameraProjection->VOTypeConvert.perspectiveCameraProjectionToComponent

  let aspect =
    _getAspect(usedComponentContribute,engineCoreService, cameraProjection)->Meta3dCommonlib.OptionSt.getWithDefault(
      FrustumPerspectiveCameraProjectionService.computeAspect(canvasSize),
    )

  switch (
    _getFovy(usedComponentContribute, engineCoreService,cameraProjection),
    _getNear(usedComponentContribute, engineCoreService,cameraProjection),
    _getFar(usedComponentContribute, engineCoreService,cameraProjection),
  ) {
  | (Some(fovy), Some(near), Some(far)) =>
    Meta3dCommonlib.Matrix4.createIdentityMatrix4()
    ->Meta3dCommonlib.Matrix4.buildPerspective(isDebug, (fovy, aspect, near, far))
    ->_setPMatrix(usedComponentContribute, engineCoreService,cameraProjection, _)
  | (_, _, _) =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Log.buildFatalMessage(
        ~title="update",
        ~description=j`fovy,near,far should all exist`,
        ~reason="",
        ~solution=j``,
        ~params=j`cameraProjection: $cameraProjection`,
      ),
    )
  }
}
