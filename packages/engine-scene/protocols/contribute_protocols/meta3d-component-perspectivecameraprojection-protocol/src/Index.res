let componentName = "PerspectiveCameraProjection"

type state

type dataName = {
  name:int,
  pMatrix: int,
  fovy: int,
  aspect: int,
  near: int,
  far: int,
  dirty: int,
}

let dataName = {
  name:0,
  pMatrix: 1,
  fovy: 2,
  aspect: 3,
  near: 4,
  far: 5,
  dirty: 6,
}



type perspectiveCameraProjection = int

type config = {
  isDebug: bool,
}

type needDisposedComponents = array<perspectiveCameraProjection>

type batchDisposeData = array<perspectiveCameraProjection>

type cloneConfig = ()