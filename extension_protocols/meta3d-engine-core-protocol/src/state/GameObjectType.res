type state

type gameObject

type transform = ComponentType.component

type config

// @genType
type usedGameObjectContribute = {
  mutable state: state,
  createGameObjectFunc: GameObjectContributeType.createGameObjectFunc<state, gameObject>,
  getNeedDisposedGameObjectsFunc: GameObjectContributeType.getNeedDisposedGameObjectsFunc<
    state,
    gameObject,
  >,
  deferDisposeGameObjectFunc: GameObjectContributeType.deferDisposeGameObjectFunc<
    state,
    ComponentType.state,
    gameObject,
    transform
  >,
  batchDisposeGameObjectsFunc: GameObjectContributeType.batchDisposeGameObjectsFunc<
    state,
    ComponentType.state,
    gameObject,
    transform,
  >,
  getAllGameObjectsFunc: GameObjectContributeType.getAllGameObjectsFunc<state, gameObject>,
}

// @genType
type gameObjectContribute = GameObjectContributeType.gameObjectContribute<
  state,
  ComponentType.state,
  config,
  gameObject,
  transform,
>
