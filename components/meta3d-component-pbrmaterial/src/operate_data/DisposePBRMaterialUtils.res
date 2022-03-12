open StateType

let _removeComponent = (gameObjectComponentMap, gameObject) =>
  gameObjectComponentMap->Meta3dCommonlib.MutableSparseMap.remove(gameObject)

let deferDisposeComponent = (
  {gameObjectPBRMaterialMap, needDisposedPBRMaterialArray} as state,
  (component, gameObject),
) => {
  {
    ...state,
    gameObjectPBRMaterialMap: gameObjectPBRMaterialMap->_removeComponent(gameObject),
    needDisposedPBRMaterialArray: needDisposedPBRMaterialArray->Meta3dCommonlib.ArrayMapUtils.addValue(
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
  {diffuseColors, speculars, defaultDiffuseColor, defaultSpecular} as state,
  component,
) => {
  state.diffuseColors = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    diffuseColors,
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getDiffuseColorIndex(component),
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getDiffuseColorsSize(),
    defaultDiffuseColor->Obj.magic,
  )
  state.speculars = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32(.
    speculars,
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getSpecularIndex(component),
    defaultSpecular->Obj.magic,
  )

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
  let needDisposedComponents = GetNeedDisposedPBRMaterialsUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    ConfigUtils.getIsDebug(state),
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
              state->_disposeData(component),
              disposedComponents->Meta3dCommonlib.ArraySt.push(component),
            )
      },
      (state, []),
    )

  state.disposedPBRMaterialArray =
    state.disposedPBRMaterialArray->Js.Array.concat(disposedComponents, _)
  state.needDisposedPBRMaterialArray = _removeDisposedComponentsFromNeedDisposedComponents(
    needDisposedComponents,
    disposedComponents,
  )

  state
}
