open StateType

open Meta3dComponentTransformProtocol.Index

let deferDisposeGameObjectFunc = ({needDisposedGameObjectArray} as state, gameObject) => {
  {
    ...state,
    needDisposedGameObjectArray: needDisposedGameObjectArray->Meta3dCommonlib.ArraySt.push(
      gameObject,
    ),
  }
}

let _isNotNeedDispose = (component, needDisposedIndexArray) =>
  !Js.Array.includes(component, needDisposedIndexArray)

let batchDisposeGameObjectsFunc = (
  (
    {needDisposedGameObjectArray} as gameObjectState,
    transformState: Meta3dComponentTransformProtocol.Index.state,
  ),
  batchDisposeTransformsFunc,
  gameObjects,
) => {
  let isDebug = ConfigUtils.getIsDebug(gameObjectState)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "gameObject",
    gameObjects,
    needDisposedGameObjectArray,
  )

  let {gameObjectTransformMap} = transformState

  let transformState = batchDisposeTransformsFunc(.
    transformState,
    ComponentMapUtils.batchGetComponent(gameObjects, gameObjectTransformMap),
  )

  (gameObjectState, transformState)
}
