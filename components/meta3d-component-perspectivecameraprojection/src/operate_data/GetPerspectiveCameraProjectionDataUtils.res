open StateType

let getData = (. state, cameraProjection, dataName: Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataNameType): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix =>
    OperatePerspectiveCameraProjectionUtils.getPMatrix(state, cameraProjection)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.fovy =>
    OperatePerspectiveCameraProjectionUtils.getFovy(state, cameraProjection)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.aspect =>
    OperatePerspectiveCameraProjectionUtils.getAspect(state, cameraProjection)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.far =>
    OperatePerspectiveCameraProjectionUtils.getFar(state, cameraProjection)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near =>
    OperatePerspectiveCameraProjectionUtils.getNear(state, cameraProjection)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.dirty =>
    DirtyPerspectiveCameraProjectionUtils.isDirty(state, cameraProjection)
    ->Obj.magic
    ->Meta3dCommonlib.OptionSt.toNullable
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Log.buildFatalMessage(
        ~title="getData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
