let unsafeGetGameObjectData = (state: StateType.state): GameObjectType.gameObjectData => {
  state.gameObjectData->Meta3dCommonlib.OptionSt.unsafeGet
}

let setGameObjectData = (state: StateType.state, gameObjectData: GameObjectType.gameObjectData) => {
  ...state,
  gameObjectData: Some(gameObjectData),
}

let createAndSetState = ({gameObjectData} as state: StateType.state): StateType.state => {
  let {createStateFunc, createGameObjectFunc, getAllGameObjectsFunc} = unsafeGetGameObjectData(state)

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
  {usedGameObjectData}: StateType.state,
): GameObjectType.usedGameObjectData => {
  usedGameObjectData->Meta3dCommonlib.OptionSt.unsafeGet
}

let _setGameObjectStateToStateState = (
  poState: StateType.state,
  data: GameObjectType.usedGameObjectData,
  gameObjectState: GameObjectType.state,
): StateType.state => {
  data.state = gameObjectState

  poState.usedGameObjectData = data->Some

  poState
}

let createGameObject = (state: StateType.state): (StateType.state, GameObjectType.gameObject) => {
  let data = state->_unsafeGetGameObjectRelatedData

  let (gameObjectState, gameObject) = data.createGameObjectFunc(. data.state)

  (_setGameObjectStateToStateState(state, data, gameObjectState), gameObject)
}

let getAllGameObjects = (state: StateType.state): array<GameObjectType.gameObject> => {
  let data = state->_unsafeGetGameObjectRelatedData

  data.getAllGameObjectsFunc(. data.state)
}
