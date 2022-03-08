let getGameObjectContribute: Meta3dEngineCoreProtocol.GameObjectContributeType.getGameObjectContribute<
  StateType.state,
  StateType.config,
  StateType.gameObject,
> = () => {
  createStateFunc: (. config) => {
    maxUID: 0,
    needDisposedGameObjectArray: [],
    config: config,
  },
  createGameObjectFunc: (. state) => CreateGameObjectUtils.create(state),
  deferDisposeGameObjectFunc: (. state, gameObject) =>
    DisposeGameObjectUtils.deferDisposeGameObjectFunc(state, gameObject),
  batchDisposeGameObjectsFunc: (. state, gameObjects) =>
    DisposeGameObjectUtils.batchDisposeGameObjectsFunc(state, gameObjects),
  getAllGameObjectsFunc: (. state) => GetAllGameObjectUtils.getAll(state),
}
