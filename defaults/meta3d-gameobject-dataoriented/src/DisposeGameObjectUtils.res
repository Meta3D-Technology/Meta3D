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
let transformState = 
getTransformFunc(. transformState, gameObject) -> Meta3dCommonlib.NullableSt.bind((. transform) =>{
deferDisposeTransformFunc(.
    transformState,
    transform,
  )
})
 -> Meta3dCommonlib.NullableSt.getWithDefault(transformState)

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

let disposeGameObjects = (
  (
    {needDisposedGameObjectArray} as gameObjectState,
    transformState: Meta3dComponentTransformProtocol.Index.state,
  ),
  (getTransformsFunc, disposeTransformsFunc),
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
      gameObjects,
    )

  let transformState = disposeTransformsFunc(.
    transformState,
    getTransformsFunc(. transformState, gameObjects),
  )

  (gameObjectState, transformState)
}
