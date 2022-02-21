type transform = Meta3dComponentTransformProtocol.Index.transform

// type parent = transform

type child = transform

type children = array<child>

// type position = (float, float, float)

// type rotation = (float, float, float, float)

// type scale = (float, float, float)

// type localToWorldMatrix = Js.Typed_array.Float32Array.t

// type normalMatrix = Js.Typed_array.Float32Array.t

// type eulerAngles = (float, float, float)

type config = {
  isDebug: bool,
  transformCount: int,
  float9Array1: Js.Typed_array.Float32Array.t,
  float32Array1: Js.Typed_array.Float32Array.t,
}

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
  parentMap: Meta3dCommonlibType.MutableSparseMapType.t<transform, transform>,
  childrenMap: Meta3dCommonlibType.MutableSparseMapType.t<transform, children>,
  gameObjectMap: Meta3dCommonlibType.ComponentType.gameObjectMap,
  gameObjectTransformMap: Meta3dCommonlibType.MutableSparseMapType.t<
    Meta3dEngineCoreProtocol.IGameObjectForJs.gameObject,
    transform,
  >,
  dirtyMap: Meta3dCommonlibType.MutableSparseMapType.t<transform, bool>,
}
