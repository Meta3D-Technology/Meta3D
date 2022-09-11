open StateType

let setData = (.
  {diffuseColors, speculars} as state,
  material,
  dataName: Meta3dEngineCoreProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor =>
    OperateTypeArrayPBRMaterialUtils.setDiffuseColor(material, dataValue->Obj.magic, diffuseColors)
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.specular =>
    OperateTypeArrayPBRMaterialUtils.setSpecular(material, dataValue->Obj.magic, speculars)

  //   TODO finish more
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

  state
}
