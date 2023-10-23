open StateType

let getData = (. state, cameraView, dataName: int): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName if dataName == Meta3dComponentBasiccameraviewProtocol.Index.dataName.name =>
    OperateBasicCameraViewUtils.getName(state, cameraView)->Obj.magic
  | dataName if dataName == Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive =>
    OperateBasicCameraViewUtils.getIsActive(state, cameraView)->Obj.magic->Js.Nullable.return
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildFatalMessage(
          ~title="getData",
          ~description=j`unknown dataName:${dataName->Obj.magic}`,
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}
