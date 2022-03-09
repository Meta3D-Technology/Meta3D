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

type dataNameType = int

type geometry = int

type config = {
  isDebug: bool,
  geometryCount: int,
  geometryPointCount: int,
}

type state = {
  config: config,
  mutable maxIndex: Meta3dCommonlibType.ComponentType.index,
  buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,
  mutable vertices: Js.Typed_array.Float32Array.t,
  mutable texCoords: Js.Typed_array.Float32Array.t,
  mutable normals: Js.Typed_array.Float32Array.t,
  mutable tangents: Js.Typed_array.Float32Array.t,
  mutable indices: Js.Typed_array.Uint32Array.t,
  mutable verticesInfos: Js.Typed_array.Uint32Array.t,
  mutable texCoordsInfos: Js.Typed_array.Uint32Array.t,
  mutable normalsInfos: Js.Typed_array.Uint32Array.t,
  mutable tangentsInfos: Js.Typed_array.Uint32Array.t,
  mutable indicesInfos: Js.Typed_array.Uint32Array.t,
  mutable verticesOffset: int,
  mutable texCoordsOffset: int,
  mutable normalsOffset: int,
  mutable tangentsOffset: int,
  mutable indicesOffset: int,
  gameObjectsMap: Meta3dCommonlibType.ComponentType.gameObjectsMap,
  gameObjectGeometryMap: Meta3dCommonlibType.MutableSparseMapType.t<
    Meta3dEngineCoreProtocol.GameObjectContributeType.gameObject,
    geometry,
  >,
}
