let getGameObjectContribute: Meta3dEngineCoreProtocol.IGameObjectForJs.getGameObjectContribute<
  StateType.state,
  StateType.gameObject,
> = () => {
  createStateFunc: () => {
    maxUID: 0,
  },
  createGameObjectFunc: (. state) => CreateGameObjectUtils.create(state),
  getAllGameObjectsFunc: (. state) => GetAllGameObjectUtils.getAll(state),
}
