let unsafeGetGameObjectData = (
  state: Meta3dEngineCoreProtocol.StateType.state,
): Meta3dEngineCoreProtocol.GameObjectType.gameObjectContribute => {
  state.gameObjectContribute->Meta3dCommonlib.OptionSt.unsafeGet
}

let setGameObjectData = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  gameObjectContribute: Meta3dEngineCoreProtocol.GameObjectType.gameObjectContribute,
) => {
  ...state,
  gameObjectContribute: Some(gameObjectContribute),
}

let createAndSetState = (
  {gameObjectContribute} as state: Meta3dEngineCoreProtocol.StateType.state,
): Meta3dEngineCoreProtocol.StateType.state => {
  let {createStateFunc, createGameObjectFunc, getAllGameObjectsFunc} = unsafeGetGameObjectData(
    state,
  )

  {
    ...state,
    usedGameObjectData: {
      state: createStateFunc(),
      createGameObjectFunc: createGameObjectFunc,
      getAllGameObjectsFunc: getAllGameObjectsFunc,
    }->Some,
  }
}

let _unsafeGetGameObjectRelatedData = (
  {usedGameObjectData}: Meta3dEngineCoreProtocol.StateType.state,
): Meta3dEngineCoreProtocol.GameObjectType.usedGameObjectData => {
  usedGameObjectData->Meta3dCommonlib.OptionSt.unsafeGet
}

let _setGameObjectStateToStateState = (
  poState: Meta3dEngineCoreProtocol.StateType.state,
  data: Meta3dEngineCoreProtocol.GameObjectType.usedGameObjectData,
  gameObjectState: Meta3dEngineCoreProtocol.GameObjectType.state,
): Meta3dEngineCoreProtocol.StateType.state => {
  data.state = gameObjectState

  poState.usedGameObjectData = data->Some

  poState
}

let createGameObject = (state: Meta3dEngineCoreProtocol.StateType.state): (
  Meta3dEngineCoreProtocol.StateType.state,
  Meta3dEngineCoreProtocol.GameObjectType.gameObject,
) => {
  let data = state->_unsafeGetGameObjectRelatedData

  let (gameObjectState, gameObject) = data.createGameObjectFunc(. data.state)

  (_setGameObjectStateToStateState(state, data, gameObjectState), gameObject)
}

let getAllGameObjects = (state: Meta3dEngineCoreProtocol.StateType.state): array<
  Meta3dEngineCoreProtocol.GameObjectType.gameObject,
> => {
  let data = state->_unsafeGetGameObjectRelatedData

  data.getAllGameObjectsFunc(. data.state)
}
