type transform = Meta3dComponentTransformProtocol.Index.transform

// type parent = transform

type child = transform

type children = array<child>

type config = Meta3dComponentTransformProtocol.Index.config

// type position = (float, float, float)

// type rotation = (float, float, float, float)

// type scale = (float, float, float)

// type localToWorldMatrix = Js.Typed_array.Float32Array.t

// type normalMatrix = Js.Typed_array.Float32Array.t

// type eulerAngles = (float, float, float)

type state = {
  config: config,
  mutable maxIndex: Meta3dCommonlibType.ComponentType.index,
  buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable localRotations: Js.Typed_array.Float32Array.t,
  mutable localScales: Js.Typed_array.Float32Array.t,
  defaultLocalToWorldMatrix: Meta3dCommonlibType.Matrix4Type.mat,
  defaultLocalPosition: Meta3dCommonlibType.VectorType.vec3,
  defaultLocalRotation: Meta3dCommonlibType.VectorType.vec4,
  defaultLocalScale: Meta3dCommonlibType.VectorType.vec3,
  // defaultLocalToWorldMatrix: array<float>,
  // defaultLocalPosition: array<float>,
  // defaultLocalRotation: array<float>,
  // defaultLocalScale: array<float>,
  mutable parentMap: Meta3dCommonlibType.MutableSparseMapType.t<transform, transform>,
  mutable childrenMap: Meta3dCommonlibType.MutableSparseMapType.t<transform, children>,
  mutable gameObjectMap: Meta3dCommonlibType.ComponentType.gameObjectMap,
  mutable gameObjectTransformMap: Meta3dCommonlibType.MutableSparseMapType.t<
    Meta3dEngineCoreProtocol.GameObjectContributeType.gameObject,
    transform,
  >,
  mutable dirtyMap: Meta3dCommonlibType.MutableSparseMapType.t<transform, bool>,
  mutable needDisposedTransformArray: array<transform>,
  mutable disposedTransformArray: array<transform>,
}
