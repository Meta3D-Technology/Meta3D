open StateType

open Meta3dComponentTransformProtocol.Index

let deferDisposeGameObject = (
  (
    {needDisposedGameObjectArray} as gameObjectState,
    transformState: Meta3dComponentTransformProtocol.Index.state,
  ),
  (getTransformFunc, deferDisposeTransformFunc),
  gameObject,
) => {
  let transformState = deferDisposeTransformFunc(.
    transformState,
     getTransformFunc(. transformState, gameObject),
  )

  let gameObjectState = {
    ...gameObjectState,
    needDisposedGameObjectArray: needDisposedGameObjectArray->Meta3dCommonlib.ArraySt.push(
      gameObject,
    ),
  }

  (gameObjectState, transformState)
}

let _isNotNeedDispose = (component, needDisposedIndexArray) =>
  !Js.Array.includes(component, needDisposedIndexArray)

let batchDisposeGameObjects = (
  ({needDisposedGameObjectArray} as  gameObjectState, transformState: Meta3dComponentTransformProtocol.Index.state),
  (getTransformsFunc, batchDisposeTransformsFunc),
  gameObjects,
) => {
  let isDebug = ConfigUtils.getIsDebug(gameObjectState)

let needDisposedGameObjectArray = GetNeedDisposedGameObjectsUtils.get(gameObjectState)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "gameObject",
    gameObjects,
    needDisposedGameObjectArray,
  )

  gameObjectState.needDisposedGameObjectArray =
    needDisposedGameObjectArray->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
      gameObjects
    )

  let transformState = batchDisposeTransformsFunc(.
    transformState,
    getTransformsFunc(. transformState, gameObjects),
  )

  (gameObjectState, transformState)
}
