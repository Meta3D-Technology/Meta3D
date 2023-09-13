let setAllInfosDataToDefault =
    (
      (verticesInfos, texCoordsInfos, normalsInfos, tangentsInfos, indicesInfos),
      geometryCount: int,
    ) => (
  verticesInfos
  |> Js.Typed_array.Uint32Array.fillRangeInPlace(
       0,
       ~start=0,
       ~end_=geometryCount * Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoSize(),
     ),
  texCoordsInfos
  |> Js.Typed_array.Uint32Array.fillRangeInPlace(
       0,
       ~start=0,
       ~end_=geometryCount * Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoSize(),
     ),
  normalsInfos
  |> Js.Typed_array.Uint32Array.fillRangeInPlace(
       0,
       ~start=0,
       ~end_=geometryCount * Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoSize(),
     ),
  tangentsInfos
  |> Js.Typed_array.Uint32Array.fillRangeInPlace(
       0,
       ~start=0,
       ~end_=geometryCount * Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoSize(),
     ),
  indicesInfos
  |> Js.Typed_array.Uint32Array.fillRangeInPlace(
       0,
       ~start=0,
       ~end_=geometryCount * Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoSize(),
     ),
);


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
): StateType.state => {
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
    gameObjectGeometryMap: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(geometryCount),
    needDisposedGeometrys: Meta3dCommonlib.CreateMapComponentUtils.createEmptyMap(
      geometryCount,
    ),
    disposedGeometrys: [],
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
