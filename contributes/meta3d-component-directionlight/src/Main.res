let _restoreTypeArrays = (currentState: StateType.state, targetState: StateType.state) =>
  currentState.colors === targetState.colors &&
  currentState.intensities === targetState.intensities     ? (currentState, targetState)
    : {
        let (colors, intensities) =
          (
            currentState.colors,
            currentState.intensities,
          )->CreateStateUtils.setAllTypeArrDataToDefault(
            currentState.maxIndex,
            
 CreateStateUtils.   getDefaultData(),
          )
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.colors, 0),
          (targetState.colors, 0),
          Js.Typed_array.Float32Array.length(targetState.colors),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.intensities, 0),
          (targetState.intensities, 0),
          Js.Typed_array.Float32Array.length(targetState.intensities),
        )->ignore

        (currentState, targetState)
      }


let getContribute: Meta3dType.Index.getContribute<
  Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentDirectionlightProtocol.Index.config,
    Meta3dComponentDirectionlightProtocol.Index.needDisposedComponents,
    Meta3dComponentDirectionlightProtocol.Index.batchDisposeData,
    Meta3dComponentDirectionlightProtocol.Index.cloneConfig,
    Meta3dComponentDirectionlightProtocol.Index.directionLight,
  >,
> = (_) => {
  componentName: Meta3dComponentDirectionlightProtocol.Index.componentName,
  createStateFunc: (. {isDebug, directionLightCount}) =>
    CreateStateUtils.createState(isDebug, directionLightCount),
  createComponentFunc: (. state) => CreateDirectionLightUtils.create(state),
  addComponentFunc: (. state, gameObject, light) => {
    AddDirectionLightUtils.add(state, gameObject, light)
  },
  removeComponentFunc: (. state, gameObject, light) => {
    RemoveDirectionLightUtils.remove(state, gameObject, light)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasDirectionLightUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetDirectionLightUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedDirectionLightsUtils.get(state)
  },
  getGameObjectsFunc: (. state, light) => {
    GetGameObjectsUtils.get(state, light)
  },
  getComponentDataFunc: (. state, light, dataName) => {
    GetDirectionLightDataUtils.getData(. state, light, dataName)
  },
  setComponentDataFunc: (. state, light, dataName, dataValue) => {
    SetDirectionLightDataUtils.setData(. state, light, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllDirectionLightsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, lightData) => {
    DisposeDirectionLightUtils.deferDisposeComponent(state, lightData)
  },
  disposeComponentsFunc: (. state, lights) => {
    DisposeDirectionLightUtils.disposeComponents(state, lights)
  },
  cloneComponentFunc: (. state, countRange, _, sourceDirectionLight) => {
    CloneDirectionLightUtils.clone(state, countRange, sourceDirectionLight)
  },
  restore: (. currentState, targetState) => {
    let (currentState, targetState) = _restoreTypeArrays(currentState, targetState)

    {
      ...targetState,
      buffer: currentState.buffer,
      colors: currentState.colors,
      intensities: currentState.intensities,
    }

  },
  deepCopy: (. state) => {
    open Meta3dComponentWorkerUtils.BufferDirectionLightUtils

    let {
    maxIndex,
    colors,
    intensities,
    gameObjectDirectionLightMap,
    gameObjectMap,
    needDisposedDirectionLights,
    disposedDirectionLights,
    } = state

    {
      ...state,
      colors: colors->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getColorsSize(),
      ),
      intensities: intensities->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getIntensitiesSize(),
      ),
      gameObjectMap: gameObjectMap->Meta3dCommonlib.MutableSparseMap.copy,
      gameObjectDirectionLightMap: gameObjectDirectionLightMap->Meta3dCommonlib.MutableSparseMap.copy,
      needDisposedDirectionLights: needDisposedDirectionLights->Meta3dCommonlib.ArraySt.copy,
      disposedDirectionLights: disposedDirectionLights->Meta3dCommonlib.ArraySt.copy,
    }


  }
}
