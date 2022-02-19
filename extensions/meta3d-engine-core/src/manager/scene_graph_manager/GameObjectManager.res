let unsafeGetGameObjectData = (
  state: Meta3dEngineCoreType.StateType.state,
): Meta3dEngineCoreType.GameObjectType.gameObjectData => {
  state.gameObjectData->Meta3dCommonlib.OptionSt.unsafeGet
}

let setGameObjectData = (
  state: Meta3dEngineCoreType.StateType.state,
  gameObjectData: Meta3dEngineCoreType.GameObjectType.gameObjectData,
) => {
  ...state,
  gameObjectData: Some(gameObjectData),
}

let createAndSetState = (
  {gameObjectData} as state: Meta3dEngineCoreType.StateType.state,
): Meta3dEngineCoreType.StateType.state => {
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
  {usedGameObjectData}: Meta3dEngineCoreType.StateType.state,
): Meta3dEngineCoreType.GameObjectType.usedGameObjectData => {
  usedGameObjectData->Meta3dCommonlib.OptionSt.unsafeGet
}

let _setGameObjectStateToStateState = (
  poState: Meta3dEngineCoreType.StateType.state,
  data: Meta3dEngineCoreType.GameObjectType.usedGameObjectData,
  gameObjectState: Meta3dEngineCoreType.GameObjectType.state,
): Meta3dEngineCoreType.StateType.state => {
  data.state = gameObjectState

  poState.usedGameObjectData = data->Some

  poState
}

let createGameObject = (state: Meta3dEngineCoreType.StateType.state): (
  Meta3dEngineCoreType.StateType.state,
  Meta3dEngineCoreType.GameObjectType.gameObject,
) => {
  let data = state->_unsafeGetGameObjectRelatedData

  let (gameObjectState, gameObject) = data.createGameObjectFunc(. data.state)

  (_setGameObjectStateToStateState(state, data, gameObjectState), gameObject)
}

let getAllGameObjects = (state: Meta3dEngineCoreType.StateType.state): array<
  Meta3dEngineCoreType.GameObjectType.gameObject,
> => {
  let data = state->_unsafeGetGameObjectRelatedData

  data.getAllGameObjectsFunc(. data.state)
}
