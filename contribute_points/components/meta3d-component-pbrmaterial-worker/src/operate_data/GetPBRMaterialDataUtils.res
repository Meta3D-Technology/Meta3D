open StateType

let getData = (.
  {diffuseColors, speculars} as state,
  material,
  dataName: Meta3dEngineCoreProtocol.ComponentContributeType.dataName,
): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName if dataName == Meta3dComponentPbrmaterialWorkerProtocol.Index.dataName.diffuseColor =>
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getDiffuseColor(
      material,
      diffuseColors,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentPbrmaterialWorkerProtocol.Index.dataName.specular =>
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getSpecular(material, speculars)
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
