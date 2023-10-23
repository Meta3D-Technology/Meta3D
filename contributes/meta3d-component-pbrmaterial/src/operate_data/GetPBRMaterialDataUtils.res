open StateType

let getName = (state, material) =>
  state.names->Meta3dCommonlib.ImmutableSparseMap.getNullable(material)

let getData = (.
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
  dataName: int,
): 'a => {
  switch dataName {
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.name =>
    getName(state, material)->Obj.magic
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
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.specularColor =>
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getSpecularColor(
      material,
      specularColors,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.roughness =>
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getRoughness(material, roughnesses)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.metalness =>
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getMetalness(material, metalnesses)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.transmission =>
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getTransmission(
      material,
      transmissions,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.ior =>
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getIOR(material, iors)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseMap =>
    diffuseMap
    ->Meta3dCommonlib.MutableSparseMap.get(material)
    ->Obj.magic
    ->Meta3dCommonlib.OptionSt.toNullable
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.roughnessMap =>
    roughnessMap
    ->Meta3dCommonlib.MutableSparseMap.get(material)
    ->Obj.magic
    ->Meta3dCommonlib.OptionSt.toNullable
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.metalnessMap =>
    metalnessMap
    ->Meta3dCommonlib.MutableSparseMap.get(material)
    ->Obj.magic
    ->Meta3dCommonlib.OptionSt.toNullable
  | dataName if dataName == Meta3dComponentPbrmaterialProtocol.Index.dataName.normalMap =>
    normalMap
    ->Meta3dCommonlib.MutableSparseMap.get(material)
    ->Obj.magic
    ->Meta3dCommonlib.OptionSt.toNullable
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
