let componentName = "GeometryWorker"

type config = {
  isDebug: bool,
  geometryCount: int,
  geometryPointCount: int,
  buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,
}

type dataName = {
  vertices: int,
  normals: int,
  texCoords: int,
  tangents: int,
  indices: int,
  indicesCount: int,
}

let dataName = {
  vertices: 0,
  normals: 1,
  texCoords: 2,
  tangents: 3,
  indices: 4,
  indicesCount: 5,
}

type geometry = int

type needDisposedComponents = Meta3dCommonlibType.MutableSparseMapType.t<
  geometry,
  array<Meta3dGameobjectProtocol.Index.gameObject>,
>

type batchDisposeData = Meta3dCommonlibType.MutableSparseMapType.t<
  geometry,
  array<Meta3dGameobjectProtocol.Index.gameObject>,
>

type cloneConfig = ()