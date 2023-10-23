let getContribute: Meta3dType.Index.getContribute<
  Meta3dEngineCoreSceneviewProtocol.GameObjectContributeType.gameObjectContribute<StateType.state>,
> = api => {
  createStateFunc: (. config) => {
    maxUID: 0,
    needDisposedGameObjectArray: [],
    disposedGameObjectArray: [],
    names: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
    config,
  },
  createGameObjectFunc: (. state) => CreateGameObjectUtils.create(state),
  getNeedDisposedGameObjectsFunc: (. state) => {
    GetNeedDisposedGameObjectsUtils.get(state)
  },
  deferDisposeGameObjectFunc: (. states, funcs, gameObject) =>
    DisposeGameObjectUtils.deferDisposeGameObject(states, funcs, gameObject),
  disposeGameObjectsFunc: (. states, funcs, gameObjects) =>
    DisposeGameObjectUtils.disposeGameObjects(states, funcs, gameObjects),
  cloneGameObjectFunc: (.
    (
      gameObjectState,
      transformState,
      pbrMaterialState,
      geometryState,
      directionLightState,
      arcballCameraControllerState,
      basicCameraViewState,
      perspectiveCameraProjectionState,
    ) as states,
    funcs,
    count,
    cloneConfig,
    sourceGameObject,
  ) => {
    CloneGameObjectUtils.clone(
      states,
      funcs,
      ConfigUtils.getIsDebug(gameObjectState),
      count,
      cloneConfig,
      sourceGameObject,
    )
  },
  getNameFunc: (. {names}, gameObject) =>
    names->Meta3dCommonlib.ImmutableSparseMap.getNullable(gameObject),
  setNameFunc: (. {names} as state, gameObject, name) => {
    ...state,
    names: names->Meta3dCommonlib.ImmutableSparseMap.set(gameObject, name),
  },
  getAllGameObjectsFunc: (. state) => GetAllGameObjectUtils.getAll(state),
  restore: (. currentState, targetState) => {
    targetState
  },
  deepCopy: (. state) => {
    let {needDisposedGameObjectArray, disposedGameObjectArray} = state

    {
      ...state,
      needDisposedGameObjectArray: needDisposedGameObjectArray->Meta3dCommonlib.ArraySt.copy,
      disposedGameObjectArray: disposedGameObjectArray->Meta3dCommonlib.ArraySt.copy,
    }
  },
}
