let unsafeGetGameObjectData = (
  state: Meta3dEngineCoreProtocol.StateType.state,
): Meta3dEngineCoreProtocol.GameObjectType.gameObjectContribute => {
  state.gameObjectContribute->Meta3dCommonlib.OptionSt.unsafeGet
}

let setGameObjectContribute = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  gameObjectContribute: Meta3dEngineCoreProtocol.GameObjectType.gameObjectContribute,
) => {
  ...state,
  gameObjectContribute: Some(gameObjectContribute),
}

let createAndSetState = (
  {gameObjectContribute} as state: Meta3dEngineCoreProtocol.StateType.state,
  config,
): Meta3dEngineCoreProtocol.StateType.state => {
  let {
    createStateFunc,
    createGameObjectFunc,
    deferDisposeGameObjectFunc,
    batchDisposeGameObjectsFunc,
    getAllGameObjectsFunc,
  } = unsafeGetGameObjectData(state)

  {
    ...state,
    usedGameObjectContribute: {
      state: createStateFunc(. config),
      createGameObjectFunc: createGameObjectFunc,
      getAllGameObjectsFunc: getAllGameObjectsFunc,
      deferDisposeGameObjectFunc: deferDisposeGameObjectFunc,
      batchDisposeGameObjectsFunc: batchDisposeGameObjectsFunc,
    }->Some,
  }
}

let _unsafeGetUsedGameObjectContribute = (
  {usedGameObjectContribute}: Meta3dEngineCoreProtocol.StateType.state,
): Meta3dEngineCoreProtocol.GameObjectType.usedGameObjectContribute => {
  usedGameObjectContribute->Meta3dCommonlib.OptionSt.unsafeGet
}

let _setGameObjectStateToState = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  usedGameObjectContribute: Meta3dEngineCoreProtocol.GameObjectType.usedGameObjectContribute,
  gameObjectState: Meta3dEngineCoreProtocol.GameObjectType.state,
): Meta3dEngineCoreProtocol.StateType.state => {
  usedGameObjectContribute.state = gameObjectState

  state.usedGameObjectContribute = usedGameObjectContribute->Some

  state
}

let createGameObject = (state: Meta3dEngineCoreProtocol.StateType.state): (
  Meta3dEngineCoreProtocol.StateType.state,
  Meta3dEngineCoreProtocol.GameObjectType.gameObject,
) => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute

  let (gameObjectState, gameObject) = usedGameObjectContribute.createGameObjectFunc(.
    usedGameObjectContribute.state,
  )

  (_setGameObjectStateToState(state, usedGameObjectContribute, gameObjectState), gameObject)
}

let deferDisposeGameObject = (state: Meta3dEngineCoreProtocol.StateType.state, gameObject) => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute

  let gameObjectState = usedGameObjectContribute.deferDisposeGameObjectFunc(.
    usedGameObjectContribute.state,
    gameObject,
  )

  _setGameObjectStateToState(state, usedGameObjectContribute, gameObjectState)
}

let batchDisposeGameObjects = (state, gameObjects) => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute
  let usedTransformContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentTransformProtocol.Index.componentName,
    )

  let (gameObjectState, transformState) = usedGameObjectContribute.batchDisposeGameObjectsFunc(.
    (usedGameObjectContribute.state, usedTransformContribute.state),
    usedTransformContribute.batchDisposeComponentsFunc,
    gameObjects,
  )

  let usedTransformContribute =
    transformState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedTransformContribute,
    )

  state
  ->_setGameObjectStateToState(usedGameObjectContribute, gameObjectState)
  ->ComponentManager.setUsedComponentContribute(
    usedTransformContribute,
    Meta3dComponentTransformProtocol.Index.componentName,
  )
}

let getAllGameObjects = (state: Meta3dEngineCoreProtocol.StateType.state): array<
  Meta3dEngineCoreProtocol.GameObjectType.gameObject,
> => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute

  usedGameObjectContribute.getAllGameObjectsFunc(. usedGameObjectContribute.state)
}
