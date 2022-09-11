let componentName = "DirectionLight"

type state

type dataName = {
  color: int,
  intensity: int,
}

let dataName = {
  color: 0,
  intensity: 1,
}



type directionLight = int

type config = {
  isDebug: bool,
  directionLightCount: int,
}

type needDisposedComponents = array<directionLight>

type batchDisposeData = array<directionLight>

type cloneConfig = ()