let componentName = "DirectionLight"

type state

type dataName = {
  name:int,
  color: int,
  intensity: int,
}

let dataName = {
  name:0,
  color: 1,
  intensity: 2,
}



type directionLight = int

type config = {
  isDebug: bool,
  directionLightCount: int,
}

type needDisposedComponents = array<directionLight>

type batchDisposeData = array<directionLight>

type cloneConfig = ()