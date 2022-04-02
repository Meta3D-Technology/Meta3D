open StateType

let getData = (.
  {localToWorldMatrices} as state,
  transform,
  dataName: Meta3dEngineCoreProtocol.ComponentContributeType.dataName,
): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName if dataName == Meta3dComponentTransformWorkerProtocol.Index.dataName.localToWorldMatrix =>
    Meta3dComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
      localToWorldMatrices,
      transform,
    )
    ->Obj.magic
    ->Js.Nullable.return
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
