let componentName = "BasicCameraView"

type state

type dataName = {name: int, isActive: int}

let dataName = {
  name: 0,
  isActive: 1,
}

type basicCameraView = int

type config = {isDebug: bool}

type needDisposedComponents = array<basicCameraView>

type batchDisposeData = array<basicCameraView>

type cloneConfig = unit
