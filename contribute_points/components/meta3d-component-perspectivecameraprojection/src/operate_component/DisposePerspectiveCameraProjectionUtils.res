open StateType

let deferDisposeComponent = (
  {gameObjectPerspectiveCameraProjectionMap, needDisposedPerspectiveCameraProjections} as state,
  (cameraProjection, gameObject),
) => {
  {
    ...state,
    gameObjectPerspectiveCameraProjectionMap: gameObjectPerspectiveCameraProjectionMap->Meta3dCommonlib.MutableSparseMap.remove(
      gameObject,
    ),
    needDisposedPerspectiveCameraProjections: needDisposedPerspectiveCameraProjections->Meta3dCommonlib.ArraySt.push(
      cameraProjection,
    ),
  }
}

let _disposeSparseMapData = (map, cameraProjection) =>
  map->Meta3dCommonlib.MutableSparseMap.remove(cameraProjection)

let _disposeData = (
  {gameObjectMap, dirtyMap, pMatrixMap, nearMap, farMap, fovyMap, aspectMap} as state,
  cameraProjection,
) => {
  {
    ...state,
    dirtyMap: dirtyMap->_disposeSparseMapData(cameraProjection),
    nearMap: nearMap->_disposeSparseMapData(cameraProjection),
    farMap: farMap->_disposeSparseMapData(cameraProjection),
    fovyMap: fovyMap->_disposeSparseMapData(cameraProjection),
    aspectMap: aspectMap->_disposeSparseMapData(cameraProjection),
    pMatrixMap: pMatrixMap->_disposeSparseMapData(cameraProjection),
    gameObjectMap: gameObjectMap->_disposeSparseMapData(cameraProjection),
  }
}

let disposeComponents = (
  {gameObjectPerspectiveCameraProjectionMap, disposedPerspectiveCameraProjections} as state,
  cameraProjections,
) => {
  let needDisposedComponents = GetNeedDisposedPerspectiveCameraProjectionsUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    ConfigUtils.getIsDebug(state),
    "perspectiveCameraProjection",
    cameraProjections,
    needDisposedComponents,
  )

  let state = {
    ...state,
    disposedPerspectiveCameraProjections: disposedPerspectiveCameraProjections->Js.Array.concat(
      cameraProjections,
      _,
    ),
    needDisposedPerspectiveCameraProjections: needDisposedComponents->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
      cameraProjections,
    ),
  }

  cameraProjections->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. state, cameraProjection) => state->_disposeData(cameraProjection),
    state,
  )
}
