type state = Meta3dGameobjectProtocol.Index.state

type usedGameObjectContribute = {
  mutable state: state,
  createGameObjectFunc: GameObjectContributeType.createGameObjectFunc<state>,
  getNeedDisposedGameObjectsFunc: GameObjectContributeType.getNeedDisposedGameObjectsFunc<state>,
  deferDisposeGameObjectFunc: GameObjectContributeType.deferDisposeGameObjectFunc<
    state,
  >,
  disposeGameObjectsFunc: GameObjectContributeType.disposeGameObjectsFunc<
    state,
  >,
  cloneGameObjectFunc: GameObjectContributeType.cloneGameObjectFunc<
    state,
  >,
  getAllGameObjectsFunc: GameObjectContributeType.getAllGameObjectsFunc<state>,
  restore: GameObjectContributeType.restore<state>,
  deepCopy: GameObjectContributeType.deepCopy<state>,
}

// @genType
type gameObjectContribute = GameObjectContributeType.gameObjectContribute<
  state,
>
