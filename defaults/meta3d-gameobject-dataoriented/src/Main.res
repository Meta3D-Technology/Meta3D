let getGameObjectContribute: Meta3dEngineCoreProtocol.GameObjectContributeType.getGameObjectContribute<
  StateType.state,
  StateType.gameObject,
> = () => {
  createStateFunc: () => {
    maxUID: 0,
  },
  createGameObjectFunc: (. state) => CreateGameObjectUtils.create(state),
  getAllGameObjectsFunc: (. state) => GetAllGameObjectUtils.getAll(state),
}
