// @genType
type state

type transformState

// @genType
type gameObject

type transform

type config

// @genType
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

// @genType
type gameObjectContribute = GameObjectContributeType.gameObjectContribute<state, transformState, config, gameObject, transform>
