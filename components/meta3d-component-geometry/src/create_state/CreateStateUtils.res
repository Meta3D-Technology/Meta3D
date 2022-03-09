let _initBufferData = (geometryPointCount, geometryCount) => {
  let buffer = Meta3dComponentWorkerUtils.BufferGeometryUtils.createBuffer(
    geometryPointCount,
    geometryCount,
  )

  (
    buffer,
    Meta3dComponentWorkerUtils.CreateTypeArrayGeometryUtils.createTypeArrays(
      buffer,
      geometryPointCount,
      geometryCount,
    ),
  )
}

let createStateWithSharedArrayBufferData = (
  (isDebug, geometryPointCount, geometryCount),
  {
    buffer,
    vertices,
    texCoords,
    normals,
    tangents,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    tangentsInfos,
    indicesInfos,
  }: GeometrySharedArrayBufferDataType.geometrySharedArrayBufferData,
): Meta3dComponentGeometryProtocol.Index.state => {
  {
    config: {
      isDebug: isDebug,
      geometryPointCount: geometryPointCount,
      geometryCount: geometryCount,
    },
    maxIndex: 0,
    buffer: buffer,
    vertices: vertices,
    texCoords: texCoords,
    normals: normals,
    tangents: tangents,
    indices: indices,
    verticesInfos: verticesInfos,
    texCoordsInfos: texCoordsInfos,
    normalsInfos: normalsInfos,
    tangentsInfos: tangentsInfos,
    indicesInfos: indicesInfos,
    verticesOffset: 0,
    texCoordsOffset: 0,
    normalsOffset: 0,
    tangentsOffset: 0,
    indicesOffset: 0,
    gameObjectsMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(geometryCount),
    gameObjectGeometryMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(
      geometryCount,
    ),
  }
}

let createState = (isDebug, geometryPointCount, geometryCount) => {
  let (
    buffer,
    (
      vertices,
      texCoords,
      normals,
      tangents,
      indices,
      verticesInfos,
      texCoordsInfos,
      normalsInfos,
      tangentsInfos,
      indicesInfos,
    ),
  ) = _initBufferData(geometryPointCount, geometryCount)

  createStateWithSharedArrayBufferData(
    (isDebug, geometryPointCount, geometryCount),
    {
      buffer: buffer,
      vertices: vertices,
      texCoords: texCoords,
      normals: normals,
      tangents: tangents,
      indices: indices,
      verticesInfos: verticesInfos,
      texCoordsInfos: texCoordsInfos,
      normalsInfos: normalsInfos,
      tangentsInfos: tangentsInfos,
      indicesInfos: indicesInfos,
    },
  )
}
