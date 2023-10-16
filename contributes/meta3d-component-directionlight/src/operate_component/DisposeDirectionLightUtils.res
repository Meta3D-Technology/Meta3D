open StateType

let deferDisposeComponent = (
  {gameObjectDirectionLightMap, needDisposedDirectionLights} as state,
  (light, gameObject),
) => {
  {
    ...state,
    gameObjectDirectionLightMap: gameObjectDirectionLightMap->Meta3dCommonlib.MutableSparseMap.remove(
      gameObject,
    ),
    needDisposedDirectionLights: needDisposedDirectionLights->Meta3dCommonlib.ArraySt.push(light),
  }
}

let _getDefaultColor = () => [1., 1., 1.]

let _getDefaultIntensity = () => 1.

let _disposeSparseMapData = (map, light) => map->Meta3dCommonlib.MutableSparseMap.remove(light)

let _disposeData = (
  {
    colors,
    intensities,
    //  renderLightArr,
    gameObjectMap,
  } as state,
  isDebug,
  light,
) => {
  state.colors = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    colors,
    Meta3dComponentWorkerUtils.BufferDirectionLightUtils.getColorIndex(light),
    Meta3dComponentWorkerUtils.BufferDirectionLightUtils.getColorsSize(),
    _getDefaultColor(),
  )
  state.intensities = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32(.
    intensities,
    Meta3dComponentWorkerUtils.BufferDirectionLightUtils.getIntensityIndex(light),
    _getDefaultIntensity(),
  )

  state.gameObjectMap = gameObjectMap->_disposeSparseMapData(light)

  state
}

let disposeComponents = (
  {gameObjectDirectionLightMap, disposedDirectionLights} as state,
  lights,
) => {
  let isDebug = ConfigUtils.getIsDebug(state)

  let needDisposedComponents = GetNeedDisposedDirectionLightsUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "directionLight",
    lights,
    needDisposedComponents,
  )

  state.disposedDirectionLights = disposedDirectionLights->Js.Array.concat(lights, _)
  state.needDisposedDirectionLights =
    needDisposedComponents->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(lights)

  (
    lights->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, light) => state->_disposeData(isDebug, light),
      state,
    ),
    lights,
  )
}
