open StateType

let deferDisposeComponent = (
  {gameObjectPBRMaterialMap, needDisposedPBRMaterials} as state,
  (component, gameObject),
) => {
  {
    ...state,
    gameObjectPBRMaterialMap: gameObjectPBRMaterialMap->Meta3dCommonlib.MutableSparseMap.remove(gameObject),
    needDisposedPBRMaterials: needDisposedPBRMaterials->Meta3dCommonlib.ArrayMapUtils.addValue(
      component,
      gameObject,
    ),
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
        state.gameObjectsMap = Meta3dCommonlib.ArrayMapUtils.batchRemoveValueArr(state.gameObjectsMap, component, gameObjects)

        Meta3dCommonlib.DisposeSharedComponentUtils.isComponentHasNoGameObject(state.gameObjectsMap, component, gameObjects)
          ? (state, disposedComponents)
          : (
              state->_disposeData(component),
              disposedComponents->Meta3dCommonlib.ArraySt.push(component),
            )
      },
      (state, []),
    )

  state.disposedPBRMaterials =
    state.disposedPBRMaterials->Js.Array.concat(disposedComponents, _)
  state.needDisposedPBRMaterials = Meta3dCommonlib.DisposeSharedComponentUtils. removeDisposedComponentsFromNeedDisposedComponents(
    needDisposedComponents,
    disposedComponents,
  )

  state
}
