let _setAllTypeArrDataToDefault = (
  (localToWorldMatrices, localPositions, localRotations, localScales),
  count,
  (defaultLocalToWorldMatrix, defaultLocalPosition, defaultLocalRotation, defaultLocalScale),
) => {
  Meta3dCommonlib.ListSt.range(0, count - 1)->Meta3dCommonlib.ListSt.forEach(index => {
    OperateTypeArrayTransformUtils.setLocalToWorldMatrix(
      index,
      defaultLocalToWorldMatrix,
      localToWorldMatrices,
    )
    OperateTypeArrayTransformUtils.setLocalPosition(index, defaultLocalPosition, localPositions)
    OperateTypeArrayTransformUtils.setLocalRotation(index, defaultLocalRotation, localRotations)
    OperateTypeArrayTransformUtils.setLocalScale(index, defaultLocalScale, localScales)
  })

  (localToWorldMatrices, localPositions, localRotations, localScales)
}

let _initBufferData = (count, defaultDataTuple) => {
  let buffer = Meta3dComponentWorkerUtils.BufferTransformUtils.createBuffer(count)

  let typeArrData =
    Meta3dComponentWorkerUtils.CreateTypeArrayTransformUtils.createTypeArrays(
      buffer,
      count,
    )->_setAllTypeArrDataToDefault(count, defaultDataTuple)

  (buffer, typeArrData)
}

let createStateWithSharedArrayBufferData = (
  (isDebug, transformCount, float9Array1, float32Array1),
  (defaultLocalToWorldMatrix, defaultLocalPosition, defaultLocalRotation, defaultLocalScale),
  {
    buffer,
    localToWorldMatrices,
    localPositions,
    localRotations,
    localScales,
  }: TransformSharedArrayBufferDataType.transformSharedArrayBufferData,
): StateType.state => {
  {
    config: {
      isDebug,
      transformCount,
      float9Array1,
      float32Array1,
    },
    maxIndex: 0,
    buffer,
    localToWorldMatrices,
    localPositions,
    localRotations,
    localScales,
    defaultLocalToWorldMatrix,
    defaultLocalPosition,
    defaultLocalRotation,
    defaultLocalScale,
    parentMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(transformCount),
    childrenMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(transformCount),
    gameObjectMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(transformCount),
    gameObjectTransformMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(transformCount),
    dirtyMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(transformCount),
    needDisposedTransforms: [],
    disposedTransforms: [],
  }
}

let createState = (isDebug, transformCount, float9Array1, float32Array1) => {
  let defaultLocalToWorldMatrix = (1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.)
  let defaultLocalPosition = (0., 0., 0.)
  let defaultLocalRotation = (0., 0., 0., 1.)
  let defaultLocalScale = (1., 1., 1.)

  let (
    buffer,
    (localToWorldMatrices, localPositions, localRotations, localScales),
  ) = _initBufferData(
    transformCount,
    (defaultLocalToWorldMatrix, defaultLocalPosition, defaultLocalRotation, defaultLocalScale),
  )

  createStateWithSharedArrayBufferData(
    (isDebug, transformCount, float9Array1, float32Array1),
    (defaultLocalToWorldMatrix, defaultLocalPosition, defaultLocalRotation, defaultLocalScale),
    {
      buffer,
      localToWorldMatrices,
      localPositions,
      localRotations,
      localScales,
    },
  )
}
