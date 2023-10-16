open StateType

let deferDisposeComponent = (
  {gameObjectArcballCameraControllerMap, needDisposedArcballCameraControllers} as state,
  (cameraController, gameObject),
) => {
  {
    ...state,
    gameObjectArcballCameraControllerMap: gameObjectArcballCameraControllerMap->Meta3dCommonlib.MutableSparseMap.remove(
      gameObject,
    ),
    needDisposedArcballCameraControllers: needDisposedArcballCameraControllers->Meta3dCommonlib.ArraySt.push(
      cameraController,
    ),
  }
}

let _disposeSparseMapData = (map, cameraController) =>
  map->Meta3dCommonlib.MutableSparseMap.remove(cameraController)

let _disposeData = (
  {
    dirtyMap,
    distanceMap,
    minDistanceMap,
    phiMap,
    thetaMap,
    thetaMarginMap,
    targetMap,
    moveSpeedXMap,
    moveSpeedYMap,
    rotateSpeedMap,
    wheelSpeedMap,
    gameObjectMap,
  } as state,
  cameraController,
) => {
  {
    ...state,
    dirtyMap: dirtyMap->_disposeSparseMapData(cameraController),
    distanceMap: distanceMap->_disposeSparseMapData(cameraController),
    minDistanceMap: minDistanceMap->_disposeSparseMapData(cameraController),
    phiMap: phiMap->_disposeSparseMapData(cameraController),
    thetaMap: thetaMap->_disposeSparseMapData(cameraController),
    thetaMarginMap: thetaMarginMap->_disposeSparseMapData(cameraController),
    targetMap: targetMap->_disposeSparseMapData(cameraController),
    moveSpeedXMap: moveSpeedXMap->_disposeSparseMapData(cameraController),
    moveSpeedYMap: moveSpeedYMap->_disposeSparseMapData(cameraController),
    rotateSpeedMap: rotateSpeedMap->_disposeSparseMapData(cameraController),
    wheelSpeedMap: wheelSpeedMap->_disposeSparseMapData(cameraController),
    gameObjectMap: gameObjectMap->_disposeSparseMapData(cameraController),
  }
}

let disposeComponents = (
  {gameObjectArcballCameraControllerMap, disposedArcballCameraControllers} as state,
  cameraControllers,
) => {
  let isDebug = ConfigUtils.getIsDebug(state)

  let needDisposedComponents = GetNeedDisposedArcballCameraControllersUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "arcballCameraController",
    cameraControllers,
    needDisposedComponents,
  )

  let state = {
    ...state,
    disposedArcballCameraControllers: disposedArcballCameraControllers->Js.Array.concat(
      cameraControllers,
      _,
    ),
    needDisposedArcballCameraControllers: needDisposedComponents->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
      cameraControllers,
    ),
  }

  (
    cameraControllers->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, cameraController) => state->_disposeData(cameraController),
      state,
    ),
    cameraControllers,
  )
}
