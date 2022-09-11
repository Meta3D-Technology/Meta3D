open Js.Typed_array

open BufferDirectionLightUtils

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getColorsOffset(count),
    ~length=getColorsLength(count),
  ),
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getIntensitiesOffset(count),
    ~length=getIntensitiesLength(count),
  ),
)
