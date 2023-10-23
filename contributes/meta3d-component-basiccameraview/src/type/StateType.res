type basicCameraView = Meta3dCommonlibType.ComponentType.index

type state = {
  config: Meta3dComponentBasiccameraviewProtocol.Index.config,
  maxIndex: Meta3dCommonlibType.ComponentType.index,
  isActiveMap: Meta3dCommonlibType.ImmutableSparseMapType.t<basicCameraView, bool>,
  gameObjectMap: Meta3dCommonlibType.ComponentType.immutableGameObjectMap,
  gameObjectBasicCameraViewMap: Meta3dCommonlibType.ImmutableSparseMapType.t<
    Meta3dGameobjectProtocol.Index.gameObject,
    basicCameraView,
  >,
  needDisposedBasicCameraViews: Meta3dComponentBasiccameraviewProtocol.Index.needDisposedComponents,
  disposedBasicCameraViews: array<basicCameraView>,
  names: Meta3dCommonlibType.ImmutableSparseMapType.t<
    basicCameraView,
    Meta3dCommonlibType.ComponentType.name,
  >,
}
