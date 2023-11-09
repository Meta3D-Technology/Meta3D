let setAllTypeArrDataToDefault = (
  (colors, intensities),
  count,
  (defaultColor, defaultIntensity),
) => {
  Meta3dCommonlib.ListSt.range(0, count - 1)->Meta3dCommonlib.ListSt.forEach(index => {
    OperateTypeArrayDirectionLightUtils.setColor(index, defaultColor, colors)
    OperateTypeArrayDirectionLightUtils.setIntensity(index, defaultIntensity, intensities)
  })

  (colors, intensities)
}

let _initBufferData = (count, defaultDataTuple) => {
  let buffer = Meta3dComponentWorkerUtils.BufferDirectionLightUtils.createBuffer(count)

  let typeArrData =
    Meta3dComponentWorkerUtils.CreateTypeArrayDirectionLightUtils.createTypeArrays(
      buffer,
      count,
    )->setAllTypeArrDataToDefault(count, defaultDataTuple)

  (buffer, typeArrData)
}

let createStateWithSharedArrayBufferData = (
  (isDebug, lightCount),
  {
    buffer,
    colors,
    intensities,
  }: DirectionLightSharedArrayBufferDataType.directionLightSharedArrayBufferData,
): StateType.state => {
  {
    config: {
      isDebug,
      directionLightCount: lightCount,
    },
    maxIndex: 0,
    buffer,
    colors,
    intensities,
    gameObjectMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(lightCount),
    gameObjectDirectionLightMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(lightCount),
    needDisposedDirectionLights: [],
    disposedDirectionLights: [],
    names: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  }
}

let getDefaultData = () => {
  let defaultColor = (1., 1., 1.)
  let defaultIntensity = 1.0

  (defaultColor, defaultIntensity)
}

let createState = (isDebug, lightCount) => {
  let (buffer, (colors, intensities)) = _initBufferData(lightCount, getDefaultData())

  createStateWithSharedArrayBufferData(
    (isDebug, lightCount),
    {
      buffer,
      colors,
      intensities,
    },
  )
}
