type arcballCameraController = Meta3dCommonlibType.ComponentType.index

type state = {
  config: Meta3dComponentArcballcameracontrollerProtocol.Index.config,
  maxIndex: Meta3dCommonlibType.ComponentType.index,
  gameObjectMap: Meta3dCommonlibType.ComponentType.gameObjectMap,
  dirtyMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, bool>,
  distanceMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, float>,
  minDistanceMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, float>,
  phiMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, float>,
  thetaMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, float>,
  thetaMarginMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, float>,
  targetMap: Meta3dCommonlibType.ImmutableSparseMapType.t<
    arcballCameraController,
    (float, float, float),
  >,
  moveSpeedXMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, float>,
  moveSpeedYMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, float>,
  rotateSpeedMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, float>,
  wheelSpeedMap: Meta3dCommonlibType.ImmutableSparseMapType.t<arcballCameraController, float>,
  gameObjectArcballCameraControllerMap: Meta3dCommonlibType.ImmutableSparseMapType.t<
    Meta3dGameobjectProtocol.Index.gameObject,
    arcballCameraController,
  >,
  needDisposedArcballCameraControllers: Meta3dComponentArcballcameracontrollerProtocol.Index.needDisposedComponents,
  disposedArcballCameraControllers: array<arcballCameraController>,
  names: Meta3dCommonlibType.ImmutableSparseMapType.t<
    arcballCameraController,
    Meta3dCommonlibType.ComponentType.name,
  >,
}
