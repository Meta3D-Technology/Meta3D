let componentName = "Geometry"

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

type geometry = Meta3dComponentGeometryCommonProtocol.Index.geometry

type config = {
  isDebug: bool,
  geometryCount: int,
  geometryPointCount: int,
}

type needDisposedComponents = Meta3dCommonlibType.MutableSparseMapType.t<
  geometry,
  array<Meta3dGameobjectProtocol.Index.gameObject>,
>

type batchDisposeData = Meta3dCommonlibType.MutableSparseMapType.t<
  geometry,
  array<Meta3dGameobjectProtocol.Index.gameObject>,
>

type cloneConfig = unit
