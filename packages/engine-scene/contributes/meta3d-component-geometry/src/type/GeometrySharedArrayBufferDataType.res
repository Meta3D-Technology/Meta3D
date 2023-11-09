type geometrySharedArrayBufferData = {
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
}
