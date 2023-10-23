let componentName = "ArcballCameraController"

type state

type dataName = {
  name: int,
  distance: int,
  minDistance: int,
  wheelSpeed: int,
  phi: int,
  theta: int,
  thetaMargin: int,
  target: int,
  rotateSpeed: int,
  moveSpeedX: int,
  moveSpeedY: int,
  dirty: int,
}

let dataName = {
  name:0,
  distance: 1,
  minDistance: 2,
  wheelSpeed: 3,
  phi: 4,
  theta: 5,
  thetaMargin: 6,
  target: 7,
  rotateSpeed: 8,
  moveSpeedX: 9,
  moveSpeedY: 10,
  dirty: 11,
}

type dataNameType = int

type arcballCameraController = int

type config = {isDebug: bool}

type needDisposedComponents = array<arcballCameraController>

type batchDisposeData = array<arcballCameraController>

type cloneConfig = unit
