type state

type gameObject

type transform = RegisterComponentType.component

type config

// type batchDisposeTransformsFunc = (. RegisterComponentType.state, array<transform>) => RegisterComponentType.state

// @genType
type usedGameObjectContribute = {
  mutable state: state,
  createGameObjectFunc: GameObjectContributeType.createGameObjectFunc<
    state,
    gameObject,
  >,
  deferDisposeGameObjectFunc: GameObjectContributeType.deferDisposeGameObjectFunc<
    state,
    gameObject,
  >,
  batchDisposeGameObjectsFunc: GameObjectContributeType.batchDisposeGameObjectsFunc<
    state,
    RegisterComponentType.state,
    gameObject,
    transform
  >,
  getAllGameObjectsFunc: GameObjectContributeType.getAllGameObjectsFunc<
    state,
    gameObject,
  >,
}

// @genType
type gameObjectContribute = GameObjectContributeType.gameObjectContribute<state, RegisterComponentType.state , config, gameObject, transform>
