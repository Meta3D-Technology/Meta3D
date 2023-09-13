let setAllTypeArrDataToDefault = (
  (diffuseColors, speculars, specularColors, roughnesses, metalnesses, transmissions, iors),
  count,
  (
    defaultDiffuseColor,
    defaultSpecular,
    defaultSpecularColor,
    defaultRoughness,
    defaultMetalness,
    defaultTransmission,
    defaultIOR,
  ),
) => {
  Meta3dCommonlib.ListSt.range(0, count - 1)->Meta3dCommonlib.ListSt.forEach(index => {
    OperateTypeArrayPBRMaterialUtils.setDiffuseColor(index, defaultDiffuseColor, diffuseColors)
    OperateTypeArrayPBRMaterialUtils.setSpecular(index, defaultSpecular, speculars)
    OperateTypeArrayPBRMaterialUtils.setSpecularColor(index, defaultSpecularColor, specularColors)
    OperateTypeArrayPBRMaterialUtils.setRoughness(index, defaultRoughness, roughnesses)
    OperateTypeArrayPBRMaterialUtils.setMetalness(index, defaultMetalness, metalnesses)
    OperateTypeArrayPBRMaterialUtils.setTransmission(index, defaultTransmission, transmissions)
    OperateTypeArrayPBRMaterialUtils.setIOR(index, defaultIOR, iors)
  })

  (diffuseColors, speculars, specularColors, roughnesses, metalnesses, transmissions, iors)
}

let _initBufferData = (count, defaultDataTuple) => {
  let buffer = Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.createBuffer(count)

  let typeArrData =
    Meta3dComponentWorkerUtils.CreateTypeArrayPBRMaterialUtils.createTypeArrays(
      buffer,
      count,
    )->setAllTypeArrDataToDefault(count, defaultDataTuple)

  (buffer, typeArrData)
}

let createStateWithSharedArrayBufferData = (
  (isDebug, pbrMaterialCount),
  (
    defaultDiffuseColor,
    defaultSpecular,
    defaultSpecularColor,
    defaultRoughness,
    defaultMetalness,
    defaultTransmission,
    defaultIOR,
  ),
  {
    buffer,
    diffuseColors,
    speculars,
    specularColors,
    roughnesses,
    metalnesses,
    transmissions,
    iors,
  }: PBRMaterialSharedArrayBufferDataType.pbrMaterialSharedArrayBufferData,
): StateType.state => {
  {
    config: {
      isDebug,
      pbrMaterialCount,
    },
    maxIndex: 0,
    buffer,
    diffuseColors,
    speculars,
    specularColors,
    roughnesses,
    metalnesses,
    transmissions,
    iors,
    defaultDiffuseColor,
    defaultSpecular,
    defaultSpecularColor,
    defaultRoughness,
    defaultMetalness,
    defaultTransmission,
    defaultIOR,
    gameObjectPBRMaterialMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(
      pbrMaterialCount,
    ),
    gameObjectsMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    diffuseMapMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    channelRoughnessMetallicMapMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(
      pbrMaterialCount,
    ),
    emissionMapMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    normalMapMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    transmissionMapMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    specularMapMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    needDisposedPBRMaterials: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(
      pbrMaterialCount,
    ),
    disposedPBRMaterials: [],
  }
}

let createState = (isDebug: bool, pbrMaterialCount: int) => {
  let defaultDiffuseColor = (1., 1., 1.)
  let defaultSpecular = 1.0
  let defaultSpecularColor = (1., 1., 1.)
  let defaultRoughness = 1.0
  let defaultMetalness = 1.0
  let defaultTransmission = 0.0
  let defaultIOR = 1.5

  let (
    buffer,
    (diffuseColors, speculars, specularColors, roughnesses, metalnesses, transmissions, iors),
  ) = _initBufferData(
    pbrMaterialCount,
    (
      defaultDiffuseColor,
      defaultSpecular,
      defaultSpecularColor,
      defaultRoughness,
      defaultMetalness,
      defaultTransmission,
      defaultIOR,
    ),
  )

  createStateWithSharedArrayBufferData(
    (isDebug, pbrMaterialCount),
    (
      defaultDiffuseColor,
      defaultSpecular,
      defaultSpecularColor,
      defaultRoughness,
      defaultMetalness,
      defaultTransmission,
      defaultIOR,
    ),
    {
      buffer,
      diffuseColors,
      speculars,
      specularColors,
      roughnesses,
      metalnesses,
      transmissions,
      iors,
    },
  )
}
