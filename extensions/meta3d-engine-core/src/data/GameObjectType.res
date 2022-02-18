@genType
type state

@genType
type gameObject

@genType
type usedGameObjectData = {
  mutable state: state,
  createGameObjectFunc: Meta3dEngineCoreType.IGameObjectForJs.createGameObjectFunc<
    state,
    gameObject,
  >,
  getAllGameObjectsFunc: Meta3dEngineCoreType.IGameObjectForJs.getAllGameObjectsFunc<
    state,
    gameObject,
  >,
}

type gameObjectData = Meta3dEngineCoreType.IGameObjectForJs.gameObjectData<state, gameObject>
