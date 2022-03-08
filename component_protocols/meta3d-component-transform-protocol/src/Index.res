let componentName = "Transform"

type config = {
  isDebug: bool,
  float9Array1: Js.Typed_array.Float32_array.t,
  float32Array1: Js.Typed_array.Float32_array.t,
  transformCount: int,
}

type dataName = {
  parent: int,
  children: int,
  localPosition: int,
  localRotation: int,
  localScale: int,
  position: int,
  rotation: int,
  scale: int,
  localEulerAngles: int,
  eulerAngles: int,
  normalMatrix: int,
  localToWorldMatrix: int,
  dirty: int,
  update: int,
}

let dataName = {
  parent: 0,
  children: 1,
  localPosition: 2,
  localRotation: 3,
  localScale: 4,
  position: 5,
  rotation: 6,
  scale: 7,
  localEulerAngles: 8,
  eulerAngles: 9,
  normalMatrix: 10,
  localToWorldMatrix: 11,
  dirty: 12,
  update: 13,
}

type dataNameType = int

type transform = int

type parent = Js.Nullable.t<transform>

// type gameObjectTransformMap = Meta3dCommonlibType.MutableSparseMapType.t<
//   Meta3dEngineCoreProtocol.GameObjectContributeType.gameObject,
//   transform,
// >

type child = transform

type children = array<child>

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
