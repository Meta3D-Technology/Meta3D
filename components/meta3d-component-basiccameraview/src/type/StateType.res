type basicCameraView = Meta3dCommonlibType.ComponentType.index

type config = {isDebug: bool}

type state = {
  config: config,
  maxIndex: Meta3dCommonlibType.ComponentType.index,
  isActiveMap: Meta3dCommonlibType.ImmutableSparseMapType.t<basicCameraView, bool>,
  gameObjectMap: Meta3dCommonlibType.ComponentType.immutableGameObjectMap,
  gameObjectBasicCameraViewMap: Meta3dCommonlibType.ImmutableSparseMapType.t<
    Meta3dGameobjectProtocol.Index.gameObject,
    basicCameraView,
  >,
}
