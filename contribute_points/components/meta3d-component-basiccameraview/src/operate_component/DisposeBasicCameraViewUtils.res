open StateType

let deferDisposeComponent = (
  {gameObjectBasicCameraViewMap, needDisposedBasicCameraViews} as state,
  (cameraView, gameObject),
) => {
  {
    ...state,
    gameObjectBasicCameraViewMap: gameObjectBasicCameraViewMap->Meta3dCommonlib.MutableSparseMap.remove(
      gameObject,
    ),
    needDisposedBasicCameraViews: needDisposedBasicCameraViews->Meta3dCommonlib.ArraySt.push(
      cameraView,
    ),
  }
}

let _disposeSparseMapData = (map, cameraView) =>
  map->Meta3dCommonlib.MutableSparseMap.remove(cameraView)

let _disposeData = ({isActiveMap, gameObjectMap} as state, cameraView) => {
  {
    ...state,
    isActiveMap: isActiveMap->_disposeSparseMapData(cameraView),
    gameObjectMap: gameObjectMap->_disposeSparseMapData(cameraView),
  }
}

let disposeComponents = (
  {gameObjectBasicCameraViewMap, disposedBasicCameraViews} as state,
  cameraViews,
) => {
  let needDisposedComponents = GetNeedDisposedBasicCameraViewsUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    ConfigUtils.getIsDebug(state),
    "basicCameraView",
    cameraViews,
    needDisposedComponents,
  )

  let state = {
    ...state,
    disposedBasicCameraViews: disposedBasicCameraViews->Js.Array.concat(cameraViews, _),
    needDisposedBasicCameraViews: needDisposedComponents->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
      cameraViews,
    ),
  }

  cameraViews->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. state, cameraView) => state->_disposeData(cameraView),
    state,
  )
}
