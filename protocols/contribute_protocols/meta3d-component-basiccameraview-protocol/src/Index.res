let componentName = "BasicCameraView"

type state

type dataName = {isActive: int}

let dataName = {
  isActive: 0,
}

type basicCameraView = int

type config = {
  isDebug: bool,
}

type needDisposedComponents = array<basicCameraView>

type batchDisposeData = array<basicCameraView>

type cloneConfig = ()