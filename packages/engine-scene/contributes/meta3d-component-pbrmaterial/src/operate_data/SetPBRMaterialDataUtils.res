open StateType

let setName = (state, material, name) => {
  let {names} = state

  {
    ...state,
    names: names->Meta3dCommonlib.ImmutableSparseMap.set(material, name),
  }
}

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
  dataName: Meta3dEngineCoreProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.name =>
    setName(state, material, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor =>
    OperateTypeArrayPBRMaterialUtils.setDiffuseColor(material, dataValue->Obj.magic, diffuseColors)

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.specular =>
    OperateTypeArrayPBRMaterialUtils.setSpecular(material, dataValue->Obj.magic, speculars)

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.specularColor =>
    OperateTypeArrayPBRMaterialUtils.setSpecularColor(
      material,
      dataValue->Obj.magic,
      specularColors,
    )

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.roughness =>
    OperateTypeArrayPBRMaterialUtils.setRoughness(material, dataValue->Obj.magic, roughnesses)

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.metalness =>
    OperateTypeArrayPBRMaterialUtils.setMetalness(material, dataValue->Obj.magic, metalnesses)

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.transmission =>
    OperateTypeArrayPBRMaterialUtils.setTransmission(material, dataValue->Obj.magic, transmissions)

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.ior =>
    OperateTypeArrayPBRMaterialUtils.setIOR(material, dataValue->Obj.magic, iors)

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseMap =>
    diffuseMap->Meta3dCommonlib.MutableSparseMap.set(material, dataValue->Obj.magic)->ignore

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.roughnessMap =>
    roughnessMap->Meta3dCommonlib.MutableSparseMap.set(material, dataValue->Obj.magic)->ignore

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.metalnessMap =>
    metalnessMap->Meta3dCommonlib.MutableSparseMap.set(material, dataValue->Obj.magic)->ignore

    state
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.normalMap =>
    normalMap->Meta3dCommonlib.MutableSparseMap.set(material, dataValue->Obj.magic)->ignore

    state
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
