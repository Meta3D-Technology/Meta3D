type transformSharedArrayBufferData = {
  // TODO use COOP to open SharedArrayBuffer
  // buffer: Js.Typed_array.ArrayBuffer.t,

  buffer: Js.Typed_array.ArrayBuffer.t,

  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable localRotations: Js.Typed_array.Float32Array.t,
  mutable localScales: Js.Typed_array.Float32Array.t,
}
