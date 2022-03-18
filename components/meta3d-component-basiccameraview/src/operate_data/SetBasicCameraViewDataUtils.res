open StateType

let setData = (.
  state,
  cameraView,
  dataName: Meta3dComponentBasiccameraviewProtocol.Index.dataNameType,
  dataValue: Meta3dEngineCoreProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == Meta3dComponentBasiccameraviewProtocol.Index.dataName.active =>
    OperateBasicCameraViewUtils.setIsActive(state, cameraView, dataValue->Obj.magic)
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Log.buildFatalMessage(
        ~title="setData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}