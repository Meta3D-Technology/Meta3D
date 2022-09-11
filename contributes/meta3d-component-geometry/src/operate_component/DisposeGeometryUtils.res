open StateType

let deferDisposeComponent = (
  {gameObjectGeometryMap, needDisposedGeometrys} as state,
  (geometry, gameObject),
) => {
  {
    ...state,
    gameObjectGeometryMap: gameObjectGeometryMap->Meta3dCommonlib.MutableSparseMap.remove(gameObject),
    needDisposedGeometrys: needDisposedGeometrys->Meta3dCommonlib.ArrayMapUtils.addValue(
      geometry,
      gameObject,
    ),
  }
}

let _disposeData = (
  {verticesInfos, texCoordsInfos, normalsInfos, indicesInfos} as state,
  isDebug,
  geometry,
) => {
  let infoIndex = Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry)

  ReallocatedPointsGeometryUtils.setInfo(verticesInfos, infoIndex, 0, 0, isDebug)
  ReallocatedPointsGeometryUtils.setInfo(texCoordsInfos, infoIndex, 0, 0, isDebug)
  ReallocatedPointsGeometryUtils.setInfo(normalsInfos, infoIndex, 0, 0, isDebug)
  ReallocatedPointsGeometryUtils.setInfo(indicesInfos, infoIndex, 0, 0, isDebug)

  state
}

let disposeComponents = (state, geometryDataMap) => {
  let isDebug = ConfigUtils.getIsDebug(state)
  let needDisposedComponents = GetNeedDisposedGeometrysUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "geometry",
    geometryDataMap->Meta3dCommonlib.MutableSparseMap.getKeys,
    needDisposedComponents->Meta3dCommonlib.MutableSparseMap.getKeys,
  )

  let (state, disposedComponents) =
    geometryDataMap->Meta3dCommonlib.MutableSparseMap.reducei(
      (. (state, disposedComponents), gameObjects, geometry) => {
        state.gameObjectsMap = Meta3dCommonlib.ArrayMapUtils.batchRemoveValueArr(state.gameObjectsMap, geometry, gameObjects)

        Meta3dCommonlib.DisposeSharedComponentUtils. isComponentHasGameObject(state.gameObjectsMap, geometry, gameObjects)
          ? (state, disposedComponents)
          : (
              state->_disposeData(isDebug, geometry),
              disposedComponents->Meta3dCommonlib.ArraySt.push(geometry),
            )
      },
      (state, []),
    )

  state.disposedGeometrys = state.disposedGeometrys->Js.Array.concat(disposedComponents, _)
  state.needDisposedGeometrys =  Meta3dCommonlib.DisposeSharedComponentUtils.removeDisposedComponentsFromNeedDisposedComponents(
    needDisposedComponents,
    disposedComponents,
  )

  state
}
