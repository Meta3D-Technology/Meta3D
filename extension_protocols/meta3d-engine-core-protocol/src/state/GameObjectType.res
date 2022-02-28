@genType
type state

@genType
type gameObject

@genType
type usedGameObjectData = {
  mutable state: state,
  createGameObjectFunc: GameObjectContributeType.createGameObjectFunc<
    state,
    gameObject,
  >,
  getAllGameObjectsFunc: GameObjectContributeType.getAllGameObjectsFunc<
    state,
    gameObject,
  >,
}

@genType
type gameObjectContribute = GameObjectContributeType.gameObjectContribute<state, gameObject>
