open StateType

let getData = (. state, script, dataName: int): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName if dataName == Meta3dComponentScriptProtocol.Index.dataName.name =>
    OperateScriptUtils.getName(state, script)->Obj.magic
  | dataName if dataName == Meta3dComponentScriptProtocol.Index.dataName.attribute =>
    OperateScriptUtils.getAttribute(state, script)->Meta3dCommonlib.OptionSt.toNullable->Obj.magic
  | dataName if dataName == Meta3dComponentScriptProtocol.Index.dataName.allAssetData =>
    OperateScriptUtils.getAllAssetData(state, script)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
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
