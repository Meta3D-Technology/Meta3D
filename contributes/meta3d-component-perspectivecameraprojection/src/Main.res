let getContribute: Meta3dType.Index.getContribute<
  Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.config,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.needDisposedComponents,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.batchDisposeData,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.cloneConfig,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection,
  >,
> = (_) => {
  componentName: Meta3dComponentPerspectivecameraprojectionProtocol.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreatePerspectiveCameraProjectionUtils.create(state),
  addComponentFunc: (. state, gameObject, cameraProjection) => {
    AddPerspectiveCameraProjectionUtils.add(state, gameObject, cameraProjection)
  },
  removeComponentFunc: (. state, gameObject, cameraProjection) => {
    RemovePerspectiveCameraProjectionUtils.remove(state, gameObject, cameraProjection)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasPerspectiveCameraProjectionUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetPerspectiveCameraProjectionUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedPerspectiveCameraProjectionsUtils.get(state)
  },
  getGameObjectsFunc: (. state, cameraProjection) => {
    GetGameObjectsUtils.get(state, cameraProjection)
  },
  getComponentDataFunc: (. state, cameraProjection, dataName) => {
    GetPerspectiveCameraProjectionDataUtils.getData(. state, cameraProjection, dataName)
  },
  setComponentDataFunc: (. state, cameraProjection, dataName, dataValue) => {
    SetPerspectiveCameraProjectionDataUtils.setData(. state, cameraProjection, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllPerspectiveCameraProjectionsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, cameraProjectionData) => {
    DisposePerspectiveCameraProjectionUtils.deferDisposeComponent(state, cameraProjectionData)
  },
  disposeComponentsFunc: (. state, cameraProjections) => {
    DisposePerspectiveCameraProjectionUtils.disposeComponents(state, cameraProjections)
  },
  cloneComponentFunc: (. state, countRange, _, sourcePerspectiveCameraProjection) => {
    ClonePerspectiveCameraProjectionUtils.clone(
      state,
      countRange,
      sourcePerspectiveCameraProjection,
    )
  },
  restore: (. currentState, targetState) => {
    targetState
  },
  deepCopy: (. state) => {
    open Meta3dComponentCommonlib

    let {
    dirtyMap,
    pMatrixMap,
    nearMap,
    farMap,
    fovyMap,
    aspectMap,
    gameObjectMap,
    gameObjectPerspectiveCameraProjectionMap,
    needDisposedPerspectiveCameraProjections,
    disposedPerspectiveCameraProjections,
    } = state

    {
      ...state,
      dirtyMap: dirtyMap->Meta3dCommonlib.MutableSparseMap.copy,
      pMatrixMap: pMatrixMap->Meta3dCommonlib.MutableSparseMap.copy,
      nearMap: nearMap->Meta3dCommonlib.MutableSparseMap.copy,
      farMap: farMap->Meta3dCommonlib.MutableSparseMap.copy,
      aspectMap: aspectMap->Meta3dCommonlib.MutableSparseMap.copy,
      fovyMap: fovyMap->Meta3dCommonlib.MutableSparseMap.copy,
      gameObjectMap: gameObjectMap->Meta3dCommonlib.MutableSparseMap.copy,
      gameObjectPerspectiveCameraProjectionMap: gameObjectPerspectiveCameraProjectionMap->Meta3dCommonlib.MutableSparseMap.copy,
      needDisposedPerspectiveCameraProjections: needDisposedPerspectiveCameraProjections->Meta3dCommonlib.ArraySt.copy,
      disposedPerspectiveCameraProjections: disposedPerspectiveCameraProjections->Meta3dCommonlib.ArraySt.copy,
    }
  }
}
