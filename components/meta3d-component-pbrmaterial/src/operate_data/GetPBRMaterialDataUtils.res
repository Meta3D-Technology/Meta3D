open StateType

let getData = (. {diffuseColors, speculars}, material, dataName: Meta3dComponentPbrmaterialProtocol.Index.dataNameType): 'a => {
  switch dataName {
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor =>
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getDiffuseColor(
      material,
      diffuseColors,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.specular =>
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getSpecular(material, speculars)
    ->Obj.magic
    ->Js.Nullable.return

  //   TODO finish more
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
