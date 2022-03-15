open StateType

let deferDisposeComponent = (
  {gameObjectGeometryMap, needDisposedGeometrys} as state,
  (component, gameObject),
) => {
  {
    ...state,
    gameObjectGeometryMap: gameObjectGeometryMap->Meta3dCommonlib.MutableSparseMap.remove(gameObject),
    needDisposedGeometrys: needDisposedGeometrys->Meta3dCommonlib.ArrayMapUtils.addValue(
      component,
      gameObject,
    ),
  }
}

let _disposeData = (
  {verticesInfos, texCoordsInfos, normalsInfos, indicesInfos} as state,
  isDebug,
  component,
) => {
  let infoIndex = Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(component)

  ReallocatedPointsGeometryUtils.setInfo(verticesInfos, infoIndex, 0, 0, isDebug)
  ReallocatedPointsGeometryUtils.setInfo(texCoordsInfos, infoIndex, 0, 0, isDebug)
  ReallocatedPointsGeometryUtils.setInfo(normalsInfos, infoIndex, 0, 0, isDebug)
  ReallocatedPointsGeometryUtils.setInfo(indicesInfos, infoIndex, 0, 0, isDebug)

  state
}

let disposeComponents = (state, componentDataMap) => {
  let isDebug = ConfigUtils.getIsDebug(state)
  let needDisposedComponents = GetNeedDisposedGeometrysUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "component",
    componentDataMap->Meta3dCommonlib.MutableSparseMap.getKeys,
    needDisposedComponents->Meta3dCommonlib.MutableSparseMap.getKeys,
  )

  let (state, disposedComponents) =
    componentDataMap->Meta3dCommonlib.MutableSparseMap.reducei(
      (. (state, disposedComponents), gameObjects, component) => {
        state.gameObjectsMap = Meta3dCommonlib.ArrayMapUtils.batchRemoveValueArr(state.gameObjectsMap, component, gameObjects)

        Meta3dCommonlib.DisposeSharedComponentUtils. isComponentHasNoGameObject(state.gameObjectsMap, component, gameObjects)
          ? (state, disposedComponents)
          : (
              state->_disposeData(isDebug, component),
              disposedComponents->Meta3dCommonlib.ArraySt.push(component),
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
