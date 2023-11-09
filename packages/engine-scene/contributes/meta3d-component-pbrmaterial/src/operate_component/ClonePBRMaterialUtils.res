open StateType

let _setData = (
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
  clonedMaterial,
  (
    name,
    diffuseColor,
    specular,
    specularColor,
    roughness,
    metalness,
    transmission,
    ior,
    diffuseTexture,
    roughnessTexture,
    metalnessTexture,
    normalTexture,
  ),
) => {
  OperateTypeArrayPBRMaterialUtils.setDiffuseColor(
    clonedMaterial,
    diffuseColor->Obj.magic,
    diffuseColors,
  )
  OperateTypeArrayPBRMaterialUtils.setSpecular(clonedMaterial, specular->Obj.magic, speculars)
  OperateTypeArrayPBRMaterialUtils.setSpecularColor(
    clonedMaterial,
    specular->Obj.magic,
    specularColors,
  )
  OperateTypeArrayPBRMaterialUtils.setRoughness(clonedMaterial, specular->Obj.magic, roughnesses)
  OperateTypeArrayPBRMaterialUtils.setMetalness(clonedMaterial, specular->Obj.magic, metalnesses)
  OperateTypeArrayPBRMaterialUtils.setTransmission(
    clonedMaterial,
    specular->Obj.magic,
    transmissions,
  )
  OperateTypeArrayPBRMaterialUtils.setIOR(clonedMaterial, specular->Obj.magic, iors)
  diffuseTexture
  ->Meta3dCommonlib.OptionSt.map(diffuseTexture =>
    diffuseMap->Meta3dCommonlib.MutableSparseMap.set(clonedMaterial, diffuseTexture)
  )
  ->ignore
  roughnessTexture
  ->Meta3dCommonlib.OptionSt.map(roughnessTexture =>
    roughnessMap->Meta3dCommonlib.MutableSparseMap.set(clonedMaterial, roughnessTexture)
  )
  ->ignore
  metalnessTexture
  ->Meta3dCommonlib.OptionSt.map(metalnessTexture =>
    metalnessMap->Meta3dCommonlib.MutableSparseMap.set(clonedMaterial, metalnessTexture)
  )
  ->ignore
  normalTexture
  ->Meta3dCommonlib.OptionSt.map(normalTexture =>
    normalMap->Meta3dCommonlib.MutableSparseMap.set(clonedMaterial, normalTexture)
  )
  ->ignore


  name
  ->Meta3dCommonlib.OptionSt.map(name => {
    SetPBRMaterialDataUtils.setName(state, clonedMaterial, name)
  })
  ->Meta3dCommonlib.OptionSt.getWithDefault(state)
}

let _getData = (
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
  sourceMaterial,
) => {
  (
    GetPBRMaterialDataUtils.getName(state, sourceMaterial)->Meta3dCommonlib.OptionSt.fromNullable,
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getDiffuseColor(
      sourceMaterial,
      diffuseColors,
    ),
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getSpecular(
      sourceMaterial,
      speculars,
    ),
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getSpecularColor(
      sourceMaterial,
      specularColors,
    ),
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getRoughness(
      sourceMaterial,
      roughnesses,
    ),
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getMetalness(
      sourceMaterial,
      metalnesses,
    ),
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getTransmission(
      sourceMaterial,
      transmissions,
    ),
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getIOR(sourceMaterial, iors),
    diffuseMap->Meta3dCommonlib.MutableSparseMap.get(sourceMaterial),
    roughnessMap->Meta3dCommonlib.MutableSparseMap.get(sourceMaterial),
    metalnessMap->Meta3dCommonlib.MutableSparseMap.get(sourceMaterial),
    normalMap->Meta3dCommonlib.MutableSparseMap.get(sourceMaterial),
  )
}

let _handleShareMaterial = (state, sourceMaterial, countRange) => (
  state,
  countRange->Js.Array.map(_ => sourceMaterial, _),
)

let _handleNotShareMaterial = (state, sourceMaterial, countRange) => {
  Meta3dCommonlib.CloneUtils.clone(
    state,
    (CreatePBRMaterialUtils.create, _getData, _setData),
    countRange,
    sourceMaterial,
  )
}

let clone = (
  state,
  countRange,
  {isShare}: Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
  sourceMaterial,
) => {
  isShare
    ? _handleShareMaterial(state, sourceMaterial, countRange)
    : _handleNotShareMaterial(state, sourceMaterial, countRange)
}
