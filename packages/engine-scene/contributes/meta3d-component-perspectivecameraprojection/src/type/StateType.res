type perspectiveCameraProjection = Meta3dCommonlibType.ComponentType.index

type state = {
  config: Meta3dComponentPerspectivecameraprojectionProtocol.Index.config,
  maxIndex: Meta3dCommonlibType.ComponentType.index,
  dirtyMap: Meta3dCommonlibType.ImmutableSparseMapType.t<perspectiveCameraProjection, bool>,
  pMatrixMap: Meta3dCommonlibType.ImmutableSparseMapType.t<
    perspectiveCameraProjection,
    Js.Typed_array.Float32Array.t,
  >,
  nearMap: Meta3dCommonlibType.ImmutableSparseMapType.t<perspectiveCameraProjection, float>,
  farMap: Meta3dCommonlibType.ImmutableSparseMapType.t<perspectiveCameraProjection, float>,
  fovyMap: Meta3dCommonlibType.ImmutableSparseMapType.t<perspectiveCameraProjection, float>,
  aspectMap: Meta3dCommonlibType.ImmutableSparseMapType.t<perspectiveCameraProjection, float>,
  gameObjectMap: Meta3dCommonlibType.ComponentType.immutableGameObjectMap,
  gameObjectPerspectiveCameraProjectionMap: Meta3dCommonlibType.ImmutableSparseMapType.t<
    Meta3dGameobjectProtocol.Index.gameObject,
    perspectiveCameraProjection,
  >,
  needDisposedPerspectiveCameraProjections: array<perspectiveCameraProjection>,
  disposedPerspectiveCameraProjections: array<perspectiveCameraProjection>,
  names: Meta3dCommonlibType.ImmutableSparseMapType.t<
    perspectiveCameraProjection,
    Meta3dCommonlibType.ComponentType.name,
  >,
}
