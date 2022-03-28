let componentName = "TransformWorker"

type config = {
  isDebug: bool,
  transformCount: int,
  buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,
}

type dataName = {
  localToWorldMatrix: int,
  update: int,
}

let dataName = {
  localToWorldMatrix: 11,
  update: 13,
}

type transform = Meta3dComponentTransformCommonProtocol.Index.transform

type needDisposedComponents = array<transform>

type batchDisposeData = array<transform>

type cloneConfig = unit
