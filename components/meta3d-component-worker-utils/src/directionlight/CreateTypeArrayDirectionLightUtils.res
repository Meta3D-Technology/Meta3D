open Js.Typed_array

open BufferDirectionLightUtils

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(count),
    ~length=getColorsLength(count),
  ),
  Float32Array.fromBufferRange(
    Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIntensitiesOffset(count),
    ~length=getIntensitiesLength(count),
  ),
)
