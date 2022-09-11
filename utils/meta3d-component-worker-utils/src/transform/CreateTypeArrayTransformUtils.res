open Js.Typed_array

open BufferTransformUtils

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getLocalToWorldMatricesOffset(count),
    ~length=getLocalToWorldMatricesLength(count),
  ),
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getLocalPositionsOffset(count),
    ~length=getLocalPositionsLength(count),
  ),
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getLocalRotationsOffset(count),
    ~length=getLocalRotationsLength(count),
  ),
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getLocalScalesOffset(count),
    ~length=getLocalScalesLength(count),
  ),
)
