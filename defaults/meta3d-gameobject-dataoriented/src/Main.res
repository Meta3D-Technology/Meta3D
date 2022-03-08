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
  deferDisposeGameObjectFunc: (. state, gameObject) =>
    DisposeGameObjectUtils.deferDisposeGameObjectFunc(state, gameObject),
  batchDisposeGameObjectsFunc: (. states, batchDisposeTransformsFunc, gameObjects) =>
    DisposeGameObjectUtils.batchDisposeGameObjectsFunc(
      states,
      batchDisposeTransformsFunc,
      gameObjects,
    ),
  getAllGameObjectsFunc: (. state) => GetAllGameObjectUtils.getAll(state),
}
