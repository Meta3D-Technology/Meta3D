type transform = Meta3dComponentTransformProtocol.Index.transform

type child = transform

type children = array<child>

type state = {
  config: Meta3dComponentTransformProtocol.Index.config,
  mutable maxIndex: Meta3dCommonlibType.ComponentType.index,
  // TODO use COOP to open SharedArrayBuffer
  // buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,

  buffer: Js.Typed_array.ArrayBuffer.t,

  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable localRotations: Js.Typed_array.Float32Array.t,
  mutable localScales: Js.Typed_array.Float32Array.t,
  defaultLocalToWorldMatrix: Meta3dCommonlibType.Matrix4Type.mat,
  defaultLocalPosition: Meta3dCommonlibType.VectorType.vec3,
  defaultLocalRotation: Meta3dCommonlibType.VectorType.vec4,
  defaultLocalScale: Meta3dCommonlibType.VectorType.vec3,
  mutable parentMap: Meta3dCommonlibType.MutableSparseMapType.t<transform, transform>,
  mutable childrenMap: Meta3dCommonlibType.MutableSparseMapType.t<transform, children>,
  mutable gameObjectMap: Meta3dCommonlibType.ComponentType.gameObjectMap,
  mutable gameObjectTransformMap: Meta3dCommonlibType.MutableSparseMapType.t<
    Meta3dGameobjectProtocol.Index.gameObject,
    transform,
  >,
  mutable dirtyMap: Meta3dCommonlibType.MutableSparseMapType.t<transform, bool>,
  mutable needDisposedTransforms: Meta3dComponentTransformProtocol.Index.needDisposedComponents,
  mutable disposedTransforms: array<transform>,
}
