let getGameObjectContribute: Meta3dEngineCoreProtocol.GameObjectContributeType.getGameObjectContribute<
  StateType.state,
  Meta3dComponentTransformProtocol.Index.state,
  StateType.config,
  StateType.gameObject,
  Meta3dComponentTransformProtocol.Index.transform,
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
  getAllGameObjectsFunc: (. state) => GetAllGameObjectUtils.getAll(state),
}
