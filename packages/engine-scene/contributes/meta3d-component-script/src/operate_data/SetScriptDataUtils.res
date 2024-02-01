open StateType

let setData = (.
  state,
  script,
  dataName: Meta3dEngineCoreProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == Meta3dComponentScriptProtocol.Index.dataName.name =>
    OperateScriptUtils.setName(state, script, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentScriptProtocol.Index.dataName.attribute =>
    OperateScriptUtils.setAttribute(state, script, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentScriptProtocol.Index.dataName.eventFileStr =>
    OperateScriptUtils.setEventFileStr(state, script, dataValue->Obj.magic)
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
