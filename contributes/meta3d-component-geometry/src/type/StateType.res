type geometry = Meta3dComponentGeometryProtocol.Index.geometry

type state = {
  config: Meta3dComponentGeometryProtocol.Index.config,
  mutable maxIndex: Meta3dCommonlibType.ComponentType.index,
  buffer: Js.Typed_array.ArrayBuffer.t,
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
  mutable gameObjectsMap: Meta3dCommonlibType.ComponentType.gameObjectsMap,
  mutable gameObjectGeometryMap: Meta3dCommonlibType.MutableSparseMapType.t<
    Meta3dGameobjectProtocol.Index.gameObject,
    geometry,
  >,
  mutable needDisposedGeometrys: Meta3dComponentGeometryProtocol.Index.needDisposedComponents,
  mutable disposedGeometrys: array<geometry>,
}
