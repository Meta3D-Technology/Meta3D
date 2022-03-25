let componentName = "DirectionLightWorker"

type config = {
  isDebug: bool,
  directionLightCount: int,
  buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,
}

type dataName = {
  color: int,
  intensity: int,
}

let dataName = {
  color: 0,
  intensity: 1,
}

type directionLight = int

type needDisposedComponents = array<directionLight>

type batchDisposeData = array<directionLight>

type cloneConfig = ()