open StateType

let setData = (.
  state,
  cameraView,
  dataName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == Meta3dComponentBasiccameraviewProtocol.Index.dataName.name =>
    OperateBasicCameraViewUtils.setName(state, cameraView, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive =>
    OperateBasicCameraViewUtils.setIsActive(state, cameraView, dataValue->Obj.magic)
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
