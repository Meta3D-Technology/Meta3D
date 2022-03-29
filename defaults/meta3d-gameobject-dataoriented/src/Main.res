let getGameObjectContribute: Meta3dEngineCoreProtocol.GameObjectContributeType.getGameObjectContribute<
  StateType.state,
> = () => {
  createStateFunc: (. config) => {
    maxUID: 0,
    needDisposedGameObjectArray: [],
    config: config,
  },
  createGameObjectFunc: (. state) => CreateGameObjectUtils.create(state),
  getNeedDisposedGameObjectsFunc: (. state) => {
    GetNeedDisposedGameObjectsUtils.get(state)
  },
  deferDisposeGameObjectFunc: (. state, funcs, gameObject) =>
    DisposeGameObjectUtils.deferDisposeGameObject(state, funcs, gameObject),
  disposeGameObjectsFunc: (. states, funcs, gameObjects) =>
    DisposeGameObjectUtils.disposeGameObjects(states, funcs, gameObjects),
  cloneGameObjectFunc: (.
    (gameObjectState, transformState, pbrMaterialState, geometryState) as states,
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
  getAllGameObjectsFunc: (. state) => GetAllGameObjectUtils.getAll(state),
}
