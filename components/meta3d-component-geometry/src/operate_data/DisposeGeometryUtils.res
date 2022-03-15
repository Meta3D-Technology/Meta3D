open StateType

// TODO refactor: duplicate with transform
let _removeComponent = (gameObjectComponentMap, gameObject) =>
  gameObjectComponentMap->Meta3dCommonlib.MutableSparseMap.remove(gameObject)

let deferDisposeComponent = (
  {gameObjectGeometryMap, needDisposedGeometryArray} as state,
  (component, gameObject),
) => {
  {
    ...state,
    gameObjectGeometryMap: gameObjectGeometryMap->_removeComponent(gameObject),
    needDisposedGeometryArray: needDisposedGeometryArray->Meta3dCommonlib.ArrayMapUtils.addValue(
      component,
      gameObject,
    ),
  }
}

let _batchRemoveGameObjects = (gameObjectsMap, component, gameObjectArr) => {
  Meta3dCommonlib.ArrayMapUtils.batchRemoveValueArr(gameObjectsMap, component, gameObjectArr)
}

let _getGameObjects = (gameObjectsMap, component) =>
  Meta3dCommonlib.MutableSparseMap.get(gameObjectsMap, component)

let _isComponentHasNoGameObject = (gameObjectsMap, component, gameObjectArr) => {
  switch _getGameObjects(gameObjectsMap, component) {
  | Some(arr) if arr->Js.Array.length > 0 => true
  | _ => false
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

let _removeDisposedComponentsFromNeedDisposedComponents = (
  needDisposedComponents,
  disposedComponents,
) => {
  disposedComponents->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. needDisposedComponents, component) => {
      needDisposedComponents->Meta3dCommonlib.MutableSparseMap.remove(component)
    },
    needDisposedComponents,
  )
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
        state.gameObjectsMap = _batchRemoveGameObjects(state.gameObjectsMap, component, gameObjects)

        _isComponentHasNoGameObject(state.gameObjectsMap, component, gameObjects)
          ? (state, disposedComponents)
          : (
              state->_disposeData(isDebug, component),
              disposedComponents->Meta3dCommonlib.ArraySt.push(component),
            )
      },
      (state, []),
    )

  state.disposedGeometryArray = state.disposedGeometryArray->Js.Array.concat(disposedComponents, _)
  state.needDisposedGeometryArray = _removeDisposedComponentsFromNeedDisposedComponents(
    needDisposedComponents,
    disposedComponents,
  )

  state
}
