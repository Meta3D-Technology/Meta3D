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

type state
