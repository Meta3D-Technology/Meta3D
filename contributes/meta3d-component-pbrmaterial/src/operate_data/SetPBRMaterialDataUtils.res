open StateType

let setData = (.
  {
    diffuseColors,
    speculars,
    specularColors,
    roughnesses,
    metalnesses,
    transmissions,
    iors,
    diffuseMap,
    roughnessMap,
    metalnessMap,
    normalMap,
  } as state,
  material,
  dataName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor =>
    OperateTypeArrayPBRMaterialUtils.setDiffuseColor(material, dataValue->Obj.magic, diffuseColors)
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.specular =>
    OperateTypeArrayPBRMaterialUtils.setSpecular(material, dataValue->Obj.magic, speculars)
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.specularColor =>
    OperateTypeArrayPBRMaterialUtils.setSpecularColor(
      material,
      dataValue->Obj.magic,
      specularColors,
    )
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.roughness =>
    OperateTypeArrayPBRMaterialUtils.setRoughness(material, dataValue->Obj.magic, roughnesses)
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.metalness =>
    OperateTypeArrayPBRMaterialUtils.setMetalness(material, dataValue->Obj.magic, metalnesses)
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.transmission =>
    OperateTypeArrayPBRMaterialUtils.setTransmission(material, dataValue->Obj.magic, transmissions)
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.ior =>
    OperateTypeArrayPBRMaterialUtils.setIOR(material, dataValue->Obj.magic, iors)
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseMap =>
    diffuseMap->Meta3dCommonlib.MutableSparseMap.set(material, dataValue->Obj.magic)->ignore
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.roughnessMap =>
    roughnessMap->Meta3dCommonlib.MutableSparseMap.set(material, dataValue->Obj.magic)->ignore
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.metalnessMap =>
    metalnessMap->Meta3dCommonlib.MutableSparseMap.set(material, dataValue->Obj.magic)->ignore
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.normalMap =>
    normalMap->Meta3dCommonlib.MutableSparseMap.set(material, dataValue->Obj.magic)->ignore
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
