let componentName = "TransformWorker"

type config = {
  isDebug: bool,
  transformCount: int,
  buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,
}

type dataName = {localToWorldMatrix: int}

let dataName = {
  localToWorldMatrix: 11,
}

type transform = int

type needDisposedComponents = array<transform>

type batchDisposeData = array<transform>

type cloneConfig = ()
