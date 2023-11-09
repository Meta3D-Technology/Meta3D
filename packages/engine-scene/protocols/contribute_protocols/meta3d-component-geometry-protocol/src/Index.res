let componentName = "Geometry"

type dataName = {
  name:int,
  vertices: int,
  normals: int,
  texCoords: int,
  tangents: int,
  indices: int,
  indicesCount: int,
}

let dataName = {
  name:0,
  vertices: 1,
  normals: 2,
  texCoords: 3,
  tangents: 4,
  indices: 5,
  indicesCount: 6,
}

type geometry = Meta3dComponentGeometryProtocolCommon.Index.geometry

type config = {
  isDebug: bool,
  geometryCount: int,
  geometryPointCount: int,
}

type state = {
  buffer: Js.Typed_array.ArrayBuffer.t,
  config: config,
  mutable gameObjectsMap: Meta3dCommonlibType.ComponentType.gameObjectsMap,
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
