open StateType

let deferDisposeComponent = (
  {gameObjectPBRMaterialMap, needDisposedPBRMaterials} as state,
  (material, gameObject),
) => {
  {
    ...state,
    gameObjectPBRMaterialMap: gameObjectPBRMaterialMap->Meta3dCommonlib.MutableSparseMap.remove(
      gameObject,
    ),
    needDisposedPBRMaterials: needDisposedPBRMaterials->Meta3dCommonlib.ArrayMapUtils.addValue(
      material,
      gameObject,
    ),
  }
}

let _disposeData = (
  {diffuseColors, speculars, defaultDiffuseColor, defaultSpecular} as state,
  material,
) => {
  state.diffuseColors = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    diffuseColors,
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getDiffuseColorIndex(material),
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getDiffuseColorsSize(),
    defaultDiffuseColor->Obj.magic,
  )
  state.speculars = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32(.
    speculars,
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getSpecularIndex(material),
    defaultSpecular->Obj.magic,
  )

  state
}

let disposeComponents = (state, materialDataMap) => {
  let needDisposedComponents = GetNeedDisposedPBRMaterialsUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    ConfigUtils.getIsDebug(state),
    "material",
    materialDataMap->Meta3dCommonlib.MutableSparseMap.getKeys,
    needDisposedComponents->Meta3dCommonlib.MutableSparseMap.getKeys,
  )

  let (state, disposedComponents) =
    materialDataMap->Meta3dCommonlib.MutableSparseMap.reducei(
      (. (state, disposedComponents), gameObjects, material) => {
        state.gameObjectsMap = Meta3dCommonlib.ArrayMapUtils.batchRemoveValueArr(
          state.gameObjectsMap,
          material,
          gameObjects,
        )

        Meta3dCommonlib.DisposeSharedComponentUtils.isComponentHasNoGameObject(
          state.gameObjectsMap,
          material,
          gameObjects,
        )
          ? (state, disposedComponents)
          : (
              state->_disposeData(material),
              disposedComponents->Meta3dCommonlib.ArraySt.push(material),
            )
      },
      (state, []),
    )

  state.disposedPBRMaterials = state.disposedPBRMaterials->Js.Array.concat(disposedComponents, _)
  state.needDisposedPBRMaterials = Meta3dCommonlib.DisposeSharedComponentUtils.removeDisposedComponentsFromNeedDisposedComponents(
    needDisposedComponents,
    disposedComponents,
  )

  state
}
