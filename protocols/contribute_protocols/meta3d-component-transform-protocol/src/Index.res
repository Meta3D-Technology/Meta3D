let componentName = "Transform"

type state

type config = {
  isDebug: bool,
  float9Array1: Js.Typed_array.Float32Array.t,
  float32Array1: Js.Typed_array.Float32Array.t,
  transformCount: int,
}

type dataName = {
  name: int,
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
  name: 0,
  parent: 1,
  children: 2,
  localPosition: 3,
  localRotation: 4,
  localScale: 5,
  position: 6,
  rotation: 7,
  scale: 8,
  localEulerAngles: 9,
  eulerAngles: 10,
  normalMatrix: 11,
  localToWorldMatrix: 12,
  dirty: 13,
  update: 14,
}

type transform = Meta3dComponentTransformProtocolCommon.Index.transform

type parent = transform

type needDisposedComponents = array<transform>

type batchDisposeData = array<transform>

type cloneConfig = unit
