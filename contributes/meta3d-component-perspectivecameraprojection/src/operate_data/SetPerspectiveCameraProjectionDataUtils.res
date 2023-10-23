open StateType

let setData = (.
  state,
  cameraProjection,
  dataName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.name =>
    OperatePerspectiveCameraProjectionUtils.setName(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix =>
    OperatePerspectiveCameraProjectionUtils.setPMatrix(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.fovy =>
    OperatePerspectiveCameraProjectionUtils.setFovy(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.aspect =>
    OperatePerspectiveCameraProjectionUtils.setAspect(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.far =>
    OperatePerspectiveCameraProjectionUtils.setFar(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near =>
    OperatePerspectiveCameraProjectionUtils.setNear(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.dirty =>
    DirtyPerspectiveCameraProjectionUtils.mark(state, cameraProjection, dataValue->Obj.magic)
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildFatalMessage(
          ~title="setData",
          ~description=j`unknown dataName:${dataName->Obj.magic}`,
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}
