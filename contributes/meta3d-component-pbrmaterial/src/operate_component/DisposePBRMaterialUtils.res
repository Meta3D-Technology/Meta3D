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
  {diffuseColors, speculars,
  specularColors,
  roughnesses,metalnesses,transmissions,iors,
  
   defaultDiffuseColor, defaultSpecular,
   
  defaultSpecularColor,
  defaultRoughness,
  defaultMetalness,
  defaultTransmission,
  defaultIOR,
   } as state,
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
  state.specularColors = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    specularColors,
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getSpecularColorIndex(material),
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getSpecularColorsSize(),
    defaultSpecularColor->Obj.magic,
  )
  state.roughnesses = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32(.
    roughnesses,
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getRoughnessIndex(material),
    defaultRoughness->Obj.magic,
  )
  state.metalnesses = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32(.
    metalnesses,
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getMetalnessIndex(material),
    defaultMetalness->Obj.magic,
  )
  state.transmissions = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32(.
    transmissions,
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getTransmissionIndex(material),
    defaultTransmission->Obj.magic,
  )
  state.iors = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32(.
    iors,
    Meta3dComponentWorkerUtils.BufferPBRMaterialUtils.getIORIndex(material),
    defaultIOR->Obj.magic,
  )

  state.diffuseMap -> Meta3dCommonlib.MutableSparseMap.remove(material)-> ignore
  state.roughnessMap -> Meta3dCommonlib.MutableSparseMap.remove(material)-> ignore
  state.metalnessMap-> Meta3dCommonlib.MutableSparseMap.remove(material)-> ignore
  state.normalMap -> Meta3dCommonlib.MutableSparseMap.remove(material)-> ignore

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

        Meta3dCommonlib.DisposeSharedComponentUtils.isComponentHasGameObject(
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
