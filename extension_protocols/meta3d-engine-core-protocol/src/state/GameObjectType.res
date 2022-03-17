type state = Meta3dGameobjectProtocol.Index.state

type usedGameObjectContribute = {
  mutable state: state,
  createGameObjectFunc: GameObjectContributeType.createGameObjectFunc<state>,
  getNeedDisposedGameObjectsFunc: GameObjectContributeType.getNeedDisposedGameObjectsFunc<state>,
  deferDisposeGameObjectFunc: GameObjectContributeType.deferDisposeGameObjectFunc<
    state,
    ComponentType.state,
    ComponentType.state,
    ComponentType.state,
  >,
  disposeGameObjectsFunc: GameObjectContributeType.disposeGameObjectsFunc<
    state,
    ComponentType.state,
    ComponentType.state,
    ComponentType.state,
  >,
  cloneGameObjectFunc: GameObjectContributeType.cloneGameObjectFunc<
    state,
    ComponentType.state,
    ComponentType.state,
    ComponentType.state,
  >,
  getAllGameObjectsFunc: GameObjectContributeType.getAllGameObjectsFunc<state>,
}

// @genType
type gameObjectContribute = GameObjectContributeType.gameObjectContribute<
  state,
  ComponentType.state,
  ComponentType.state,
  ComponentType.state,
>
